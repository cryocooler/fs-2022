import { useState } from "react";
import Select from "react-select";

const AuthorForm = (props) => {
  const [birthYear, setBirthYear] = useState("");
  const [name, setName] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    props.editQuery({
      variables: { name: name.value, setBornTo: parseInt(birthYear) },
    });
    setBirthYear("");
    setName("");
  };

  return (
    <div>
      <Select defaultValue={name} onChange={setName} options={props.options} />
      born
      <form onSubmit={submit}>
        <input
          value={birthYear}
          onChange={({ target }) => setBirthYear(target.value)}
        />
        <div>
          <button type="submit"> update author </button>
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;
