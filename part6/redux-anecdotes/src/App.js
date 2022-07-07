import NewAnecdote from "./components/AnecdoteForm";
import Anecdotes from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <Anecdotes />
      <NewAnecdote />
    </div>
  );
};

export default App;
