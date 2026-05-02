console.log("Hello from Node.js");

const math = require("./math");

console.log("Added: ", math.add(5,6));
console.log("Multiplied: ", math.multiply(9,6));
console.log("Subtracted: ", math.subtract(5,2));
console.log("Divided: ", math.divide(10,0));
