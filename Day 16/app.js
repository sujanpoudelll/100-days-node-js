const express = require('express');
const app = express();

const PORT = 5001;
const fs = require('fs');

//Middleware
app.use(express.json());

//core data functions
function getStudents(){
    return JSON.parse(fs.readFileSync('students.json','utf-8'));
}

function saveStudents(data){
    fs.writeFileSync('students.json',JSON.stringify(data,null,2));
}

//GET
app.get("/students", (req, res) => {
    const students = getStudents();
    res.json(students);
});

//POST
app.post("/students", (req, res) => {
    const students = getStudents();
    const newStudent = req.body;

    students.push(newStudent);
    saveStudents(students);

    res.json({
        message: "Student added successfully !",
        data : newStudent
        });
});


//DELETE
app.delete("/students/:name", (req, res) => {
    let students = getStudents();
    const name = req.params.name;
    students = students.filter(student => student.name !== name);

    saveStudents(students);

    res.json({
        message: "Student deleted successfully!", 
    }); 
});


//PUT
app.put("/students/:name", (req, res) => {
    let students = getStudents();
    const name = req.params.name;

    students = students.map(student => {
        if(student.name === name){
            return {...student, ...req.body};
        }
        return student;
    });

    saveStudents(students);
    res.json({
        message: "Student updated successfully !"
    });
});


app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});



