
//Cleaner code style

let students = [{name: "Sujan", marks: 91},
    { name: "Ram", marks: 45 },
    { name: "Shyam", marks: 67 },
    { name: "Hari", marks: 30 },
    { name: "Gita", marks: 78 },
    { name: "Sita", marks: 55 },
    { name:"Subash", marks: 19}
];


let passedStudents = students.filter(student => student.marks >= 40);
let failedStudents = students.filter(student => student.marks < 40);
let totalMarks = students.reduce((sum, student) => sum + student.marks, 0);
let highestScorer = students.reduce((max, student) => 
    student.marks > max.marks ? student : max, students[0]);
let above50Students = students.filter(student => student.marks >50);
let studentNames = students.map(student => student.name);
let average = totalMarks / students.length;
let aboveAverageStudents = students.filter(student => student.marks >= average);
let aboveAverageStudentsName = aboveAverageStudents.map(student => student.name);




console.log("No. of passed students: "+ passedStudents.length);
console.log("No. of failed students: "+ failedStudents.length);
console.log("Total Marks: "+ totalMarks);
console.log("Average: " + average);
console.log("Highest Scorer: \n"+ highestScorer.name +": "+highestScorer.marks);
console.log("Students scoring above 50: "+ above50Students.length);
console.log("Students: ", studentNames);
console.log("Students above average: "+ aboveAverageStudentsName);

