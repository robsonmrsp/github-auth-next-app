import fetch from 'node-fetch';

const user = async (req, res) => {
  const token = req.headers['x-token'];

  const responseUser = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const authUser = await responseUser.json();
  res.status(200).json(authUser);
};

export default user;
