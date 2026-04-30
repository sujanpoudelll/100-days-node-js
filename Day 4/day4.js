
//Print all names
let names = ["Sujan","Suprina","Subash","Sudarshan","Susil"];
for(let i=0; i<names.length; i++){
    console.log(names[i]);
}

//Print all numbers and its double
let numbers = [10,20,30,40,50,60];
for(let x = 0; x<numbers.length; x++){
    console.log("Number is: "+numbers[x]+" and its double is: "+(numbers[x]*2))
}

//sum of array

let nums = [5,10,15,20];
let sum = 0;
for(let y =0; y<nums.length; y++){
    sum += nums[y];
}
console.log("The sum is: "+sum);
