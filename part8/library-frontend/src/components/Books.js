import { gql, useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries/queries";
import { useState } from "react";

const Books = (props) => {
  const [filter, SetFilter] = useState(null);
  console.log("filter", filter);
  if (!props.show) {
    return null;
  }
  console.log("component BOOKS refreshed");
  const books = props.books.data.allBooks;

  let genres = Array.from(new Set(books.flatMap((book) => book.genres)));
  console.log("genres", genres);

  const applyFilter = (genre) => {
    console.log("clicked genre", genre);
  };

  const filteredBooks = books.filter((books) => books.genres.includes(filter));

  console.log("filtered books", filteredBooks);

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filter === null
            ? books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : filteredBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title} </td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button onClick={() => SetFilter(genre)} key={genre}>
          {genre}
        </button>
      ))}
      <button onClick={() => SetFilter(null)}>all genres</button>
    </div>
  );
};

export default Books;
