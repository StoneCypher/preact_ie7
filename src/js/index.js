
/* fundamentally preact does things with text nodes that ie7 cannot */
/* the easiest way out is to replace the creation of a text node */
/* lol, hacky and gross */

document.createTextNode = function(data) {

  const text     = document.createElement('x-text');
  text.innerText = data;

  return text;

}

/* don't hate me because my hack is beautiful */





import { h, render, Component } from 'preact';
import { Widget }               from './Widget.jsx';



function begin(target) {

  const tgt = document.getElementById(target);
  render( <Widget foo="bar"/>, tgt );

}



export { begin };
