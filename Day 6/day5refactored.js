
function getPassedStudents(arr){
   let passedStudents = [];
   for(let i = 0; i<arr.length; i++){
        if(arr[i]>=40){
            passedStudents.push(arr[i]);}
    }
    return passedStudents;
}


function getFailedStudents(arr){
    let failedStudents = [];
    for(let i = 0; i<arr.length; i++){
        if(arr[i]<40){
            failedStudents.push(arr[i]);}
    }
    return failedStudents;
}    

        
function getAverage(arr){
    let sum = 0
    for(let i = 0; i<arr.length; i++){
        sum += arr[i];
    }
    let average = (sum/arr.length);
    return average;

}

function getHighest(arr){
    let highest = arr[0];
    for(let x = 1; x<arr.length; x++){
        if(arr[x] > highest){
            highest = arr[x];
        }
    }   
    return highest;
}

let students = [45, 67, 19, 30, 78, 99, 2];


let passed = getPassedStudents(students);
let failed = getFailedStudents(students);

console.log("Passed Students: "+ passed);
console.log("Total Passed: "+ passed.length);

console.log("Failed Students: "+ failed);
console.log("Total Failed: "+ failed.length);

console.log("Highest mark: "+ getHighest(students))
console.log("Average: " + getAverage(students).toFixed(3));




