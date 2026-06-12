const errorHandler = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message= err.message || "Server Error" ;

    if(err.name === "CastError"){
        statusCode = 400;
        message = "Invalid ID format";
        
    }
    if(err.code === 11000){
        statusCode = 400;
        message = "Resource already exists";
        
    }
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
        timestamp: new Date().toISOString()
    });
};

module.exports = errorHandler;

