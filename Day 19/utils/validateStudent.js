exports.validateStudent = (data) => {
    const {name, marks} = data;

    if (!name || marks === undefined){
        return "Name and marks required !";
    }
    if(typeof marks!== "number"){
        return "Marks must be a number !";
    }
    
    return null;
};
