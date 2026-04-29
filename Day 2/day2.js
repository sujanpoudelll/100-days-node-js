//Task 1
//Even or Odd number check


let number = 9;

if ((number % 2)===0){
    console.log("Even");
}
else{
    console.log("Odd");
}


//Task 2
//Voting Eligibility

let age = 2;

if (age >= 18){
    console.log("You are eligible to vote!");
} else {
    console.log("You are not eligible to vote.");
}


//Task 3
//Grade Checker

let marks = 80;

if (marks >= 80){
    console.log("A grade");
} else if (marks >= 60 && marks < 80) {
    console.log("B grade");
}else {
    console.log("Fail");
}