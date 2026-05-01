
//object and its key-value pairs.
let student = {
    name: "Sujan",
    age: 25,
    mark: 78
};

console.log(student.name);
console.log(student.age);
console.log(student.mark);


let students = [
    {name:"Ram" , marks: 45},
    {name:"Shyam" , marks: 67},
    {name:"Hari" , marks: 30}
];


let passedStudents =[];
let highestMarkStudent = students[0];

for (let i=0; i<students.length; i++){
    console.log(students[i].name+ ": "+students[i].marks);
    if(students[i].marks >=40){
        passedStudents.push(students[i]);
    }
    if(students[i].marks > highestMarkStudent.marks){
        highestMarkStudent = students[i];
    }


}
console.log(passedStudents);
console.log(highestMarkStudent.name + " (" + highestMarkStudent.marks +")");





