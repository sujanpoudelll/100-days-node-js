//for loop

for(let i=1;i<=10;i++){
    console.log(i);
}

for(let i=1;i<=20;i++){
    if(i % 2 === 0){
        console.log(i);
    }
}

let sums = 0;
for(let i=1;i<=10;i++){
    sums += i;
}
console.log("The sum is "+ sums);


//while  loop
let a = 1;
while (a<=10){
    console.log(a);
    a++;
}


a = 1;
console.log("Even Numbers");
while (a<=20){
    if (a % 2 === 0){
        console.log(a);
    }
    a++;
}

let sum = 0;
a = 1;
while (a<=10){
    sum += a;
    a++;
}
console.log("The sum of 1-10 is "+ sum);






