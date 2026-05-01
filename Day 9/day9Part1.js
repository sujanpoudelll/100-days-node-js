let students = [{name: "Sujan", marks: 91},
    { name: "Ram", marks: 45 },
    { name: "Shyam", marks: 67 },
    { name: "Hari", marks: 30 },
    { name: "Gita", marks: 78 },
    { name: "Sita", marks: 55 },
    { name:"Subash", marks: 19}
];

let passedCount = 0;
let failedCount = 0;
let marksSum = 0;
let above50Students = [];
let highestMark = students[0];
for (let i = 0; i<students.length; i++){
    students[i].marks >= 40 ? passedCount++ : failedCount++;
    marksSum += students[i].marks;
    if (students[i].marks > highestMark.marks) {
    highestMark = students[i];
}
    if (students[i].marks > 50){
        above50Students.push(students[i]);
    }
   
}
console.log("No. of passed students: "+ passedCount);
console.log("No. of failed students: "+ failedCount);
console.log("Total marks: "+ marksSum);
console.log("Highest Scorer: \n"+ highestMark.name +": "+ highestMark.marks);
console.log("\nStudents achieving above 50:");
for(let i = 0; i<above50Students.length; i++){
    console.log(above50Students[i].name + ": " + above50Students[i].marks);
};

