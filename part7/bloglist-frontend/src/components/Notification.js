import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  //console.log("DOES THIS COMPONENT FIRE?");
  const notification = useSelector((state) => state.notifications);
  //console.log("notification", notification);

  if (notification.message !== "") {
    if (notification.type === "error") {
      return <div className="error">{notification.message}</div>;
    } else if (notification.type === "success") {
      return <div className="success">{notification.message}</div>;
    }
  }

  // if (notification.type === "success") {
  //   return <div className="success">{notification.message}</div>;
  else {
    return null;
  }
};

export default Notification;
