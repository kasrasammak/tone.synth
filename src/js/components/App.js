import React, { Component } from 'react'
import { Knob } from 'react-rotary-knob';
import { Master } from 'tone';
import Instructions from './Instructions'
import { noteMap } from 'config';
import OscSelect from './OscSelect'
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
        selectedNode.toMaster();
    }

    disconnectMaster = (event) => {
        const { selectedNode } = this.state;
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
        osc.connect(pan);
        pan.connect(vol);
    }
    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
    }
    render () {
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
                        setVolFeed={this.setVolFeed}
                        setVolFeedBack={this.setVolFeedBack}
                        />
                        <Instructions />
                        {/* 
                        //For Later Stages of the Application
                        {this.state.selectedNumbers.map((number) => 
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
                            </div> 
                            */}
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
