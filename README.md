This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

This is a Basic React.js + Next.js application, so, after you clone the project, be sure that you have installed all the deps.


```bash
npm install
# or
yarn 
```

After this, run the development server:

```bash
npm run dev
# or
yarn dev
```
## Running tests
- The unit tests can be run as follow:

```bash
npm run test
# or
yarn test
```
- And the e2e tests:

```bash
npm run e2e
# or
yarn e2e
```

We split the application basically into two pages:

Open [http://localhost:3000/](http://localhost:3000/)  shows the application for a guest user, ie, it's open for a non-loggued in user.


Once the user gets logged in, He'll be redirected to the page[http://localhost:3000/home](http://localhost:3000/home).

if a user tries to get the page [http://localhost:3000/home](http://localhost:3000/home) without login, the user will be redirected to the login page.



Any constructive criticism is welcome, and please, if you believe any of this code can be copied for your project, please fix if before use. (:D)

Thanks.