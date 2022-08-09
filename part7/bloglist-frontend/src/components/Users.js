// import userService from "../services/users";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
const UserList = () => {
  const loggedUser = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);
  console.log("blogusers", users);

  if (!loggedUser || !users) {
    return null;
  }
  return (
    <div>
      <Typography variant="h5">Users</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <b>blogs created</b>
              </TableCell>
            </TableRow>

            {users.map((bu) => (
              <TableRow key={bu.id}>
                <TableCell>
                  <AccountCircleIcon></AccountCircleIcon>
                  <Link to={`/users/${bu.id}`}>{bu.name}</Link>
                </TableCell>
                <TableCell>{bu.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
