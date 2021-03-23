import React, { useContext, useEffect } from 'react';
import { clientId, redirectUri } from '@/config/Constants';
import { AppContext } from '@/shared/AppContext';
import Router from 'next/router';

const Login = ({ githubClientId, githubRedirectUri }) => {
  const { state, update } = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem('token', false);
    update({ isAuthUser: false });

    Router.push({
      pathname: '/',
    });
  }, []);

  return <>Logging out...</>;
};

// Essa é apenas uma forma de passar a informação que está nas variaveis de ambiente(server-side) para o cliente.
// A outra é configurando devidamente o next.config(como o que está feito e comentado).
// Feita essa configuração a variavel de ambiente poderá ser usada no  client-side.
export const getServerSideProps = async (ctx) => {
  return {
    props: {
      githubClientId: clientId,
      githubRedirectUri: redirectUri,
    },
  };
};
export default Login;
