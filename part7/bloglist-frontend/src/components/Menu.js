import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../reducers/loginReducer";
import { AppBar, Toolbar, IconButton, Button, Typography } from "@mui/material";

const Menu = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.login);
  //   const padding = { paddingRight: 5 };
  //   const menuStyle = {
  //     paddingTop: 3,
  //     paddingBottom: 3,
  //     paddingLeft: 1,
  //     marginBottom: 5,
  //     background: "lightgrey",

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {loggedUser === null ? null : (
          <Typography>
            <em>{`${loggedUser.name} logged in`}</em>
          </Typography>
        )}
        {loggedUser === null ? null : (
          <Button color="inherit" onClick={() => dispatch(logOutUser())}>
            logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
