
// first, shim out addEventListener and removeEventListener

!window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
  WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
    var target = this;

    registry.unshift([target, type, listener, function (event) {
      event.currentTarget = target;
      event.preventDefault = function () { event.returnValue = false };
      event.stopPropagation = function () { event.cancelBubble = true };
      event.target = event.srcElement || target;

      listener.call(target, event);
    }]);

    this.attachEvent("on" + type, registry[0][3]);
  };

  WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
    for (var index = 0, register; register = registry[index]; ++index) {
      if (register[0] == this && register[1] == type && register[2] == listener) {
        return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
      }
    }
  };

  WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
    return this.fireEvent("on" + eventObject.type, eventObject);
  };
})(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);

// hokay





/* fundamentally preact does things with text nodes that ie7 cannot */
/* it sets a boolean as a member of a text node, which... okay */
/* the easiest way out is to replace the creation of a text node */
/* lol */

/* search for ATTR_KEY if you want to see the issue */

document.createTextNode = function(data) {

  const text     = document.createElement('x-text');
  text.innerText = data;

  return text;

}

/* don't hate this hack because it is beautiful */





import { h, render, Component } from 'preact';
import TodoList from './TodoList.jsx';



function begin(target) {

  const tgt = document.getElementById(target);
  render( <TodoList foo="bar"/>, tgt );

}



export { begin };
