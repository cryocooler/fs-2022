import AuthorEditor from "./AuthorEditor";

const Authors = (props) => {
  console.log("component refreshed");
  if (!props.show) {
    return null;
  }
  const result = props.authors;

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;
  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      {props.token === null ? null : (
        <AuthorEditor options={options} editQuery={props.editQuery} />
      )}
    </div>
  );
};

export default Authors;
