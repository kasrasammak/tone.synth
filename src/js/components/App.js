import React, { Component } from 'react'

import { Knob } from 'react-rotary-knob';
import { Transport } from 'tone'
import { Tone } from 'tone';
import { Master } from 'tone';



import { noteMap } from 'config';


class App extends Component {
   constructor(props) {
       super(props);
       this.pressedKeys = [];
   }

    state = {
        knobValueOsc : 0, 
        knobValueFiltFreq : 0,
        knobValueFiltGain : 0.1,
        knobValuePingPongTime : 0.4,
        knobValuePingPongFeedback : 0.4,
        anotherValue : 10,
        oct : 3,
        selectedNode : this.props.osc,
        selectedNodeInput : this.props.osc,
        selectedNodeOutput : this.props.osc,
        knobValueLFOFreq : 0,
        knobValueLFOAmp : 1,
        LFOConnected: "Disconnected",
    }




    startOsc = (event) => {
        const { osc } = this.props;
        osc.start();
    }

    stopOsc = (event) => {
        const { osc } = this.props;
        osc.stop();
    }
    setOscType = (event) => {
        console.log(event.target.value);
        const osc = this.props.osc;
        osc.type = event.target.value;
    }






    connectMaster = (event) => {
        const { selectedNode } = this.state;
        //TODO handle different node types differently
        selectedNode.toMaster();
    }

    disconnectMaster = (event) => {
        const { selectedNode } = this.state;
        //TODO handle different node types differently
        selectedNode.disconnect(Master);
    }

    connect = (event) => {
        const { selectedNodeInput, selectedNodeOutput } = this.state;
        selectedNodeInput.connect(selectedNodeOutput);
    }
    disconnect = (event) => {
        const { selectedNodeInput, selectedNodeOutput } = this.state;
        selectedNodeInput.disconnect(selectedNodeOutput);
    }

    selectNode = (event) => {
        const node = this.props[event.target.value];
        console.log(node);
        this.setState({selectedNode : node});
    }
    selectNodeInput = (event) => {
        const node = this.props[event.target.value];
        console.log(node);
        this.setState({selectedNodeInput : node});
    }
    selectNodeOutput = (event) => {
        const node = this.props[event.target.value];
        console.log(node);
        this.setState({selectedNodeOutput : node});
    }

    // // consider making a connect multiple inputs function later
    // connectToFilter = (event) => {
    //     const { osc, poly, filt } = this.props;
    //     // var test = something ? something : somethingElse;
    //     filt.connectInput(poly) 
    //     filt.connectInput(osc);
    // }





    setOscFreq = (value) => {

        console.log(value);
        
        const osc = this.props.osc;
        const min = 20;
        const max = 20000;
        const position = value;
        const minp = 20;
        const maxp = 20000;
        const minv = Math.log(min)/Math.log(2);
        const maxv = Math.log(max)/Math.log(2);
        const scale = (maxv-minv)/(maxp-minp);
        const value2 = Math.pow(2, minv + scale*(position - minp));
        osc.frequency.value = value2;
        this.setState( { knobValueOsc: Math.floor(value2)}  );
    }
    setFiltFreq = (value) => {
        const {filt} = this.props;
        const min = 20;
        const max = 20000;
        const position = value;
        const minp = 20;
        console.log("Minp=" +minp);
        const maxp = 20000;
        console.log("Maxp=" + maxp);
        const minv = Math.log(min)/Math.log(2);
        console.log("Minv=" + minv);
        const maxv = Math.log(max)/Math.log(2);
        console.log("Maxv=" + maxv);
        const scale = (maxv-minv) / (maxp-minp);
        console.log("Scale=" + scale);
        const value2 = Math.pow(2, minv + scale*(position-minp));
        console.log("value = " + value)
        filt.frequency.value = value2;
        this.setState( { knobValueFiltFreq: Math.floor(value2) } );

    }
    setFiltGain = (value) => {

        console.log(value);
        this.setState( { knobValueFiltGain: Math.floor(value) } );
        const {filt} = this.props;
        filt.gain.value = value;
        console.log(filt.gain.value);

    }    
    setPingPongTime = (value) => {

        console.log(value);
        this.setState( { knobValuePingPongTime: value  } );
        const {pingpong} = this.props;
        pingpong.delayTime.value = value;


    }    
    setPingPongFeedback = (value) => {

        console.log(value);
        this.setState( { knobValuePingPongFeedback: value } );
        const {pingpong} = this.props;
        pingpong.feedback.value = value;


    }   
    setLFOFreq = (value) => {
        this.setState( { knobValueLFOFreq : Math.floor(value) } );
        const {lfo} = this.props;
        
        lfo.frequency.value = value;
        
    }
    setLFOAmp = (value) => {
        this.setState( { knobValueLFOAmp: value } );
        const {lfo} = this.props;
        lfo.amplitude.value = value;
    }
    turnLFOon = (event) => {
        const {lfo, filt} = this.props;
        lfo.connect(filt.frequency);
        lfo.start();
        this.setState( { LFOConnected : "Connected" } );
    }
    disconnectLFO = (event) => {
        const {lfo} =this.props;
        lfo.disconnect();
        this.setState( { LFOConnected : "Disconnected" } );
    }


