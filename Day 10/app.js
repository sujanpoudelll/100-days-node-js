let students = [
    {id: 1, name: "Sujan", marks: 91},
    { id: 2, name: "Ram", marks: 45 },
    { id: 3, name: "Shyam", marks: 67 },
    { id: 4, name: "Hari", marks: 30 }

];

function getAllStudents(){
    return students;
}
let nextID = students.length + 1;
function addStudent(name,marks){
    let newStudent = {
        id: nextID++ ,
        name,
        marks
    };
    students.push(newStudent);
}

function getPassedStudents(){
    return students.filter(student => student.marks >=40);
}

function getHighscorer(){
    return students.reduce((max, student) =>
        student.marks > max.marks ? student : max, students[0]
    );
}

function deleteStudent(id){
    students = students.filter(student => student.id !==id);
}

function updateStudent(id,newMarks){
    for (let i = 0; i < students.length; i++){
        if (id === students[i].id){
            students[i].marks = newMarks;
        }
    }
}


console.log("All Students: ",getAllStudents());
addStudent("Bikash", 53);
console.log("Passed Students: ",getPassedStudents());
console.log("Topper: ",getHighscorer());
addStudent("Susan", 41);
deleteStudent(3);
addStudent("Suprina", 56);
deleteStudent(2);
updateStudent(5,35);
console.log("New list of students: ",getAllStudents());


updateStudent(1, 100);
deleteStudent(5);
updateStudent(5, 80);
updateStudent(4, 50);
updateStudent(4, 60);
console.log(getAllStudents());