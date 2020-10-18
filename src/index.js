import React, { lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppContextProvider from 'hooks/AppContextProvider';

const App = lazy(() => import('./App'));

ReactDOM.render(
  <AppContextProvider>
    <Suspense fallback={<h3>Loading...</h3>}>
      <App />
    </Suspense>
  </AppContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
