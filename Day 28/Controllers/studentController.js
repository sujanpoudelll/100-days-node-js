

// Extracting specific function present in other file that is imported
const {validateStudent} = require('../Utilities/validateStudent'); 
const Student = require('../Model/studentModel') //Importing student model


//http GET request 
//route handler function is assigned to constant , req is incoming req from user and res is response from server to user
const getAllStudents = async(req, res, next) =>{
    //async is for asynchronous database operations and allows to use awaits

    // try block for operations
    try{

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
            })

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



        const students = await query; //looks for query and fetches data he query chain is complete. 
        // Compile all our filters, sorting rules, and pagination constraints, send it to MongoDB, and wait for the results array."

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
