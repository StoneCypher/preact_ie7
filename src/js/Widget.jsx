
import { h } from 'preact';





const Widget = props =>

  <div className="widget">
    I am a widget! My foo prop says {props.foo}.
    <br/>
    <button onclick={() => console.log('hi')}>I am a button.  Click me for "hi" in Console</button>
  </div>;





export { Widget };
