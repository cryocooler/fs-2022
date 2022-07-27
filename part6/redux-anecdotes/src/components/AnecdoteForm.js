//import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";
//import anecdoteService from "../services/anecdotes";
const AnecdoteForm = (props) => {
  //const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    console.log(anecdote);
    event.target.anecdote.value = "";
    props.createAnecdote(anecdote);
    props.createNotification(`Anecdote ${anecdote} created!`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  createNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
