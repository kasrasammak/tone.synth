import React, { Component } from 'react'

import { Knob } from 'react-rotary-knob';
// import { Tone } from 'tone';


class App extends Component {

    state = {
        knobValueOsc : 0, 
        knobValueFilt : 0,
        anotherValue : 10,
    }

    startOsc = (event) => {
        const { osc } = this.props;
        osc.start();
    }

    stopOsc = (event) => {
        const { osc } = this.props;
        osc.stop();
    }
    restartOsc = (event) => {
        const { osc } = this.props;
        osc.restart();
    }
    disconnectOscMaster = (event) => {
        const { osc } = this.props;
        osc.disconnectMaster();
    }

    connectFiltertoMaster = (event) => {
        const { filt } = this.props;
        filt.toMaster();
    }

    connectToFilter = (event) => {
        const { osc, filt } = this.props;
        filt.connectInput(osc);
    }

    setOscFreq = (value) => {

        console.log(value);
        this.setState( { knobValueOsc: Math.floor(value)}  );
        const osc = this.props.osc;
        osc.setFreq(value);

    }
    startStopOsc = (event, time) => {
        const { osc } = this.props;
        osc.startstop(time);
    }

    tester = (event, value) => {
        console.log('tester running');
        console.log(arguments);
        console.log(value);
        console.log(this);
    }

    setFiltFreq = (value) => {

        console.log(value);
        this.setState( { knobValueFilt: Math.floor(value) } );
        const filt = this.props.filt;
        filt.setFreq(value);

    }
    setOscType = (event) => {
        console.log(event.target.value);
        console.log(event.target.value);
        const osc = this.props.osc;
        osc.setOscType(event.target.value);
    }

    connectEnvtoFilter = (event) => {
        const {env, filt} = this.props;
        env.connect(filt.frequency);
    }
    

    render () {
        console.log("RENDER APP");
        console.log(this.props);
        console.log(this.props.osc);
        console.log(this.state);


        return (<div>
            <h1>{this.state.knobValueOsc}</h1>
            <h1>{this.state.knobValueFilt}</h1>
            <button onClick={this.startOsc} >Start</button>
            <button onClick={this.stopOsc}>Stop</button>
            <button onClick={this.restartOsc}>Restart</button>
            <button onClick={this.connectToFilter}>Connect Filter</button>
            <button onClick={this.connectEnvtoFilter}>Connect Env to Filter</button>
            <button onClick={this.disconnectOscMaster}>Disconnect From Master</button>
            <br />
            <button onClick={(event) => { this.tester(event, 'AAAA') }}>Test 2</button>  
            <br/>
            <button onClick= {(event) => { this.startStopOsc(event, 2)}}>Play</button>
            <select onChange = {this.setOscType} id="oscType">
			    <option >sine</option> 
			    <option >square</option>
			    <option >triangle</option>
			    <option>sawtooth</option>
            </select>
            <Knob 
                min={20}
                max={20000}
                value={this.state.knobValueOsc}
                onChange={this.setOscFreq}
                unlockDistance={1}
            />
            <Knob 
                min={20}
                max={20000}
                value={this.state.knobValueFilt}
                onChange={this.setFiltFreq}
                unlockDistance={1}
            />
        </div>);
    }
}

export default App;