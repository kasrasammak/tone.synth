import React, { Component } from 'react'

import { Knob } from 'react-rotary-knob';
import { Transport } from 'tone'
import { Tone } from 'tone';
import { Master } from 'tone';



import ScreenManager from 'components/ScreenManager';
import Screen from 'components/Screen';
import LFOScreen from 'components/LFOScreen';
import PingPongScreen from './PingPongScreen';

import { noteMap } from 'config';
import MyComponent from './MyComponent';
import Key from './Key'
import FilterType from './FilterType'

const Comp = (props) => {
    return(
        <div className="knobtriangle">
        </div>
    )
}

class App extends Component {
   constructor(props) {
       super(props);
       this.pressedKeys = [];
   }

    state = {
        knobValueOsc : 0,
        knobValueOscPhase : 0,
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
        knobValueBitCrushDepth : 4,
        knobValueBitCrushWet : .5,
        LFOConnected: "Disconnected",
        knobFilterFreqMin : 20,
        knobFilterFreqMax : 20000,
        knobValuePingPongWet : .5,
        currentScreen : 0,
        knobValuePanner :  0,

        colora : {background : "lightgrey"},
        colorw : {background : "lightgrey"},
        colors : {background : "lightgrey"},
        colore : {background : "lightgrey"},
        colord : {background : "lightgrey"},
        colorf : {background : "lightgrey"},
        colort : {background : "lightgrey"},
        colorg : {background : "lightgrey"},
        colory : {background : "lightgrey"},
        colorh : {background : "lightgrey"},
        coloru : {background : "lightgrey"},
        colorj : {background : "lightgrey"},
        colork : {background : "lightgrey"},
        coloro : {background : "lightgrey"},
        colorl : {background : "lightgrey"},
        colorz : {background : "lightgrey"},
        colorx : {background : "lightgrey"},
        colornote : {background : "lightgrey"},
        coloroct : {background : "lightgrey"},
        openfiltertype : {height: "24px" },
        filteropen : false,
        
   
        keyCode : 65,
        note : "C"
    }
    openFilterType = () => {
        console.log(this.state.openfiltertype)
        if (this.state.openfiltertype.height ===  "24px")
            {
                this.setState({openfiltertype: {height: "115px"}})
                this.setState({filteropen: true})
            }
        else {
            this.setState({openfiltertype: {height: "24px"}})
            this.setState({filteropen: false})
        }
    }
    setColor = (color) => {
        this.setState({color})
    }
    updateLetter = (letter) => {
        this.setState({letter})
    }
    updateScreen = (currentScreen) => {
        this.setState({currentScreen})
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
    setFiltFreq = (value) => {
        const {filt} = this.props;
        const min = 20;
        const max = 20000;
        const position = value;
        const minp = this.state.knobFilterFreqMin;
        const maxp = this.state.knobFilterFreqMax;
        const minv = Math.log(min)/Math.log(2);
        const maxv = Math.log(max)/Math.log(2);
        const scale = (maxv-minv) / (maxp-minp);
        const value2 = Math.pow(2, minv + scale*(position-minp));
        filt.frequency.value = value2;
        this.setState( { knobValueFiltFreq: Math.floor(value2) } );
        console.log(filt);
    }
    // setFiltGain = (val) => {

    //     console.log(val);
    //     this.setState( { knobValueFiltGain: Math.floor(val) } );
    //     const {filt} = this.props;
    //     filt.gain.value = val;
    //     console.log(filt.gain.value);

    // }
    setPingPongTime = (value) => {

        console.log(value);
        this.setState( { knobValuePingPongTime: value.toFixed(2)  } );
        const {pingpong} = this.props;
        pingpong.delayTime.value = value;


    }
    setPingPongFeedback = (value) => {

        console.log(value);
        this.setState( { knobValuePingPongFeedback: value.toFixed(2) } );
        const {pingpong} = this.props;
        pingpong.feedback.value = value;


    }
    setPingPongWet = (val) => {
        this.setState ( {knobValuePingPongWet: val.toFixed(2)})
        const {pingpong} = this.props;
        pingpong.wet.value = val;
    }
    setLFOFreq = (value) => {
        this.setState( { knobValueLFOFreq : Math.floor(value) } );
        const {lfo} = this.props;

        lfo.frequency.value = value;

    }
    setLFOAmp = (value) => {
        this.setState( { knobValueLFOAmp: value.toFixed(2) } );
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
    setBitCrushDepth = (val) => {
        const {bitcrush} = this.props;
        this.setState( { knobValueBitCrushDepth : Math.floor(val) } );
        bitcrush.bits =  Math.floor(val);
    }
    setBitCrushWet = (val) => {
        const {bitcrush} = this.props;
        this.setState( { knobValueBitCrushWet : val.toFixed(2) } );
        bitcrush.wet.value =  val;
    }
    setPan = (val) => {
        const {pan} = this.props;
        this.setState( {knobValuePanner : val.toFixed(2)} );
        pan.pan.value = val;
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

    setFilterType(event) {
        const {filt} = this.props;
        filt.type = event;
        console.log(filt)
    }

    handleKeyDown = (event) => {

        const { poly, osc } = this.props;
        console.log(poly);
        const keyCode = event.keyCode;
        const note = noteMap[keyCode];
        let oct = this.state.oct;
        let colora = this.state.colora;
        let colorw = this.state.colorw;
        let colors = this.state.colors;
        let colore = this.state.colore;
        let colord = this.state.colord;
        let colorf = this.state.colorf;
        let colort = this.state.colort;
        let colorg = this.state.colorg;
        let colory = this.state.colory;
        let colorh = this.state.colorh;
        let coloru = this.state.coloru;
        let colorj = this.state.colorj;
        let colork = this.state.colork;
        let coloro = this.state.coloro;
        let colorl = this.state.colorl;
        let colorz = this.state.colorz;
        let colorx = this.state.colorx;
        let colornote = this.state.colornote;
        let coloroct = this.state.coloroct;

        if (note != undefined && !this.pressedKeys.includes(keyCode)) {
            this.pressedKeys.push(keyCode);
            if (keyCode === 75 || keyCode === 79 || keyCode === 76) {
                this.setState({note})
                poly.triggerAttack(`${note}${oct + 1}`);
                osc.frequency.value = `${note}${oct + 1}`;
                osc.start()
            }
            else{
                this.setState({note})
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
        if (keyCode===65){
            colora={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colora, colornote})
            console.log(this.state.colora)
            
        }
        if (keyCode===87){
            colorw= {background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorw, colornote})
        }
        if (keyCode===83){
            colors={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colors, colornote})
        }
        if (keyCode===69){
            colore={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colore, colornote})
        }
        if (keyCode===68){
            colord={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colord, colornote})
        }
        if (keyCode===70){
            colorf={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorf, colornote})
        }
        if (keyCode===84){
            colort={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colort, colornote})
        }
        if (keyCode===71){
            colorg={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorg, colornote})
        }
        if (keyCode===89){
            colory={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colory, colornote})
        }
        if (keyCode===72){
            colorh={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorh, colornote})
        }
        if (keyCode===85){
            coloru={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({coloru, colornote})
        }
        if (keyCode===74){
            colorj={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorj, colornote})
        }
        if (keyCode===75){
            colork={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colork, colornote})
        }
        if (keyCode===79){
            coloro={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({coloro, colornote})
        }
        if (keyCode===76){
            colorl={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorl, colornote})
        }
        if (keyCode===90){
            colorz={background: "#31D017"}
            coloroct={background: "#31D017"}
            this.setState({colorz, coloroct})
        }
        if (keyCode===88){
            colorx={background: "#31D017"}
            coloroct={background: "#31D017"}
            this.setState({colorx, coloroct})
        }
        // this.setState({keyCode});
        // this.setState({color});
        this.setState({oct, keyCode, colora});
        console.log(this.state.colora)
    }


    handleKeyUp = (event) => {
        const { poly, osc } = this.props;
        const keyCode = event.keyCode;
        const note = noteMap[keyCode];
        let oct = this.state.oct;
        let colora = this.state.colora;
        let colorw = this.state.colorw;
        let colors = this.state.colors;
        let colore = this.state.colore;
        let colord = this.state.colord;
        let colorf = this.state.colorf;
        let colort = this.state.colort;
        let colorg = this.state.colorg;
        let colory = this.state.colory;
        let colorh = this.state.colorh;
        let coloru = this.state.coloru;
        let colorj = this.state.colorj;
        let colork = this.state.colork;
        let coloro = this.state.coloro;
        let colorl = this.state.colorl;
        let colorz = this.state.colorz;
        let colorx = this.state.colorx;
        let colornote = this.state.colornote;
        let coloroct = this.state.coloroct;
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
                    osc.frequency.value = `${note}${oct}`;
                    osc.stop()
                }
            }
        }
        if (keyCode===65){
            colora={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colora, colornote})
        }
        if (keyCode===87){
            colorw={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorw, colornote})
        }
        if (keyCode===83){
            colors={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colors, colornote})
        }
        if (keyCode===69){
            colore={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colore, colornote})
        }
        if (keyCode===68){
            colord={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colord, colornote})
        }
        if (keyCode===70){
            colorf={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorf, colornote})
        }
        if (keyCode===84){
            colort={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colort, colornote})
        }
        if (keyCode===71){
            colorg={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorg, colornote})
        }
        if (keyCode===89){
            colory={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colory, colornote})
        }
        if (keyCode===72){
            colorh={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorh, colornote})
        }
        if (keyCode===85){
            coloru={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({coloru, colornote})
        }
        if (keyCode===74){
            colorj={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorj, colornote})
        }
        if (keyCode===75){
            colork={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colork, colornote})
        }
        if (keyCode===79){
            coloro={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({coloro, colornote})
        }
        if (keyCode===76){
            colorl={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorl, colornote})
        }
        if (keyCode===90){
            colorz={background: "lightgrey"}
            coloroct={background: "lightgrey"}
            this.setState({colorz, coloroct})
        }
        if (keyCode===88){
            colorx={background: "lightgrey"}
            coloroct={background: "lightgrey"}

            this.setState({colorx, coloroct})
        }
        
        this.setState({colora})
        this.setState({oct})
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
        const {osc, filt} = this.props;
        
        
        osc.toMaster();
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
    }



    render () {
        console.log("RENDER APP");
        // const {filt} = this.props;
        // console.log(filt.type)
        
        // console.log(this.props);
        // console.log(this.props.osc);
        // console.log(this.state);
        // console.log(this.state.color);

        const nodes = Object.keys(this.props);

        var divStyle = {
            display:this.state.filteropen?'block':'none'
          };

        return (
        <div class="appbackground">
            <div class="app">
                <div class="upperchain">
                    <div class="component keyboard">
                        <div class="section keys">  
                            <div class="key tab space">

                            </div>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorw}
                            >
                                W
                            </Key>
                            
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colore}
                            >
                                E
                            </Key>
                            <div class="key letter space">

                            </div>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colort}
                            >
                                T
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colory}
                            >
                                Y
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.coloru}
                            >
                                U
                            </Key>
                            <div class="key letter space">

                            </div>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.coloro}
                            >
                                O
                            </Key>


                            <div class="key caps space">

                            </div>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colora}
                            >
                                A
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colors}
                            >
                                S
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colord}
                            >
                                D
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorf}
                            >
                                F
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorg}
                            >
                                G
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorh}
                            >
                                H
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorj}
                            >
                                J
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colork}
                            >
                                K
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorl}
                            >
                                L
                            </Key>

                            <div class="key shift space">
                                <div class="arrow down">
                                v
                                </div>
                            </div>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorz}
                            >
                                Z
                            </Key>  
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorx}
                            >
                                X
                            </Key>
                            <div class="key space arrow up">
                                ^

                            </div>
                        </div>
                        
                        <div class="section notemap">
                            <div class="note">NOTE
                                <Key
                                    myClass="notekey"
                                    myStyle={this.state.colornote}
                                >
                                    {this.state.note}
                                </Key>
                            </div>
                            <div class="oct">OCTAVE 
                                <Key
                                    myClass="noteoct"
                                    myStyle={this.state.coloroct}
                                >
                                    {this.state.oct}
                                </Key>
                                
                            </div>
                        </div>
                    </div>

                <div class="component filter">
                    <div class="filterleft">
                        FILTER   
                        
                            <FilterType 
                                myFilt={this.props.filt} 
                                myClass="filtertype"
                                myStyles={this.state.openfiltertype}
                                onClick={this.openFilterType}
                                myFilterStyles={divStyle}
                                />
                        

                    </div>

                  <div class="filterright">
                    <div class="filterknobtext">
                      <div class="filtercutoff">
                        <div class="filtertextscutoff">
                          Cutoff 
                        </div>
                        <div class="knob big">
                          <div class="knobtriangle"></div>
                        </div>
                        
                      </div>
                      <div class="filterres">
                        <div class="filtertextsres">
                          Resonance
                        </div>
                        <div class="knob big">
                          <div class="knobtriangle"></div>
                        </div>
                      </div>
                    </div> 


                    <div class="filteron">
                      <div class="onoff clean">
                        <div class="onoval"></div>
                        <div class="oncircle"></div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              
                <div class="component master">
                  <div class="uppermaster">
                    <div class="mastertext">MASTER</div>
                      
                     <div class="volfeedbar">
                      <div class="volfeed1"></div>
                      <div class="volfeed2"></div>
                     </div>                     
                     <div class="volfeedbar">
                      <div class="volfeed1"></div>
                      <div class="volfeed2"></div>
                     </div>
                     <div class="lowervolfeed"></div>  
                  </div>
                  <div class="lowermaster">
                    <div class="masterknobs">
                      <div class="masterknobpan">
                        <div class="masterpan">Pan</div>
                        <div class="knob big">
                          <div class="knobtriangle"></div>
                        </div>
                      </div>
                      <div class="masterknobvol">
                        <div class="mastervol">Vol</div>     
                        <div class="knob big">
                          <div class="knobtriangle"></div>
                        </div>
                      </div>  
                    </div>
                  </div>
                </div>
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

