import 'bulma/css/bulma.css';
import '../styles/globals.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider } from '@/shared/AppContext';
import { HereMap } from '@/shared/HereMap';

// HereMap.initialize();
// Create a client
const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  return (
    <>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </AppProvider>
    </>
  );
};

export default App;
