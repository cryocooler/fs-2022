import { gql, useQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKBYGENRE } from "../queries/queries";
import { useState, useEffect } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(null);
  const booksByGenre = useQuery(
    BOOKBYGENRE,
    {
      variables: { genreToSearch: filter },
    },
    { refetchQueries: [{ query: ALL_BOOKS }] }
  );

  useEffect(() => {
    setFilteredBooks(booksByGenre);
    console.log("genrebook", booksByGenre.data);
  }, [booksByGenre.data, filter]);
  console.log("filter", filter);
  if (!props.show) {
    return null;
  }

  if (!props.books) {
    return <div>loading...</div>;
  }
  console.log("component BOOKS refreshed");
  const books = props.books.allBooks;
  console.log("allbooks", books);

  let genres = Array.from(new Set(books.flatMap((book) => book.genres)));
  console.log("genres", genres);
  console.log("booksbygenre", filteredBooks);

  // const applyFilter = (genre) => {
  //   console.log("clicked genre", genre);

  // };

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
          {filteredBooks.data && filter
            ? filteredBooks.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
          {/* // : filteredBooks.map((book) => (
            //     <tr key={book.title}>
            //       <td>{book.title} </td>
            //       <td>{book.author.name}</td>
            //       <td>{book.published}</td>
            //     </tr>
              ))} */}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button onClick={() => setFilter(genre)} key={genre}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  );
};

export default Books;