    tester = (event, value) => {
        console.log('tester running');
        console.log(arguments);
        console.log(value);
        console.log(this);
    }


    // connectEnvtoFilter = (event) => {
    //     const {env, filt} = this.props;
    //     env.connect(filt.filter.frequency);
    // }

    setFilterType = (event) => {
        const {filt} = this.props;
        filt.type = event.target.value;
    }

    handleKeyDown = (event) => {
        
        const { poly, osc } = this.props;
        console.log(poly);
        const keyCode = event.keyCode;
        const note = noteMap[keyCode];
        let oct = this.state.oct;
    
        if (note != undefined && !this.pressedKeys.includes(keyCode)) {
            this.pressedKeys.push(keyCode);
            if (keyCode === 75 || keyCode === 79 || keyCode === 76) {
                poly.triggerAttack(`${note}${oct + 1}`);
                osc.frequency.value = `${note}${oct + 1}`;
                osc.start()
            }
            else{
                poly.triggerAttack(`${note}${oct}`);
                osc.frequency.value = `${note}${oct}`;
                osc.start()
            }
        }
        if (event.keyCode === 90){
            oct --;
        }
        if (event.keyCode === 88){
            oct ++;
        }
    
        this.setState({oct});
    }
    
    
    handleKeyUp = (event) => {
        const { poly, osc } = this.props;
        const keyCode = event.keyCode;
        const note = noteMap[keyCode];
        let oct = this.state.oct;
        var keyIndex = this.pressedKeys.indexOf(keyCode);
        if(keyIndex !== -1) {
            this.pressedKeys.splice(keyIndex, 1);
            if (note != undefined) {
                if (keyCode === 75 || keyCode === 79 || keyCode === 76) {
                    poly.triggerRelease(`${note}${oct + 1}`);
                    osc.frequency.value = `${note}${oct + 1}`;
                    osc.stop()
                }
                else{
                    poly.triggerRelease(`${note}${oct}`);
                    osc.frequency.value= `${note}${oct}`;
                    osc.stop()
                }
            }
        }
    
        this.setState({oct})
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
    } 
    


