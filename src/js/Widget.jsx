
import { h } from 'preact';





const Widget = props =>

  <div className="widget">
    <button onclick={() => console.log('hi')}/>
    I am a widget! My foo prop says {props.foo}.
  </div>;





export { Widget };
