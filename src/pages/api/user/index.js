import fetch from 'node-fetch';

const user = async (req, res) => {
  const token = req.headers['x-token'];

  const responseUser = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const json = await responseUser.json();
  res.status(responseUser.status).json(json);
};

export default user;
