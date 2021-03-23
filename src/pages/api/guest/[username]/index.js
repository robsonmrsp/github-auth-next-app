import fetch from 'node-fetch';

const getUser = async (req, res) => {
  const { username } = req.query;

  const response = await fetch(`https://api.github.com/users/${username}`);

  const user = await response.json();

  res.status(200).json(user);
};

export default getUser;
