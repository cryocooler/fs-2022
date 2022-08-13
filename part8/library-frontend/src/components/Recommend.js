const RecList = (props) => {
  if (!props.show) {
    return null;
  }

  if (props.user.loading) {
    return <div>loading...</div>;
  }
  const user = props.user.data.me;
  const filteredBooks = props.books.data.allBooks.filter((book) =>
    book.genres.includes(user.favouriteGenre)
  );
  console.log("user", user);

  return (
    <div>
      <h4>Recommendations</h4>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title} </td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecList;
