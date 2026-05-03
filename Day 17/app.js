
const express = require('express');
const app = express();

const PORT = 5001;
const fs = require('fs');

//built in middle ware
app.use(express.json());

//Custom middleware
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`)
    next();
});

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
    const {name, marks} = req.body;
    if (!name || marks === undefined){
        return res.status(400).json({
            message: "Name and marks are required! "
        });}

    const students = getStudents();
    const newStudent = {name, marks};
    students.push(newStudent);
    saveStudents(students);
    res.status(201).json({
        message: "Student added successfully !",
        data : newStudent
        });
});

//DELETE
app.delete("/students/:name", (req, res) => {
    let students = getStudents();
    const name = req.params.name;
    const filtered = students.filter(student => student.name !== name);

    if(students.length === filtered.length){
        return res.status(404).json({
            message:"Student not found !"
        });
    }

    saveStudents(filtered);
    res.json({
        message: "Student deleted successfully!", 
    }); 
});

//PUT
app.put("/students/:name", (req, res) => {
    let students = getStudents();
    const name = req.params.name;

    let found = false;
    students = students.map(student => {
        if(student.name === name){
            found = true
            return {...student, ...req.body};
        }
        return student;
    });

    if(!found){
        return res.status(404).json({
            message: "Student not found !"
        });
    }

    saveStudents(students);
    res.json({
        message: "Student updated successfully !"
    });
});


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
}
);


app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Something went wrong !"
    });

});