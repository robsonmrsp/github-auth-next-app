import fetch from 'node-fetch';

const put = async (req, res) => {
  const token = req.headers['x-token'];
  const body = req.body;

  const responseRepos = await fetch(`https://api.github.com//user/starred/${body.owner}/${body.repoName}`, {
    headers: {
      Authorization: `token ${token}`,
    },
    method: 'PUT',
  });
  const authRepos = await responseRepos.json();
  res.status(responseRepos.status).json(authRepos);
};

const del = async (req, res) => {
  const token = req.headers['x-token'];
  const body = JSON.parse(req.body);

  console.log(token);
  //
  const response = await fetch(`https://api.github.com/user/starred/${body.owner}/${body.repoName}`, {
    method: 'delete',
    headers: {
      accept: 'application/vnd.github.v3+json',
      'Content-Length': 0,
      Authorization: `token ${token}`,
    },
  });

  console.log('path', `https://api.github.com/user/starred/${body.owner}/${body.repoName}`);
  res.status(response.status).json(response.ok);
};

const get = async (req, res) => {
  const token = req.headers['x-token'];
  const responseRepos = await fetch(`https://api.github.com/user/starred`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const json = await responseRepos.json();
  res.status(responseRepos.status).json(json);
};

const userRepos = async (req, res) => {
  if (req.method === 'GET') {
    await get(req, res);
  } else if (req.method === 'PUT') {
    await put(req, res);
  } else if (req.method === 'DELETE') {
    console.log('accept delete');
    await del(req, res);
  }
};

export default userRepos;
