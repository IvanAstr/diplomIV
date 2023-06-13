import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProductStore from './store/ProductStore';
import UserStore from './store/UserStore';
import BasketStore from './store/BasketStore';
// import * as cors from 'cors'

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    product: new ProductStore(),
    basket: new BasketStore(),
  }}>
    <App />
  </Context.Provider>,
  document.getElementById("root")
)