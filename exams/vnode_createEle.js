/**
 * 产生dom
 * @param {string} tag 标签
 * @param {Object} props 属性
 * @param {Array.<DOM>} children dom 
 */

 // 先明确 输入和输出是什么 输出是一个dom结构
const el = (tag, props, children) => {
    const ele = document.createElement(tag);
    Object.keys(props).forEach(key => {
        ele.setAttribute(key, props[key]);
    });
    children && children.forEach(child => {
        ele.appendChild(child);
    })
};



