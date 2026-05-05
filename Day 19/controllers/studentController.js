const { error } = require('console');
const fs = require('fs');

function getStudents(){
    return JSON.parse(fs.readFileSync('data/students.json','utf-8'));
};

function saveStudents(data){
    fs.writeFileSync('data/students.json', JSON.stringify(data,null,2));
};

//GET
exports.getAllStudents = (req,res) => {
    const students = getStudents();
    res.json({
        success: true,
        data: students
    });
};

//POST 
exports.addStudent = (req,res) => {

    const {validateStudent} = require('../utils/validateStudent')
    const error = validateStudent(req.body);

    if(error){
        return res.status(400).json({
                success : false,
             message : error
         });
    }

    const {name, marks} = req.body;

    const students = getStudents();
    const newStudent = {id: Date.now(), name, marks};
    students.push(newStudent);


    saveStudents(students);
    res.status(201).json({
        success: true,
        message: "Student added successfully !",
        data: newStudent
    }); 
};

//PUT
exports.updateStudent = (req, res) => {
    let students = getStudents();
    const id = Number(req.params.id);

    let found = false;
    students = students.map(student => {
        if(student.id === id){
            found = true;
            return {...student,...req.body};
        }
        return student;
    })
    
    if(!found){
        return res.status(404).json({
            success: false,
            message: "Student not found !"
        });
    }
    saveStudents(students);
    res.status(200).json({
        success: true,
        message: "Student updated successfully !"
    });
};

//DELETE
exports.deleteStudent = (req, res) => {
    let students = getStudents();
    const id = Number(req.params.id);

    const filtered = students.filter(student => student.id !== id);
    if(students.length === filtered.length){
        return res.status(404).json({
            success: false,
            message: "Student not found !"
        });
    }
    saveStudents(filtered);
    res.status(200).json({
        success: true,
        message: "Student deleted successfully !"
    });
}

