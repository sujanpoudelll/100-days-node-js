let students = [45, 67, 19, 30, 78, 99, 2];
let passedStudents = [];
let failedStudents = [];
let sum = 0;

for(let i = 0; i<students.length; i++){
    if(students[i]>=40){
        passedStudents.push(students[i]);
    }
    else{
        failedStudents.push(students[i]);
    }
    sum += students[i];
}

highest = students[0];
for(let x = 1; x<students.length; x++){
    if(students[x] > highest){
        highest = students[x];
    }
}

console.log("Total Students: "+ students.length);
console.log("No. of Passed Students: "+passedStudents.length);
console.log("Passed Students: "+ passedStudents);
console.log("No. of Failed Students: "+failedStudents.length);
console.log("Failed Students: "+ failedStudents);
console.log("Average marks: "+ (sum / students.length));
console.log("Highest mark: "+ highest);




