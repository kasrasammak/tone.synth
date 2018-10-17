import React, { Component } from 'react'

import { Knob } from 'react-rotary-knob';
import { Transport } from 'tone'
import { Tone } from 'tone';
import { Master } from 'tone';
import { Signal } from 'tone';
import { PingPongDelay } from 'tone';

import Instructions from './Instructions'

import ScreenManager from 'components/ScreenManager';
import BitCrushScreen from 'components/BitCrushScreen';
import LFOScreen from 'components/LFOScreen';
import PingPongScreen from './PingPongScreen';

import { noteMap } from 'config';
import MyComponent from './MyComponent';
import Key from './Key'
import FilterType from './FilterType'
import Routing from './Routing'

import OscSelect from './OscSelect'
import OscAdds from './OscAdds'
import Settings from './Settings'

import Keyboard from './Keyboard'
import MyFilter from './Filter'

import RoutingAndSettings from './RoutingAndSettings'


class App extends Component {
   constructor(props) {
       super(props);
       this.pressedKeys = [];
       }



    state = {
        knobValueOsc : 0,
        knobValueOscPhase : 0,
        
        knobValuePingPongTime : 0.4,
        knobValuePingPongFeedback : 0.4,
        anotherValue : 10,
        oct : 3,
        selectedNode : this.props.osc,
        selectedNodeInput : this.props.osc,
        selectedNodeOutput : this.props.osc,
        knobValueLFOFreq : 0,
        knobValueLFOAmp : 1,
        knobValueBitCrushDepth : 4,
        knobValueBitCrushWet : .5,
        LFOConnected: "Disconnected",
        knobValuePingPongWet : .5,
   
        knobValuePanner :  0,
        knobValueVolume : 0,

        oscillators : [],

        



        
        openoscwav : "osctype",
        oscwavopen : false,
        osctype : "oscsource",
        osctypeopen: false,

        
        
        volfeedbarbig: "volfeedbar norm",
        volfeedbarsmall: "volfeed1 norm2",
        volfeedbarsmalllength: 180,

        oscselectclass: "osc one",
        oscselectclass2: "osc",

        
        
   
        keyCode : 65,
        note : "C",

        selectedNumbers : [],

        number : 1
    }


    openOscWav = () => {
        console.log(this.state.openoscwav)
        if (this.state.openoscwav ===  "osctype")
            {
                this.setState({openoscwav: "osctype open"})
                this.setState({oscwavopen: true})
            }
        else {
            this.setState({openoscwav: "osctype"})
            this.setState({oscwavopen: false})
        }
    }
    oscTypeClick = () => {
        if (this.state.osctype === "oscsource")
        {
            this.setState({osctype: "oscsource openn"})
            this.setState({osctypeopen: true})
        }
        else {
            this.setState({osctype: "oscsource"})
            this.setState({osctypeopen: false})
        }
    }


