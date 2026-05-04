const fs = require('fs');

//core data functions
function getStudents(){
    return JSON.parse(fs.readFileSync('data/students.json','utf-8'));
}

function saveStudents(data){
    fs.writeFileSync('data/students.json',JSON.stringify(data,null,2));
}

//GET all

exports.getAllStudents = (req, res) => {
    const students = getStudents();
    res.json(students);
};

//POST 
exports.addStudent = (req, res)=>{
    const {name, marks} = req.body;

    if (!name || marks === undefined){
        return res.status(400).JSON({message: "Name and marks required !"});
    }

    const students = getStudents();
    const newStudent = {id:Date.now(), name , marks};
    students.push(newStudent);

    saveStudents(students);
    res.status(201).json({message: "Student added successfully !", data: newStudent});
};

//PUT

exports.updateStudent = (req,res)=>{
   
    let students = getStudents();
    const id = Number(req.params.id);
  
    let found = false;
    students = students.map(student => {
        if(student.id === id){
        found = true;
        return {...student,...req.body};
        }
        return student;
    });
   
    if(!found){
        return res.status(404).json({message: "Student not found !"});
    }

    saveStudents(students);
    res.status(200).json({message: "Student updated successfully !"});
};


//DELETE

exports.deleteStudent = (req, res) => {
    let students = getStudents();
    const id = Number(req.params.id);

    const filtered = students.filter(student => student.id !== id);

    if(filtered.length === students.length){
        return res.status(404).json({message: "Student not found !"});
    }

    saveStudents(filtered);
    res.status(200).json({message: "Student deleted successfully !"});


};




