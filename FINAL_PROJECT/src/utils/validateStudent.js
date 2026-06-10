const validateStudent = (data)=>{
    const {name, marks} = data;

    if(!name || marks === undefined){
        return "Name and marks are required !"
    };
    
    if(typeof marks !== 'number'){
        return "Marks should be a number !"
    };
    
    if(marks < 0 || marks > 100){
        return "Marks cannot be negative or greater than 100 !"
    };
    
    return null;
};

module.exports = {
    validateStudent
};

