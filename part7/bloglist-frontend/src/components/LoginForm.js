import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logUserToApp, logOutUser } from "../reducers/userReducer";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password);
    dispatch(logUserToApp({ username, password }));
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {user.name} is logged in{" "}
          <button
            onClick={() => {
              dispatch(logOutUser());
              setPassword("");
              setUsername("");
            }}
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default login;
