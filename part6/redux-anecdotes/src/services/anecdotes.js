import axios from "axios";

const baseUrl = "http://localhost:3005/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async (updateObject) => {
  const response = await axios.put(
    `${baseUrl}/${updateObject.id}`,
    updateObject
  );
  return response.data;
};

export default { getAll, createNew, update };
