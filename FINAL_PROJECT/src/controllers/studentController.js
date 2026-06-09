const Student = require('../model/studentModel'); //Importing student model
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');


//http GET request 
//route handler function is assigned to constant , req is incoming req from user and res is response from server to user
const getAllStudents = asyncHandler(async(req, res, next) =>{
    //async is for asynchronous database operations and allows to use awaits


        const {name, minMarks, sort, page, limit} = req.query;

        let query = Student.find(); //finds students based on query

        //Filter: name search
        if(name){
            query = query.find({
                name: { $regex: name, $options: "i" } 
        });

        }
        //Filter: marks
        if(minMarks){
            query = query.find({
                marks: { $gte: (minMarks)}
            });
        }

        //Sorting
        if(sort){
            query = query.sort(sort);
        }

        //Pagination
        const pageNumber = Number(page) || 1; //page number to be viewed, default is 1
        const limitNumber = Number(limit) || 5; // items in page limit , default is 5

        const skip = (pageNumber - 1)* limitNumber; //items up to no. to be skipped in that page from start
        query = query.skip(skip).limit(limitNumber); // query executed based on above data 



        const students = await query; //looks for query and fetches data if query chain is complete. 
        // Compile all our filters, sorting rules, and pagination constraints, send it to MongoDB, and wait for the results array."

        //Final response
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });  

    
   
});

//http GET request for specific data
const getStudentById = asyncHandler(async(req, res, next) => {
    
        const student = await Student.findById(req.params.id); //fetches specific data i.e by id
            if(!student){
                throw new AppError("Student not found",404);
            }

            res.status(200).json({
                    success: true,
                    data: student
            }); 

    });


//http POST request
const addStudent = asyncHandler(async(req, res, next) => {

    
        const {name, marks} = req.body;
        const newStudent = await Student.create({        // creates new data with given key
            name, marks
        });
        
        res.status(201).json({
        success: true,
        message: "New student added successfully !",
        data: newStudent
        });

});

    
//http PUT request
const updateStudent = asyncHandler(async(req, res, next) => {
    
        const student = await Student.findByIdAndUpdate(         // finds data using id, changes the required field only , set us upated data by validating it
            req.params.id,
            req.body,
            {new:true, runValidators: true}
        );

        if(!student){
            throw new AppError("Student not found",404);
        }
        res.status(200).json({
        success: true,
        message: " Student updated successfully !", 
        data: student  
    });
   
});


//http DELETE request
const deleteStudent = asyncHandler(async(req, res, next) => {

  
        const student = await Student.findByIdAndDelete(req.params.id);  // Deletes through id 

        if(!student){
            throw new AppError("Student not found",404);
        }
        res.status(200).json({
        success: true,
        message: "Student deleted successfully !"
    }); 

    
});

module.exports = {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById
};
