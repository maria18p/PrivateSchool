import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import actions from './store/actions';
import LoadApp from './appMiddleware';

export default function App() {
   store.subscribe(async () => {
      actions.saveUserData(store.getState().user);
   });

   return <Provider store={store}>{<LoadApp />}</Provider>;
}
