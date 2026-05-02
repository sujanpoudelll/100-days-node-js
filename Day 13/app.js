const fs = require('fs');

//Converting json to js objects
let students = JSON.parse(fs.readFileSync('students.json','utf-8'));
console.log("Original:",students);

//Add
students.push({name:"Radha",marks:78});

//Delete
students = students.filter(student => student.name !== "Hari");

//write and converting to json
fs.writeFileSync('students.json', JSON.stringify(students,null,2));

console.log("Final:", students);

