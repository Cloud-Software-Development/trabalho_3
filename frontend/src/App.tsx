import React from 'react';
import './App.css';
import Routes from './router';
import { Provider } from 'react-redux'
import store from './store'
import { ToastProvider } from 'react-toast-notifications';

// Infra
import MyHeader from './components/infra/MyHeader/MyHeader';

// Patterns
import NavBar from './components/patterns/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store} >
      <ToastProvider>
        <BrowserRouter>
          <MyHeader/>
          <NavBar/>
          <main>
            <Routes />
          </main>
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  );
}

export default App;
