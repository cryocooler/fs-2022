import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  console.log("set Token called");
  token = `bearer ${newToken}`;
};
//console.log("token", token);
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  //console.log("creating in service", newObject);
  //console.log("token to send", token);
  const config = {
    headers: { Authorization: token },
  };
  console.log("creation called with token", token);

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (updateObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${updateObject.id}`,
    updateObject,
    config
  );
  return response.data;
};

const remove = async (removeObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${removeObject.id}`, config);

  return response.data;
};

const updateComment = async (updateObject, comment) => {
  // console.log("adding", updateObject);
  // console.log("comment in blogservice", comment);
  const blog = {
    ...updateObject,
    comments: updateObject.comments.concat(comment),
  };
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${updateObject.id}/comments`,
    blog,
    config
  );
  return response.data;
};

export default { getAll, create, update, setToken, remove, updateComment };
