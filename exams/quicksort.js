const quickSort = arr => {
    if (arr.length <= 1) {
        return arr;
    }
    else {
        const pivotIndex = Math.round(arr.length / 2);
        const pivot = arr.splice(pivotIndex, 1);
        let left = [];
        let right = [];
        arr.forEach(i => {
            i < pivot ? (left.push(i)) : (right.push(i));
        });
        return quickSort(left).concat(pivot, quickSort(right));
    }
}

console.log(quickSort([1,9,4,3,2,4,5,7,78,8,4,3,2]))