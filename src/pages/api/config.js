// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { clientId, redirectUri, clientSecret, proxyUrl } from '@/config/Constants';

export default (req, res) => {
  console.log({ clientId, redirectUri, clientSecret, proxyUrl });

  res.status(200).json({ clientId, redirectUri, clientSecret, proxyUrl });
};
