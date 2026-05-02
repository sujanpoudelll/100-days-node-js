
let fs = require('fs');

//Read Students 
function getStudents(){
    return JSON.parse(fs.readFileSync('students.json','utf-8'));
}

//Save Students 
function saveStudents(data){
    fs.writeFileSync('students.json',JSON.stringify(data,null,2));
}

// Add Student
function addStudent(name,marks){
    let students = getStudents();
    students.push({name,marks});
    saveStudents(students);
}

//Delete Student
function deleteStudent(name){
    let students = getStudents();
    students = students.filter(student => student.name !== name);
    saveStudents(students);
}

//Update Student
function updateStudent(name,newMarks){
    let students = getStudents();
    for(let i =0; i<students.length; i++){
        if(students[i].name === name){
            students[i].marks = newMarks;
        }
    }
    saveStudents(students);
}

//Show Students
function showStudents(){
    console.log(getStudents());
}


//Testing the System
addStudent("Shanti",58);
deleteStudent("Ram");
updateStudent("Shyam",20);

showStudents();
