import { gql, useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BORN } from "../queries/queries";
import { useState, useEffect } from "react";
import { canUseLayoutEffect } from "@apollo/client/utilities";
import Select from "react-select";

const Authors = (props) => {
  const [birthYear, setBirthYear] = useState("");
  const [name, setName] = useState("");
  const [changeBirthYear] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const submit = async (event) => {
    event.preventDefault();
    changeBirthYear({
      variables: { name: name.value, setBornTo: parseInt(birthYear) },
    });
    setBirthYear("");
    setName("");
  };

  if (!props.show) {
    return null;
  }

  const authors = result.data.allAuthors;
  const options = authors.map((a) => ({ value: a.name, label: a.name }));
  const ChangeBirth = () => {
    return (
      <div>
        <Select defaultValue={name} onChange={setName} options={options} />
        born
        <input
          value={birthYear}
          onChange={({ target }) => setBirthYear(target.value)}
        />
        <div>
          <button onClick={submit}> update author </button>
        </div>
      </div>
    );
  };
  //   <form onSubmit={submit}>
  //     <div>
  //       name
  //       <input
  //         value={name}
  //         onChange={({ target }) => setName(target.value)}
  //       />
  //     </div>
  //     <div>
  //       born
  //       <input
  //         value={birthYear}
  //         onChange={({ target }) => setBirthYear(target.value)}
  //       />
  //     </div>
  //     <div>
  //       <button type="submit">update author</button>
  //     </div>
  //   </form>
  //

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
      <ChangeBirth />
    </div>
  );
};

export default Authors;
