let marks = [10,45, 67, 19, 30, 78,98,71];
failed =[];
newMarks=[];
highScores = [];
//pass marks = 40
//Adding 5 as grace marks
//High Scores >= 70
for(let i=0; i<marks.length; i++){
    if(marks[i]<40){
        failed.push(marks[i]);
    }
    newMarks.push(marks[i]+5);

    if(marks[i]>=70){
        highScores.push(marks[i]);
    }
}
console.log("Failed:" + failed);
console.log("New Marks: " + newMarks);
console.log("High Scores: " +highScores);







