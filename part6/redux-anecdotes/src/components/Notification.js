import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notifications).toString();
  const dispatch = useDispatch();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  console.log("notif.js", notification);

  if (notification.length > 0) {
    return <div style={style}>{notification}</div>;
  }
};

export default Notification;
