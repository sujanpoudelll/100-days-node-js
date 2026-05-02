const fs = require('fs');

//core data functions
function getStudents(){
    return JSON.parse(fs.readFileSync('students.json','utf-8'));
}

function saveStudents(data){
    fs.writeFileSync('students.json',JSON.stringify(data,null,2));
}

//API style functions

//GET/students
function getAllStudents(){
    return getStudents();
}

//POST/students
function createStudent(name,marks){
    let students = getStudents();
    students.push({name,marks});
    saveStudents(students);
}

//DELETE/students/:name
function deleteStudent(name){
    let students = getStudents();
    students = students.filter(student => student.name !== name);
    saveStudents(students);
}

//PUT/students/:name
function updateStudent(name,newMarks){
    let students = getStudents();
    for(let i = 0 ; i < students.length; i++){
        if(students[i].name === name){
            students[i].marks = newMarks;
        }  
    }
    saveStudents(students);
}


//Simulate API Calls

console.log("GET/students");
console.log(getAllStudents());

console.log("POST/students");
createStudent("Vidisha", 60);

console.log("DELETE/students/Shyam");
deleteStudent("Shyam");

console.log("PUT/students/Shanti");
updateStudent("Shanti",66);

console.log("Final Data:");
console.log(getAllStudents());