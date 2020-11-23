// 最长不重复字串

// function lengthOfLongestSubstring(s) {
//     const set =  new Set();
//     let n = s.length;
//     let ans = 0;
//     let rk = -1;

//     for (let ind = 0; ind < n; ind++) {
//         if (ind !== 0) {
//             set.delete(s.charAt(ind - 1));
//         }

//         while ((rk + 1 < n) && !set.has(s.charAt(rk + 1))) {
//             set.add(s.charAt(rk + 1));
//             rk++;
//         }
//         ans = Math.max(ans, set.size);
//     }
//     return ans;
// }

// apacsss  
// ap
// pacs \/
// acs
// cs
// 思路 找到最长连续不重复子序列就可以
// 1.从头向后找，将字符挨个加入存储器（数组、集合）中，直到新加入的字符与原来存储器中的字符有重复
// 2. 则暂时停止，将此时的存储器中的所有不重复字符（以及长度）保存下来  这里需要两个序号 一个是从头开始的序号 一个是向后添加的不重复的字符序号
// 3.继续上一个步骤，向后挪动一位，就需要将数组中上一个字符从存储器中删除
// 4. 重复步骤1，直到循环到数组最后一个字符
function lengthOfLongestSubstring(str) {
    let set = new Set();
    let maxlen = 0;
    let next = 0;
    let maxStr = [];
    for (let index = 0; index < str.length; index++) {
        const ele = str[index];
        console.log(ele);

        while (!set.has(str[next])) {
            set.add(str[next]);
            next++;
        }

        maxlen = Math.max(maxlen, set.size);
        // maxStr.push()
        console.log('set', set);
        set.delete(ele);
    }
    console.log('maxlen', maxlen);
 
}
console.log(lengthOfLongestSubstring('apac56xycg2sss'));

