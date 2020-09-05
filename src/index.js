import React from 'react';
import ReactDOM from 'react-dom';
//import PlazaApp from './plaza-app';
import * as serviceWorker from './serviceWorker';
import PlazaApp from './plaza-app';


//ReactDOM.render(<PlazaApp />, document.getElementById('root'));
ReactDOM.render(
  <PlazaApp></PlazaApp>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

