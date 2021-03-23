import fetch from 'node-fetch';

const getStarredRepos = async (req, res) => {
  const { username } = req.query;

  const response = await fetch(`https://api.github.com/users/${username}/starreds`);

  const json = await response.json();
  res.status(response.status).json(json);
};

export default getStarredRepos;
