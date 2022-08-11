let books = [
  { name: "lol", id: 1 },
  { name: "lotr", id: 2 },
];

books.push({ name: "hiih", id: 3 });
console.log(books);

console.log(books.map((b) => b.name));

const a = () => books.map((b) => b.name);
console.log(a);
console.log(a().includes("a"));

console.log(books.findIndex((a) => a.name === "lol"));

books[0].name = "Antifragile";

console.log(books);

console.log(books.map((book) => ({ book: book.name, id: book.id + 5 })));
