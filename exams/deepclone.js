// function isPrimary(target) {
//   const primarys = ['undefined','boolean', 'string', '']
//   typeof target
//   return 
// }

function deepClone(obj) {

    if (obj === null) return obj; 
    if (obj === undefined) return obj; 
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== "object") return obj;

    if (typeof )
    let cloneObj = new obj.constructor();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 实现一个递归拷贝
        cloneObj[key] = deepClone(obj[key]);
      }
    }
    return cloneObj;
}




// deepCopy({p:true,g:34, r: undefined, t: null,a:1,b:{c:3,d:4},f:[4,5,6],h:Symbol(1),w: new Set([1,2,3]), i: new Map([[1,2]])})

const tar = {
    a: [1, {v: [1, 2, 3]}, 'sdds', false, new Set([[1,2]])]
  }

console.log('deepClone', deepClone(tar))


