
//About file handling
const fs = require('fs');
fs.writeFileSync('data.txt', "Hello from Node.js file system!")

console.log("File created and data written");
const data = fs.readFileSync('data.txt', 'utf-8');

console.log("File Content: ");
console.log(data);

fs.appendFileSync('data.txt',"\nThis is the append text!" );
console.log("Data appended");

fs.unlinkSync('data.txt')
console.log("File Deleted")

fs.writeFileSync('newdatafile.txt',"This is a new file!");
console.log("New file created!");


//Task
fs.writeFileSync('temp.txt',"I will be deleted soon!");
fs.writeFileSync('studentsData.txt', `Name,Marks
Sujan,91
Suprina,56 \n`
);
fs.appendFileSync('studentsData.txt', "Subash,23\n");
fs.appendFileSync('temp.txt', "Jhandu,34\n");

console.log("Students data containing file created.")
const dataInFile = fs.readFileSync('studentsData.txt','utf-8');
console.log(dataInFile);

fs.unlinkSync('temp.txt');