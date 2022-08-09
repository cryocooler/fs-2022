import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logUserToApp } from "../reducers/loginReducer";
import { TextField, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

const LoginForm = () => {
  console.log("refreshed");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.login);

  const handleLogin = async (event) => {
    console.log("called");
    event.preventDefault();
    console.log(username, password);
    dispatch(logUserToApp({ username, password }));
    setUsername("");
    setPassword("");
  };

  if (!loggedUser) {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            margin="normal"
            label="Username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          <TextField
            margin="normal"
            label="Password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <Button variant="contained" type="submit" id="login-button">
          login
        </Button>
      </form>
    );
  }
};

export default LoginForm;
