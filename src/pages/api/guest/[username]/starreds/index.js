import fetch from 'node-fetch';

const getStarredRepos = async (req, res) => {
  const { username } = req.query;

  const response = await fetch(`https://api.github.com/users/${username}/starreds`);

  const staredRepos = await response.json();

  res.status(200).json(staredRepos);
};

export default getStarredRepos;
