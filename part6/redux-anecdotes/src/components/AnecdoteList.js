import { useDispatch, useSelector } from "react-redux";
import { addVote, voteAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  setNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} votes
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters);
  //console.log("current filter", filter);

  return (
    <div>
      {[...anecdotes]
        .filter((a) =>
          a.content.toLowerCase().includes(filter.search.toLowerCase())
        )
        .sort(function (a, b) {
          return b.votes - a.votes;
        })
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(voteAnecdote(anecdote));
              dispatch(createNotification(`you voted ${anecdote.content}`, 5));
            }}
          />
        ))}
    </div>
  );
};

export default Anecdotes;
