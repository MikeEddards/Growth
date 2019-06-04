import React from 'react';
import {HashRouter} from 'react-router-dom'
import routes from './routes'
import MainNav from './Components/MainNav'
import './App.css';

function App() {
  return (
    <HashRouter>
    <div >
      <MainNav />
      <div className='main'>
      {routes}
      </div>
    </div>
    </HashRouter>
  );
}

export default App;
