
import { h, render, Component } from 'preact';
import { Widget }               from './Widget.jsx';



function begin(target) {

  const tgt = document.getElementById(target);
  render( <Widget foo="bar"/>, tgt );

}



export { begin };
