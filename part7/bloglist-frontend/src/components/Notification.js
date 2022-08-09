import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  //console.log("DOES THIS COMPONENT FIRE?");
  const notification = useSelector((state) => state.notifications);
  //console.log("notification", notification);

  if (notification.message !== "") {
    if (notification.type === "error") {
      return <Alert severity="error">{notification.message}</Alert>;
    } else if (notification.type === "success") {
      return <Alert severity="success">{notification.message}</Alert>;
    }
  }

  // if (notification.type === "success") {
  //   return <div className="success">{notification.message}</div>;
  else {
    return null;
  }
};

export default Notification;
