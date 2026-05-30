const errorHandler = (err, req, res, next) => { // error handling middleware should have 4 parameters
    console.error(err.stack); // prints entire details of error origination

    res.status(err.statusCode || 500).json({ //status changes if explicitly passed from controller
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorHandler; // exporting the module so other files can use it 