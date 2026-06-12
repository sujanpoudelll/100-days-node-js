const Student = require('../model/studentModel'); //Importing student model
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const APIFeatures = require('../utils/apiFeatures');
const apiResponse = require('../utils/apiResponse');


//http GET request 
//route handler function is assigned to constant , req is incoming req from user and res is response from server to user
const getAllStudents = asyncHandler(async(req, res, next) =>{

    //async is for asynchronous database operations and allows to use awaits

        const features = new APIFeatures(Student.find(), req.query)
        .filter()
        .sort()
        .paginate();

        const students = await features.query; //looks for query and fetches data if query chain is complete. 
        // Compile all our filters, sorting rules, and pagination constraints, send it to MongoDB, and wait for the results array."
        if(students.length === 0){
                throw new AppError("No records found",404)};

        return apiResponse(res,200,"Students fetched",{
            count:students.length,
            students});
});

//http GET request for specific data
const getStudentById = asyncHandler(async(req, res, next) => {
    
        const student = await Student.findById(req.params.id); //fetches specific data i.e by id
            if(!student){
                throw new AppError("Student not found",404)};

            return apiResponse(res,200,"Student fetched",{student});
    });


//http POST request
const addStudent = asyncHandler(async(req, res, next) => {

        const {name, marks} = req.body;
        const newStudent = await Student.insertMany(req.body);

        return apiResponse(res,201,"New student added successfully",{newStudent});
});

    
//http PUT request
const updateStudent = asyncHandler(async(req, res, next) => {
    
        const student = await Student.findByIdAndUpdate(         // finds data using id, changes the required field only , set us upated data by validating it
            req.params.id,
            req.body,
            {new:true, runValidators: true}
        );
        if(!student){
            throw new AppError("Student not found",404)};

        return apiResponse(res,200,"Student updated successfully",{student});  
});


//http DELETE request
const deleteStudent = asyncHandler(async(req, res, next) => {

        const student = await Student.findByIdAndDelete(req.params.id);  // Deletes through id 
        if(!student){
            throw new AppError("Student not found",404)};

        return apiResponse(res, 200, "Student deleted successfully"); 
});

module.exports = {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById
};


