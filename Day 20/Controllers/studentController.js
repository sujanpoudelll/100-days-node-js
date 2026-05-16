// Import Node.js File System module to perform CRUD operations on files
const fs = require('fs'); 
// Extracting specific function present in other file that is imported
const {validateStudent} = require('../Utilities/validateStudent'); 

// Reads the JSON file and parses the raw string data into usable JavaScript objects/arrays
function getStudents(){
    return JSON.parse(fs.readFileSync('Data/students.json','utf-8'));
};

// Converts the live JavaScript data back into a formatted JSON string and overwrites the file
function saveStudents(data){
    fs.writeFileSync('Data/students.json', JSON.stringify(data,null,2)); 
};

//http GET request 
//route handler function is assigned to constant , req is incoming req from user and res is response from server to user
const getAllStudents = (req, res) =>{
    // logics 
    const students = getStudents();
    if (students.length === 0){
        return res.json({
        success: true,
        message: "No students found",
        data: []
    });
};
    res.json({
        success: true,
        data: students 
    });   
};

//http POST request
const addStudent = (req, res) => {

    //logics with validation
    const error = validateStudent(req.body); // function called with req.body as argument
    if (error) {
        return res.status(400).json({
        success: false,
        message: error
    });
}
    const {name, marks} = req.body;
    const students = getStudents();
    const newStudent = {
        id:Date.now(),
         name, 
         marks
        };
    students.push(newStudent);

    saveStudents(students);
    res.status(201).json({
        success: true,
        message: "New student added successfully !",
        data: newStudent
    });
};

//http PUT request
const updateStudent = (req, res) => {
    const id = Number(req.params.id); // operation with specific requests 
    const error = validateStudent(req.body);
    if (error) {
        return res.status(400).json({
        success: false,
        message: error
    });
}
    const {name, marks} =req.body;
    let students = getStudents();
    let found = false;
    students = students.map(student=> {
        if(student.id === id){
            found = true;
            return {
                  ...student, //takes out original object and unpack its properties
                  ...req.body //takes the data sent by user and unpack it below original 
                  // then new data overwrites the old ones
                
            };  
        }
        return student;
    });
        if(!found){
            return res.status(404).json({
                success: false,
                message: "Student not found !"
            });
        };
    saveStudents(students);
    res.status(200).json({
        success: true,
        message: " Student updated successfully !",   
    });
};

//http DELETE request
const deleteStudent = (req, res) => {
    const id = Number(req.params.id);
    let students = getStudents();
    const filtered = students.filter(student => student.id !== id )
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
};

//http GET request for specific data
const getStudentById = (req, res) => {
   const id = Number(req.params.id);
   let students = getStudents();
   let found = false;
   let requiredStudent = students.find(student => student.id === id);

   if(!requiredStudent){
    return res.status(404).json({
        success: false,
        message: "Student not found !"
    });
};
    res.status(200).json({
                success: true,
                message: "Student found",
                data: requiredStudent
            }); 
};

module.exports = {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById
};
