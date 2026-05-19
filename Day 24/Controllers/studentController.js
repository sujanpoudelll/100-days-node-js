

// Extracting specific function present in other file that is imported
const {validateStudent} = require('../Utilities/validateStudent'); 
const Student = require('../Model/studentModel') //Importing student model


//http GET request 
//route handler function is assigned to constant , req is incoming req from user and res is response from server to user
const getAllStudents = async(req, res, next) =>{
    //async is for asynchronous database operations and allows to use awaits

    // try block for operations
    try{
        const students = await Student.find(); // for looking inside the collection , await pauses until data is feteched and array returns
         //No students found
       
        if (students.length === 0){
            const error = new Error("No students found !"); //creation of new Error object with its internal error message
            error.statusCode = 404; // telling error handling middleware about the http status code to send to user
            throw error;     //throws error directly to catch by halting rest operation
        }

        //Final response
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });  

    //if anything wrong in try it goes to catch block   
    } catch(error){ //error is caught and stored in variable named error
        next(error); // skips all routes and and handles this error to error handling middleware immediately 

    };
}

//http GET request for specific data
const getStudentById = async(req, res, next) => {
    try{
        const student = await Student.findById(req.params.id) //fetches specific data i.e by id
            if(!student){
                const error = new Error("Student not found !");
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({
                    success: true,
                    data: student
            }); 

        } catch(error){
            next(error);  //passes error to middleware
        }
    };


//http POST request
const addStudent = async(req, res, next) => {

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
        next(error);
    }

};

    
//http PUT request
const updateStudent = async(req, res, next) => {
    try{
        const student = await Student.findByIdAndUpdate(         // finds data using id, changes the required field only , set us upated data by validating it
            req.params.id,
            req.body,
            {new:true, runValidators: true}
        );

        if(!student){
            const error = new Error("Student not found !");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
        success: true,
        message: " Student updated successfully !", 
        data: student  
    });
    } catch (error){
        next(error);
    }
};


//http DELETE request
const deleteStudent = async(req, res, next) => {

    try{
        const student = await Student.findByIdAndDelete(req.params.id);  // Deletes through id 

        if(!student){
            const error = new Error("Student not found !");
            error.statusCode = 404; 
            throw error;
        }
        res.status(200).json({
        success: true,
        message: "Student deleted successfully !"
    }); 

    } catch(error){
        next(error);
    }
};

module.exports = {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById
};
