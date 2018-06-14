import React from 'react';
import ReactDOM from 'react-dom';
import Tone from 'tone';

import MyOscillator from 'components/Oscillator';
import MyFilter from 'components/Filter';
import App from 'components/App';
import MyEnvelope from './components/Envelope';

console.log("hello world");

let osc = new MyOscillator();
let filt = new MyFilter();
let env = new MyEnvelope();

ReactDOM.render(
<App 
    tone={Tone} 
    test="test"
    osc={osc}
    filt={filt}
    env={env}
/>, document.getElementById('root'));