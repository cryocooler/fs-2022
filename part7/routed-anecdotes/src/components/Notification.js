const Notification = ({ notification }) => {
  console.log(notification);
  const style = {
    padding: 2,
  };
  if (notification === "") {
    return null;
  }
  return <div style={style}> a new anecdote {notification} created!</div>;
};

export default Notification;