    setOscType = (event) => {
        console.log(event.target.value);
        const osc = this.props.osc;
        osc.type = event.target.value;
    }
    changeSine = (e) => {
        const osc = this.props.osc;
        osc.type = "sine"
    }
    changeSquare = (e) => {
        const osc = this.props.osc;
        osc.type = "square"
    }
    changeSaw = (e) => {
        const osc = this.props.osc;
        osc.type = "sawtooth"
    }
    changeTriangle = (e) => {
        const osc = this.props.osc;
        osc.type = "triangle"
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

    setOscPhase = (val) => {
        const osc = this.props.osc
        osc.phase = val;
        this.setState({knobValueOscPhase : Math.floor(val)})
    }

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

    
    setPan = (val) => {
        const {pan} = this.props;
        this.setState( {knobValuePanner : val.toFixed(2)} );
        pan.pan.value = val;
    }
    setVol = (val) => {
        const {vol} = this.props;
        this.setState( {knobValueVolume : val.toFixed(2)} );
        vol.volume.value = val;
    }

    addSection = () => {
        if (this.state.selectedNumbers.length === 0) {
            this.setState(prevState => ({
                selectedNumbers: prevState.selectedNumbers.concat(2)
            }))
        }
        else {
            const val = this.state.selectedNumbers[this.state.selectedNumbers.length - 1];
            this.setState(prevState => ({
                selectedNumbers: prevState.selectedNumbers.concat(val + 1)
            }))
        }
        
    }
    makeNewOscillator = () => {
        
        return(new Oscillator())
    }

    removeSection = () => {
        this.state.selectedNumbers.pop()
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers
        }))
    }

    changeSelect = () => {
        if (this.state.oscselectclass === "osc"){

        }
    }


    // connectEnvtoFilter = (event) => {
    //     const {env, filt} = this.props;
    //     env.connect(filt.filter.frequency);
    // }


    setVolFeed = () => {
        this.setState({volfeedbarbig: "volfeedbar", volfeedbarsmall: "volfeed1"})
    }
    setVolFeedBack = () => {
        this.setState({volfeedbarbig: "volfeedbar norm", volfeedbarsmall: "volfeed1 norm2"})
    }

    setVolFeed2(val) {
        this.setState({volfeedbarsmalllength : Math.floor(val)})

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
                this.setState({note})
                poly.triggerAttack(`${note}${oct + 1}`);
                osc.frequency.value = `${note}${oct + 1}`;
                osc.start()
                this.setVolFeed();
            }
            else{
                this.setState({note})
                poly.triggerAttack(`${note}${oct}`);
                osc.frequency.value = `${note}${oct}`;
                osc.start();
                this.setVolFeed();
            }
        }
        if (event.keyCode === 90){
            oct --;
        }
        if (event.keyCode === 88){
            oct ++;
        }
        this.setState({oct, keyCode});
        
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
                    osc.stop();
                    this.setVolFeedBack();
                }
                else{
                    poly.triggerRelease(`${note}${oct}`);
                    osc.frequency.value = `${note}${oct}`;
                    osc.stop();
                    this.setVolFeedBack();
                }
            }
        }
        
        this.setState({oct})
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
        const {osc, vol, filt, pan} = this.props;
        vol.toMaster();
        console.log("");
       
        osc.connect(pan);
        pan.connect(vol);
        
       
        console.log("THIS IS THE ")
        console.log(vol.volume.value)
        console.log(this.state.filtonoff)
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
    }

    // componentDidUpdate() {
    //     var output = Master.volume.value;
    //     this.setVolFeed2(output);
    // }


    

    render () {
        
        // console.log(this.mast.volume.value)
        
       

        console.log("RENDER APP");
        console.log("")
        console.log(this.state.currentScreen)


        // const {filt} = this.props;
        // console.log(filt.type)
        
        // console.log(this.props);
        // console.log(this.props.osc);
        // console.log(this.state);
        // console.log(this.state.color);

        const nodes = Object.keys(this.props);


        var divStyle2 = {
            display:this.state.oscwavopen?'block':'none'
          };

        var divStyle3 = {
            display: this.state.osctypeopen? 'block':'none'
        }
        

        return (
        <div className="appbackground">
            <div className="app">
                <div className="upperchain">

                <Keyboard
                    oct={this.state.oct}
                    note={this.state.note}
                    />   

                <MyFilter 
                    osc={this.props.osc}
                    pan={this.props.pan}
                    filt={this.props.filt}
                    />
              
                <div className="component master">
                  <div className="uppermaster">
                    <div className="mastertext">MASTER</div>
                      
                     <div className={this.state.volfeedbarbig}>
                      <div className={this.state.volfeedbarsmall}></div>
                      <div className="volfeed2"></div>
                     </div>                     
                     <div className={this.state.volfeedbarbig}>
                      <div className={this.state.volfeedbarsmall}></div>
                      <div className="volfeed2"></div>
                     </div>
                     <div className="lowervolfeed"></div>  
                  </div>
                  <div className="lowermaster">
                    <div className="masterknobs">
                      <div className="masterknobpan">
                        <div className="masterpan">Pan</div>
                        <Knob
                            style={ {
                                width: "50px",
                                height: "50px",
                            } }
                            min={-1}
                            max={1}
                            value={this.state.knobValuePanner}
                            onChange={this.setPan}
                            unlockDistance={1}
                        />
                      </div>
                      <div className="masterknobvol">
                        <div className="mastervol">Vol</div>     
                        <Knob
                            style={ {
                                width: "50px",
                                height: "50px",
                            } }
                            min={-96}
                            max={0}
                            value={this.state.knobValueVolume}
                            onChange={this.setVol}
                            unlockDistance={1}
                        />
                      </div>  
                    </div>
                  </div>
                </div>
            </div>

            <div className="lowerchain">
                        <div className="oscillators">
                        <OscSelect 
                        myOscStyle={divStyle2}
                        onWavClick={this.openOscWav}
                        myWavClass={this.state.openoscwav}
                        oscTypeClick={this.oscTypeClick}
                        oscTypeClass={this.state.osctype}
                        divStyle={divStyle3}
                        knobValueOsc={this.state.knobValueOsc}
                        setOscFreq={this.setOscFreq}
                        changeSine={this.changeSine}
                        changeSquare={this.changeSquare}
                        changeSaw={this.changeSaw}
                        changeTriangle={this.changeTriangle}
                        osc={this.props.osc}
                        poly={this.props.poly}
                        pan={this.props.pan}
                        changeSelect={this.changeSelect}
                        myClass={this.state.oscselectclass}
                        number={this.state.number}

                        />

                        <Instructions />

                        {/* {this.state.selectedNumbers.map((number) => 
                            <OscSelect 
                            myOscStyle={divStyle2}
                            onWavClick={this.openOscWav}
                            myWavClass={this.state.openoscwav}
                            oscTypeClick={this.oscTypeClick}
                            oscTypeClass={this.state.osctype}
                            divStyle={divStyle3}
                            knobValueOsc={this.state.knobValueOsc}
                            setOscFreq={this.setOscFreq}
                            changeSine={this.changeSine}
                            changeSquare={this.changeSquare}
                            changeSaw={this.changeSaw}
                            changeTriangle={this.changeTriangle}
                            osc={this.makeNewOscillator}
                            poly={this.props.poly}
                            changeSelect={this.changeSelect}
                            myClass={this.state.oscselectclass2}
                            number={number}

                            />
                            )}
                        

                        <div class="osc new">
                            <div onClick= {this.addSection} class="numbercontainer">
                                <div class="addconn">
                                    <div class="plustext">+</div>
                                </div>
                            </div>
                            <div class="addconnection">
                                ADD CONNECTION
                            </div>
                            <div onClick= {this.removeSection} class="numbercontainer">
                                <div class="addconn">
                                    <div class="minustext">-</div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <RoutingAndSettings 
                        osc={this.props.osc}
                        pan={this.props.pan}
                        lfo={this.props.lfo}
                        filt={this.props.filt}
                    />
                </div>

            </div>
           
      

        </div>);   


    }
}

export default App;


            {/* <div>
                <span>
                    <h1>Welcome to Kasra's tone.js Synthesizer.</h1>
                </span>
            </div>
            <div id="instructions">
                <span id="instructions1">
                    Feel free to play with the keyboard
                    <br/>
                    <span id="Rememberfootnote">
                        Remember to input a source sound to an output

                        and connect the necessary source and/or output to the master channel.
                        <br/>
                    </span>
                </span>
            </div>
            <br/>
            <div className="grid-container">
                <div className = "grid-item1" id="oscillator">
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
                    <div className = "oscknobgrid">
                        <div className = "oscknob1" id="oscfreq">
                            <h3>Osc Freq: <br/>{this.state.knobValueOsc}</h3>
                            <Knob
                                style={ {
                                    width:"40px",
                                    height: "40px",
                                }}
                                min={20}
                                max={20000}
                                value={this.state.knobValueOsc}
                                onChange={this.setOscFreq}
                                unlockDistance={1}
                            />
                        </div>
                        <div className = "oscknob2" id="oscphase">
                            <h3>Osc Phase: <br/>{this.state.knobValueOscPhase}</h3>
                            <Knob
                                style={ {
                                    width:"40px",
                                    height: "40px",
                                }}
                                min={0}
                                max={360}
                                value={this.state.knobValueOscPhase}
                                onChange={this.setOscPhase}
                                unlockDistance={1}
                            />
                        </div>
                    </div>
                </div>
                <div className = "grid-item2" id="connections">
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
                    <span id="connectionstart">**START HERE BELOW</span>
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
                <div className="grid-item4" id="filterfreq">
                    <h2>Filter</h2>
                    <h3>Filter Freq: <br/>{this.state.knobValueFiltFreq}</h3>
                    <Knob
                        style={ {
                            width: "40px",
                            height: "40px",
                          } }
                        min={this.state.knobFilterFreqMin}
                        max={this.state.knobFilterFreqMax}
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
                    <h3>Filter Gain: <br/>{this.state.knobValueFiltGain}</h3>
                    <Knob
                        style={ {
                            width:"40px",
                            height: "40px",
                        }}
                        min={1}
                        max={200}
                        value={this.state.knobValueFiltGain}
                        onChange={this.setFiltGain}
                        unlockDistance={1}
                    />
                </div>
                <div className="Screen">
                    <ScreenManager
                        currentScreen={this.state.currentScreen}
                        updateScreen={this.updateScreen}
                        screens={[
                            <Screen 
                                knobDepthChange={this.setBitCrushDepth}
                                knobDepthValue={this.state.knobValueBitCrushDepth}
                                knobWetChange={this.setBitCrushWet}
                                knobWetValue={this.state.knobValueBitCrushWet}
                            />,
                            <LFOScreen 
                                TurnLFOOn={this.turnLFOon} 
                                TurnLFOOff={this.disconnectLFO}
                                knobLFOFreqChange={this.setLFOFreq}
                                knobLFOFreqValue={this.state.knobValueLFOFreq}
                                knobLFOAmpChange={this.setLFOAmp}
                                knobLFOAmpValue={this.state.knobValueLFOAmp}
                            />,
                            <PingPongScreen
                                knobTimeChange={this.setPingPongTime}
                                knobTimeValue={this.state.knobValuePingPongTime}
                                knobFeedbackChange={this.setPingPongFeedback}
                                knobFeedbackValue={this.state.knobValuePingPongFeedback}
                                knobWetChange={this.setPingPongWet}
                                knobWetValue={this.state.knobValuePingPongWet}
                            />
                        ]}
                    />
                </div>
                <div class="selectorgrid">
                    <div id="pingpongselector" onClick={() => this.updateScreen(2)}>
                        <h2> Ping Pong Delay </h2>
                    </div>
                    <div id="lfoselector" onClick={() => this.updateScreen(1)}>
                        <h2>LFO</h2>
                    </div>
                    <div id="bitcrusherselector" onClick={() => this.updateScreen(0)}>
                        <h2>Bit Crusher</h2>
                    </div>
                </div>
                <div class="panner">
                <h2>Panner</h2>
                    <h3>Pan: <br/>{this.state.knobValuePanner}</h3>
                    <Knob
                        style={ {
                            width: "40px",
                            height: "40px",
                          } }
                        min={-1}
                        max={1}
                        value={this.state.knobValuePanner}
                        onChange={this.setPan}
                        unlockDistance={1}
                    />    
                </div>
            </div> */}

