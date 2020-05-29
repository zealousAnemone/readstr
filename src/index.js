import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import App from './components/App';

const Index = () => {
  return (
    <App />
  ); 
};

ReactDOM.render(<Index />, document.getElementById('root'));