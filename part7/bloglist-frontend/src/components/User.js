import { useParams } from "react-router-dom";

const User = ({ users, blogs }) => {
  const id = useParams().id;
  console.log("id", id);
  console.log("blogs", blogs);
  const user = users.find((u) => u.id === id);
  const userBlogs = blogs.filter((b) => b.user.id === id);
  console.log("userblogs", userBlogs);
  if (!user || !blogs) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <p>
        <b>added blogs</b>
      </p>
      {userBlogs.map((b) => (
        <li key={b.id}>{b.title}</li>
      ))}
    </div>
  );
};

export default User;
