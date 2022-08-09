import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

// const Blog = ({ blog }) => {
//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: "solid",
//     borderWidth: 1,
//     marginBottom: 5,
//   };

//   return (
//     <div style={blogStyle}>
//       <Link to={`/blogs/${blog.id}`}>
//         {blog.title} {blog.author}{" "}
//       </Link>
//     </div>
//   );
// };

const Blogs = ({ blogs, user }) => {
  if (user) {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {[...blogs]
                .sort(function (a, b) {
                  return b.likes - a.likes;
                })
                .map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  return null;
};

export default Blogs;
