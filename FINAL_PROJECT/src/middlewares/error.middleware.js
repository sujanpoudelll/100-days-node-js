const errorHandler = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500;

    if(err.name === "CastError"){
        err.message = "Invalid ID format";
        err.statusCode = 400;
    }
    if(err.code === 11000){
        err.message = "Resource already exists";
        err.statusCode = 400;
    }
    res.status(statusCode).json({
        success:false,
        message: err.message || "Server Error",
        statusCode: err.statusCode || 500,
        timestamp: new Date().toISOString()
    });
};

module.exports = errorHandler;