    render () {
        console.log("RENDER APP");
        console.log(this.props);
        console.log(this.props.osc);
        console.log(this.state);

        const nodes = Object.keys(this.props);
    
        return (
        <div>
            <div>
                <span>
                    <h1>Welcome to Kasra's tone.js Synthesizer.</h1>
                </span>
            </div>
            <div id="instructions"> 
                <span id="instructions1">
                    Feel Free to play with the Keyboard
                    <br/>
                    <span id="Rememberfootnote"> 
                        Remember to input a source sound to an output
                      
                        and connect the necessary source and/or output to the master channel.                    
                        <br/>
                    </span>
                </span>
            </div>
            <br/>
            <div class="grid-container">
                <div class = "grid-item1" id="oscillator">
                    <h2>Oscillator</h2>
                    <button onClick={this.startOsc} >Start</button>
                    <button onClick={this.stopOsc}>Stop</button>
                    <br/>
                    <select onChange = {this.setOscType} id="oscType">
                        <option >sine</option> 
                        <option >square</option>
                        <option >triangle</option>
                        <option>sawtooth</option>
                    </select>
                    <br/>
                    <button onClick= {(event) => { this.startStopOsc(event, 2)}}>Play</button>
                </div>
                <br/>
                <div class = "grid-item2" id="connections">
                    <h2>Connections</h2>
                    <span>Input: </span>
                    <select onChange={this.selectNodeInput} id="toMasterNode" name="audioNode">
                        
                        {nodes.map( (node) => {
                            return <option key={node} value={node}>{node.toUpperCase()}</option>
                        })}
                    </select> 
                    <br/>
                    <span> Output: </span>            
                    <select onChange={this.selectNodeOutput} id="toMasterNode" name="audioNode">
                        {nodes.map( (node) => {
                            return <option key={node} value={node}>{node.toUpperCase()}</option>
                        })}
                    </select>  
                    <br/>
                    <button onClick={this.connect}>Connect</button>       
                    <button onClick={this.disconnect}>Disconnect</button>
                    <br/>
                    <br/>
                    <div>
                        <select onChange={this.selectNode} id="toMasterNode" name="audioNode">
                            {nodes.map( (node) => {
                                return <option key={node} value={node}>{node.toUpperCase()}</option>
                            })}
                        </select>

                        <button onClick={this.connectMaster}>Connect  to Master</button>
                        <button onClick={this.disconnectMaster}>Disconnect from Master</button>
                    </div>
                </div>
                <br />
                <div class = "grid-item3" id="oscfreq">            
                    <h3>Osc Freq: {this.state.knobValueOsc}</h3>
                    <Knob 
                        min={20}
                        max={20000}
                        value={this.state.knobValueOsc}
                        onChange={this.setOscFreq}
                        unlockDistance={1}
                    />
                </div>
                <div class = "grid-item4" id="filterfreq">
                    <h3>Filter Freq: {this.state.knobValueFiltFreq}</h3>
                    <Knob 
                        // USEFUL CODE-INFO FOR LATER STYLES
                        // style={ {
                        //     width: "30px",
                        //     // marginTop: "8rem",
                        //     // marginLeft: "8rem",
                        //     height: "30px",
                        //     // display: "inline-block"
                        //   } }
                        min={20}
                        max={20000}
                        value={this.state.knobValueFiltFreq}
                        onChange={this.setFiltFreq}
                        unlockDistance={1}
                    />
                    <select onChange = {this.setFilterType}>
                        <option>lowpass</option>
                        <option>highpass</option>
                        <option>bandpass</option>
                        <option>notch</option>
                    </select>
                    <h3>Filter Gain: {this.state.knobValueFiltGain}</h3>
                    <Knob 
                        min={1}
                        max={200}
                        value={this.state.knobValueFiltGain}
                        onChange={this.setFiltGain}
                        unlockDistance={1}
                    />
                </div>
                <div class = "grid-item5" id= "pingpong">
                    <div id = "delaytime">
                        <h3> Ping Pong Delay Time: {this.state.knobValuePingPongTime}</h3>
                        <Knob 
                            min={0}
                            max={1}
                            value={this.state.knobValuePingPongTime}
                            onChange={this.setPingPongTime}
                            unlockDistance={1}
                        />
                    </div>
                    <div id="feedback">
                        <h3> Ping Pong Delay Feedback: {this.state.knobValuePingPongFeedback}</h3>
                        <Knob 
                            min={0}
                            max={1}
                            value={this.state.knobValuePingPongFeedback}
                            onChange={this.setPingPongFeedback}
                            unlockDistance={1}
                        /> 
                    </div>
                </div> 
                <div class = "grid-item6" id="lfo">
                    <button onClick={this.turnLFOon}>Turn LFO On</button>
                    <button onClick={this.disconnectLFO}>Disconnect LFO </button>
                    <br/>
                    <span> {this.LFOConnected} </span>
                    <h3> LFO Frequency: {this.state.knobValueLFOFreq}</h3>
                    <Knob 
                        min={0}
                        max={65}
                        value={this.state.knobValueLFOFreq}
                        onChange={this.setLFOFreq}
                        unlockDistance={1}
                    /> 
                    <h3> LFO Amplitude: {this.state.knobValueLFOAmp}</h3>
                    <Knob 
                        min={0}
                        max={1}
                        value={this.state.knobValueLFOAmp}
                        onChange={this.setLFOAmp}
                        unlockDistance={1}
                    />
                    <span id="lfofoot">
                    **LFO only connects to the Filter Frequency.</span>                     
                </div>                
            </div>                      
        </div>);
    }
}

export default App;

