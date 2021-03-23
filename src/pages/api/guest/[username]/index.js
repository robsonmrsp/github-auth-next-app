import fetch from 'node-fetch';

const getUser = async (req, res) => {
  const { username } = req.query;

  const response = await fetch(`https://api.github.com/users/${username}`);

  const json = await response.json();
  res.status(response.status).json(json);
};

export default getUser;
