import React from 'react';
import ReactDom from 'react-dom';
// import PrimeraApp from './PrimeraApp';
import CounterApp from './CounterApp';
import './index.css';
import PrimeraApp from './PrimeraApp';

const root = document.querySelector('#root');

// ReactDom.render( <PrimeraApp saludo="Hola, Soy Goku" />, root );
ReactDom.render( <CounterApp />, root );