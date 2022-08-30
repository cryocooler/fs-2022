// const arr = [1, 0, 3, 0, 0];

// let test = arr.filter((val) => val > 0).length;

// console.log(test);

a = "1 2 3 4 5 6";

b = a
  .split(" ")
  .map((x) => parseInt(x))
  .reduce((x, y) => [...x, y], []);

console.log(b);

console.log(b.slice(3, b.length - 1));
