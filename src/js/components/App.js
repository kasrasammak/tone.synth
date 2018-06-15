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
        knobValueFilt : 0,
        anotherValue : 10,
        oct : 3,
        selectedNode : this.props.osc,
        selectedNodeInput : this.props.osc,
        selectedNodeOutput : this.props.osc
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

        // {a :1, b: 2 }
        const { osc } = this.props;
        osc.restart();
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


    // consider making a connect multiple inputs function later
    connectToFilter = (event) => {
        const { osc, poly, filt } = this.props;
        // var test = something ? something : somethingElse;
        filt.connectInput(poly) 
        filt.connectInput(osc);
    }

    setOscFreq = (value) => {

        console.log(value);
        this.setState( { knobValueOsc: Math.floor(value)}  );
        const osc = this.props.osc;
        osc.frequency.value = value;

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
        const {filt} = this.props;
        filt.frequency.value = value;

    }

    setOscType = (event) => {
        console.log(event.target.value);
        const osc = this.props.osc;
        osc.type = event.target.value;
    }

    connectEnvtoFilter = (event) => {
        const {env, filt} = this.props;
        env.connect(filt.filter.frequency);
    }

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
            <div>
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
            <h3>Osc Freq: {this.state.knobValueOsc}</h3>
            <Knob 
                min={20}
                max={20000}
                value={this.state.knobValueOsc}
                onChange={this.setOscFreq}
                unlockDistance={1}
            />
             <h3>Filter Freq: {this.state.knobValueFilt}</h3>
            <Knob 
                min={20}
                max={20000}
                value={this.state.knobValueFilt}
                onChange={this.setFiltFreq}
                unlockDistance={1}
            />
            <select onChange = {this.setFilterType}>
                <option>lowpass</option>
                <option>highpass</option>
                <option>bandpass</option>
                <option>notch</option>
            </select>
            <br />
            <button onClick={(event) => { this.tester(event, 'AAAA') }}>Test 2</button>  
            <br/>
    </div>);
    }
}

export default App;

