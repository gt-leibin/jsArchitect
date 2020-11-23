const esprima = require('esprima');
// esprima
const estraverse = require('estraverse');
// estraverse
const escodegen = require('escodegen');
// escodegen
let code = `function ast() {}`;

let ast = esprima.parse(code);

let indent = 0;
function pad() {
    return ' '.repeat(indent);
}
estraverse.traverse(ast, {
    enter(node) {
        debugger;
        console.log(pad() + node.type);
        indent += 4;
    },
    leave(node) {
        debugger;
        indent -= 4;
        console.log(pad() + node.type);
    }
})


let gencode = escodegen.generate(ast);
console.log('gencode', gencode);
// 访问者模式 
// 想起来 二叉树遍历 