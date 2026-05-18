// Import Node.js File System module to perform CRUD operations on files
const fs = require('fs'); 
// Extracting specific function present in other file that is imported
const {validateStudent} = require('../Utilities/validateStudent'); 
const Student = require('../Model/studentModel') //Importing student model
// Reads the JSON file and parses the raw string data into usable JavaScript objects/arrays
//function getStudents(){
   // return JSON.parse(fs.readFileSync('Data/students.json','utf-8'));
//};

// Converts the live JavaScript data back into a formatted JSON string and overwrites the file
function saveStudents(data){
    fs.writeFileSync('Data/students.json', JSON.stringify(data,null,2)); 
};

//http GET request 
//route handler function is assigned to constant , req is incoming req from user and res is response from server to user
const getAllStudents = async(req, res) =>{
    //async is for asynchronous database operations and allows to use awaits

    // try block for operations
    try{
        const students = await Student.find(); // for looking inside the collection , await pauses until data is feteched and array returns
         //No students found
        if (students.length === 0){
            return res.status(404).json({
            success: false,
            message: "No students found !",
            data: []
        });
        }

        //Final response
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });  

    //if anything wrong in try it goes to catch block   
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Server error !",
            error: error.message
        });

    };
}

//http GET request for specific data
const getStudentById = async(req, res) => {
    try{
        const student = await Student.findById(req.params.id) //fetches specific data i.e by id
            if(!student){
                return res.status(404).json({
                    success: false,
                    message: "Student not found !"
                    });
            }

            res.status(200).json({
                    success: true,
                    data: student
            }); 

        } catch(error){
            return res.status(500).json({
                success: false,
                message: "Server error !",
                error: error.message
            });
        }
    };


//http POST request
const addStudent = async(req, res) => {

    try{
        const {name, marks} = req.body;
        const newStudent = await Student.create({        // creates new data with given key
            name, marks
        });
        res.status(201).json({
        success: true,
        message: "New student added successfully !",
        data: newStudent
        });

    } catch(error){
        res.status(500).json({
            success: false,
            message: "Server error !",
            error: error.message
        });
    };

    };

    
//http PUT request
const updateStudent = async(req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(         // finds data using id, changes the required field only , set us upated data by validating it
            req.params.id,
            req.body,
            {new:true, runValidators: true}
        );

        if(!student){
            return res.status(404).json({
                success: false,
                message: "Student not found !"
            });
        };
        res.status(200).json({
        success: true,
        message: " Student updated successfully !", 
        data: student  
    });
    } catch (error){
        res.status(500).json({
            success: false,
            message: "Server error !",
            error: error.message
        });
    };
    };


//http DELETE request
const deleteStudent = async(req, res) => {

    try{
        const student = await Student.findByIdAndDelete(req.params.id);  // Deletes through id 

        if(!student){
            return res.status(404).json({
            success: false,
            message: "Student not found !"
        });
        }
        res.status(200).json({
        success: true,
        message: "Student deleted successfully !"
    }); 

    } catch(error){
         res.status(500).json({
            success: false,
            message: "Server error !",
            error: error.message
        });
    };
    };

module.exports = {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById
};
