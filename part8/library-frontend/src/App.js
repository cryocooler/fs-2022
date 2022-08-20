import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {
  ADD_BOOK,
  ALL_AUTHORS,
  ALL_BOOKS,
  EDIT_BORN,
  LOGIN,
  ME,
  BOOKBYGENRE,
  BOOK_ADDED,
} from "./queries/queries";
import {
  useQuery,
  useMutation,
  useApolloClient,
  useSubscription,
} from "@apollo/client";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const queryBooks = useQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);
  const authors = useQuery(ALL_AUTHORS);
  console.log("existing authors", authors);
  // const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token") || null
  );
  const client = useApolloClient();

  const user = useQuery(ME);
  //console.log("user", user);
  // const favebooks = useQuery(BOOKSBYFAVOURITEGENRE, {
  //   refetchQueries: [{ query: ALL_BOOKS }],
  // });

  useEffect(() => {
    setBooks(queryBooks.data);
    console.log("setting books");
  }, [queryBooks.data]);

  console.log("WERE BOOKS INITIALIZED", books);
  const updateCache = (addedBook) => {
    console.log("added book", addedBook);
    const includedIn = (set, object) =>
      set.map((p) => p.title).includes(object.title);

    const localCache = client.readQuery({ query: ALL_BOOKS });
    console.log("localcache", localCache);

    if (!includedIn(localCache.allBooks, addedBook)) {
      client.writeQuery(
        {
          query: ALL_BOOKS,
          data: { allBooks: localCache.allBooks.concat(addedBook) },
        },
        { refetchQueries: [{ query: BOOKBYGENRE }] }
      );
    }
  };

  useSubscription(
    BOOK_ADDED,
    {
      onSubscriptionData: ({ subscriptionData }) => {
        const addedBook = subscriptionData.data.bookAdded;
        window.alert(`${addedBook.title} added`);
        console.log("SUBSCRIPTION TRIGGERED");
        updateCache(addedBook);
        // client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        //   return {
        //     allBooks: allBooks.concat(allBooks),
      },
    }
    // {
    //   refetchQueries: [
    //     { query: ALL_BOOKS },
    //     { query: ALL_AUTHORS },
    //     { query: BOOKBYGENRE },
    //   ],
    // }
  );

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("ERROR LOGIN");
    },
  });

  const queryBooksByGenre = useQuery(BOOKBYGENRE, {
    refetchQueries: [{ query: ALL_BOOKS }],
  });

  const [authorChangeHandler] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [bookCreationHandler] = useMutation(
    ADD_BOOK,
    {
      refetchQueries: [
        { query: ALL_BOOKS },
        { query: ALL_AUTHORS },
        { query: BOOKBYGENRE },
      ],
    },
    {
      onError: (error) => {
        console.log("ERROR");
      },
    }
  );

  // useEffect(() => {
  //   console.log("setting books", books);
  //   setQueryBooks(books);
  // }, [books.data]);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      console.log("token exists", token !== null);
    }
  }, [result.data]);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token === null ? null : (
          <button onClick={() => setPage("add")}>add book</button>
        )}
        {token === null ? null : (
          <button onClick={() => setPage("recommendations")}>
            recommendations
          </button>
        )}
        {token === null ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>

      <Authors
        editQuery={authorChangeHandler}
        authors={authors}
        show={page === "authors"}
        token={token}
      />

      <Books books={books} show={page === "books"} />
      <LoginForm login={login} setToken={setToken} show={page === "login"} />
      <NewBook creationQuery={bookCreationHandler} show={page === "add"} />
      <Recommend books={books} user={user} show={page === "recommendations"} />
    </div>
  );
};

export default App;

//notes: need to build a query to fetch books
// that have the current user's favorite genre.
// PSEUDO: Query {CurrentUser: User} Books :  Allbooks(genre)
