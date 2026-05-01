let students = [
    { name: "Ram", marks: 45 },
    { name: "Shyam", marks: 67 },
    { name: "Hari", marks: 30 },
    { name: "Gita", marks: 78 }
];

let passedStudents = students.filter(student => student.marks >= 40);
let failedStudents = students.filter(student => student.marks < 40);
let averageMarks = students.reduce((acc, student) => acc + student.marks,0) /students.length;
let highestMarks = students.reduce((max, student) => { return student.marks > max.marks ? student: max;}, students[0]);
let studentNames = students.map(student => student.name);
                 

console.log(passedStudents);
console.log(failedStudents);
console.log(averageMarks);
console.log(highestMarks);
console.log(studentNames);