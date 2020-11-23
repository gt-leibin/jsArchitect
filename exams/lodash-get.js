// lodash get 方法
// 3. 实现一个lodash 中的get 方法 
// {
//     aa: {bb: {cc: 2}}
//     bb: [2,{aa:'cc'},4]
// }

// get('bb..[1].aa')
var obj = {
    'a': {
        'b': {
            'c': 3
        }
    }
};
var path = 'a.b.c';
// var path = 'a[0].b.c'
function get(tar, path) {
    if (tar && path) {
        path = path.replace(/\[/g,'.').replace(/\]/g, '');
        const patharr = path.split('.');
        let res = tar;
        const length = patharr.length;
        for (let ind = 0; ind < length; ind++) {
            res = res[patharr[ind]];
        }
        console.log('res', res);
    }
}

get(obj, path);