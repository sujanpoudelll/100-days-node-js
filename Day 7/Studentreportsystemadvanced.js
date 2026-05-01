
function getPassedStudents(arr){

   let passedStudents = [];
   for(let i = 0; i<arr.length; i++){
        if(arr[i].marks >= 40){
            passedStudents.push(arr[i]);}
    }
    return passedStudents;
}

function getFailedStudents(arr){

    let failedStudents = [];
    for(let i = 0; i<arr.length; i++){
        if(arr[i].marks < 40){
            failedStudents.push(arr[i]);}
    }
    return failedStudents;
}    
      
function getAverage(arr){

    let sum = 0
    for(let i = 0; i<arr.length; i++){
        sum += arr[i].marks;
    }
    let average = (sum/arr.length);
    return average;

}

function getHighest(arr){
   
    let highestMarkStudent = arr[0];
    for(let x = 1; x<arr.length; x++){
        if(arr[x].marks > highestMarkStudent.marks){
            highestMarkStudent = arr[x];
        }
    }   
    return highestMarkStudent;}


let students = [
  { name: "Ram", marks: 45 },
    { name: "Shyam", marks: 67 },
    { name: "Hari", marks: 30 },
    { name: "Gita", marks: 78 }
  
];


if(students.length === 0){
    console.log("No data found!!!")
}
else{
    let passed = getPassedStudents(students);
    let failed = getFailedStudents(students);
    let scorer = getHighest(students);

    console.log("\nPassed Students:")
for(let i= 0; i<passed.length; i++){
    console.log(passed[i].name + " : "+ passed[i].marks);
}
console.log("Total Passed: "+ passed.length);


console.log("\nFailed Students:")
for(let i= 0; i<failed.length; i++){
    console.log(failed[i].name + " : "+ failed[i].marks);
}
console.log("Total Failed: "+ failed.length);

console.log("\nAverage marks: " + getAverage(students).toFixed(2));
console.log("Highest Score: " + scorer.name + " (" + scorer.marks +")");

}





