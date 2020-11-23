// . 实现一个const uls = createElement('ul',{id:'aa'}, [
//     createElement('ol',{id:'bb'}, ['text1']),
//     createElement('ol',{id:'cc'},['text2'])
//     ])

// 调用 uls.render() 

// 创建元素
function createEle(type, props, chrldren) {
    return new Renderer(type, props, chrldren)
}

class Renderer{
    constructor(type, props, children) {
        this.vnode = {
            type,
            props,
            children
        };

    }
    _render() {

    }
    render(vnode) {
        const container = document.createElement(vnode.type);
        
        if (vnode.props) {
            Object.keys(vnode.props).forEach(key => {
                container.setAttribute(key, vnode.props[key]);
            });
        }
        if (vnode.children && vnode.children.length) {
            if (vnode.children.length === 1
                && typeof vnode.children[0] === 'string') {

                container.innerText = vnode.children[0];
                return container;
            }
            else {
                // ele 是vnode 对象
                vnode.children.forEach(child => {
                    container.appendChild(this.render(child));
                });
                return container;

            }
        }
    }
    createVNode(type, props, children) {
        this.vnode = {
            type,
            props,
            children
        }
    }
}

const render = createEle()
console.log()