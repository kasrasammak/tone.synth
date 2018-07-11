import React from 'react';
import ReactDOM from 'react-dom';

import MyOscillator from 'components/Oscillator';
import App from 'components/App';
import MyEnvelope from './components/Envelope';

import {Tone} from 'tone'
import {Filter} from 'tone'
import {PolySynth} from 'tone'
import {Synth} from 'tone'
import {Oscillator} from 'tone'
import {Envelope} from 'tone'
import {Transport} from 'tone'
import {PingPongDelay} from 'tone'
import {BitCrusher} from 'tone'
import {LFO} from 'tone'
import {Panner} from  'tone'

let osc = new Oscillator("C1");
let filt = new Filter();
let env = new MyEnvelope();
// let transport = new Transport();
let pingpong = new PingPongDelay();
let bitcrush = new BitCrusher();
let poly = new PolySynth(4, Synth);
let lfo = new LFO(1, 400, 4000);
let pan = new Panner();


import 'css/app.css';

ReactDOM.render(
<App
    osc={osc}
    poly = {poly}
    filt={filt}
    pingpong = {pingpong}
    env={env}
    lfo={lfo}
    bitcrush = {bitcrush}
    pan = {pan}
    // transport={transport}
/>, document.getElementById('root'));