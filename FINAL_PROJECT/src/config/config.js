const config ={
    port: process.env.PORT || 5001,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV || "development",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET
    
};

module.exports = config;

