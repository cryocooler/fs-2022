import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

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
  console.log("updating", updateObject);
  const incrementedVote = { ...updateObject, votes: updateObject.votes + 1 };
  const response = await axios.put(
    `${baseUrl}/${updateObject.id}`,
    incrementedVote
  );
  console.log("resp", response);
  return response.data;
};

export default { getAll, createNew, update };
