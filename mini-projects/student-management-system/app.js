
//Functions
const fs = require('fs');

function getStudents(){
    const data = fs.readFileSync('students.txt','utf-8');
    if (!data) return[];
    
    return data.trim().split('\n');
}

function addStudent(name,marks){
    fs.appendFileSync('students.txt', `${name},${marks}\n`);
}

function showallStudents(){
    console.log("Data inside the file: ");
    console.log(fs.readFileSync('students.txt','utf-8'));
}

function deleteStudents(name){
    let students = getStudents(); //array 
    let updatedStudents = students.filter(student => {
        let [studentName] = student.split(',');
        return studentName !== name;
    });
    fs.writeFileSync('students.txt',updatedStudents.join('\n'));
}


//Tests

addStudent("Gandu",46);
showallStudents();
deleteStudents("Gandu");
console.log("After deletion");
showallStudents();
