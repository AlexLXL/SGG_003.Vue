// 模板解析
function Compile(el, vm) {
    // this是编译对象，上面有挺多方法的，保存实例对象vm
    this.$vm = vm;
    // 拿到入口的DOM节点
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    // 判断是否存在入口DOM节点
    if (this.$el) {
        // 1、创建文档碎片
        this.$fragment = this.node2Fragment(this.$el);
        // 2、进行模板解析 (文档碎片里)
        this.init();
        // 3、把文档碎片里的节点移回到入口节点
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    // 1.1 创建文档碎片，把所有#app里的节点移进去[包括回车的text节点]
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        // 2.1 真正实现模板解析的方法compileElement - 传入了文档碎片
        this.compileElement(this.$fragment);
    },

    // 2.1同步
    compileElement: function(el) {
        // 2.1.1 拿文档碎片的子节点保存在childNodes: [text↙, p标签, text↙]
        var childNodes = el.childNodes,
        // 2.1.2 缓存编译对象
            me = this;

        // 2.1.3循环遍历文档碎片子节点数组childNodes
        [].slice.call(childNodes).forEach(function(node) {
            // 2.1.3-1拿到childNodes数组里每一项
            var text = node.textContent;
            // 匹配{{}}的正则
            var reg = /\{\{(.*)\}\}/;

            // 判断是不是元素节点 ( nodetype = 1 ) 
            if (me.isElementNode(node)) {
                me.compile(node);           // complie --- 检测属性里是否存在指令

            // 判断是不是 {{}} 这样的文本节点 
            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1.trim()); // 第一个参数是节点，第二个参数是{{xx}}里的xx
                // compileText ---> compileUtil ---> bind ---> _getVMVal(拿值)
            }

            // 递归检测子元素，=== <p>{{msg}}</p>就是走这里，然后拿到{{msg}}走上面这行 ===
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    // 检测属性里是否存在指令，并解析
    compile: function(node) {
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                // 事件指令
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);  // 节点, 实例对象vm, msg
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // 拼成 updater.textUpdater
        var updaterFn = updater[dir + 'Updater'];

        // 执行 updater.textUpdater、_getVMVal通过vm.msg获取值，然后去到updater.textUpdater执行
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    // _getVMVal通过vm.msg获取值
    _getVMVal: function(vm, exp) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    // 替换文档碎片的{{msg}} 为 真正的值, 到这里完成表达式的替换
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};