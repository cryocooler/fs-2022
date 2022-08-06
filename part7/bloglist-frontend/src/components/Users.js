// import userService from "../services/users";

const Users = (blogUsers) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>

          {blogUsers.users.map((bu) => (
            <tr key={bu.id}>
              <td>{bu.name}</td>
              <td>{bu.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
