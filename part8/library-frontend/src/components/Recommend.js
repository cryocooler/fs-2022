const RecList = (props) => {
  if (!props.show) {
    return null;
  }

  if (props.user.loading || props.books.loading) {
    return <div>loading...</div>;
  }
  const user = props.user.data.me;
  console.log("favegenre", user.favouriteGenre);
  const filteredBooks = props.books.data.allBooks.filter((book) =>
    book.genres.includes(user.favouriteGenre)
  );
  console.log("user", user);
  //props.query({ variables: { favouriteGenre: user.favouriteGenre } });

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
