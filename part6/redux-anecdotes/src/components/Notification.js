import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification.message}</div>;
};

export default Notification;
