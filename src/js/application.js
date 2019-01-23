import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import {Filter} from 'tone'
import {PolySynth} from 'tone'
import {Synth} from 'tone'
import {Oscillator} from 'tone'
import {PingPongDelay} from 'tone'
import {BitCrusher} from 'tone'
import {LFO} from 'tone'
import {Panner} from  'tone'
import {Volume} from 'tone'

let osc = new Oscillator("C1", "sawtooth");
let filt = new Filter();
let pingpong = new PingPongDelay();
let bitcrush = new BitCrusher();
let poly = new PolySynth(4, Synth);
let lfo = new LFO(1, 400, 4000);
let pan = new Panner();
let vol = new Volume();

import 'css/app.css';

ReactDOM.render(
<App
    osc={osc}
    poly = {poly}
    filt={filt}
    pingpong = {pingpong}
    lfo={lfo}
    bitcrush = {bitcrush}
    pan = {pan}
    vol = {vol}
/>, document.getElementById('root'));