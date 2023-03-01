import { Layout } from '@components';
import { AuthProvider } from '@contexts/auth';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

import '../styles/global.css';
const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Layout></Layout>
    <Component {...pageProps} />
  </AuthProvider>
);

export default App;
