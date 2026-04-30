//Even or Odd function
function isEven(num){
    if(num % 2 === 0){
        return true;
    }
    else{
        return false;
    }
}

//Sum of array function
function getSum(arr){
    let sum = 0;
    for(let i=0; i<arr.length; i++){
        sum += arr[i];
    }
    return sum;
}

//Highest number function
function getHighest(arr){
    let highest = arr[0];
    for(let i = 1; i<arr.length; i++){
        if (arr[i] > highest){
            highest = arr[i];
        }
    }
    return highest;
}



let numbers = [10,15,20,25,30,35,40,45,50,55,60]
for(let x =0; x<numbers.length; x++){
    console.log(numbers[x] +  " is even: " + isEven(numbers[x]));
}

let sumResult = getSum(numbers)
console.log("Sum of array is: "+ sumResult);

let highestResult = getHighest(numbers);
console.log("Highest Number is: "+ highestResult);




