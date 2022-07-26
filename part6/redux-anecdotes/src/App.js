import NewAnecdote from "./components/AnecdoteForm";
import Anecdotes from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);
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
