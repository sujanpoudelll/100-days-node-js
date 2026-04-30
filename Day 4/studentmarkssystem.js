let studentsMarks = [45, 67, 19, 30, 78];

let sum = 0;
let passed = 0;
console.log("Marks of all students: ");
for(let i=0; i<studentsMarks.length; i++){
    console.log(studentsMarks[i]);
    sum += studentsMarks[i];
     if (studentsMarks[i]>=40){
        passed++; 
    }
}

let average  = (sum / studentsMarks.length);

console.log("Total sum: "+sum);
console.log("Total number of passed students: "+passed);
console.log("Average: "+average);












