let nums1 = [2,4,6,8];
let doubledResult = nums1.map(num => num * 2);
console.log(doubledResult);

let nums2 = [1,2,3,4,5,6,7,8];
let evenResult = nums2.filter(num => (num % 2 === 0));
console.log(evenResult);

let num3 = [10,20,30,40];
let sumResult = num3.reduce((acc, num) => acc + num, 0);
console.log(sumResult);



