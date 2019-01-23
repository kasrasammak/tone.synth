import React, { Component } from 'react' 
import OscOptions from './OscOptions'
import { Knob } from 'react-rotary-knob';


class Sine extends Component {
    render() {
        return (
        <div class="sine">
            <div class="sineleft"></div>
            <div class="sineright"></div>
        </div> 
        )
    }
}

class Square extends Component {
    render() {
        return (
        <div class="square">
            <div class="squareleft"></div>
            <div class="squareright"></div>
        </div>
        )
    }
}

class Saw extends Component {
    render() {
        return (
        <div class="sawtooth">
            <div class="sawleft"></div>
            <div class="sawcenter"></div>
            <div class="sawright"></div>
        </div>
        )
    }
}

class Triangle extends Component {
    render() {
        return (
        <div class="trianglewave">
            <div class="lineleft"></div>
            <div class="lineright"></div>
        </div>
        )
    }
}



class OscSelect extends Component {
    state = {
        show: false,
        show2: false,
        show3: true,
        show4: false,
        isToggle: false,
        isSrcToggle: false,
        isSrcToggle2: false,
        name: "OSC",
        osconoffoval: "onoval",
        osconoffcircle: "oncircle",
        knobValueOscVol: 0,
        toggleOscOn: true,
        toggleOscStartStop: false,
        oscstartstop: "oscstart",
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

    onSineChange = (e) => {
        this.setState({show: true})
        this.setState({show2: false})
        this.setState({show3: false})
        this.setState({show4: false})
        this.changeSine();
    }

    onSquareChange = (e) => {
        this.setState({show: false})
        this.setState({show2: true})
        this.setState({show3: false})
        this.setState({show4: false})
        this.changeSquare();
    }
    
    onSawChange = (e) => {
        this.setState({show: false})
        this.setState({show2: false})
        this.setState({show3: true})
        this.setState({show4: false})
        this.changeSaw();
    }
    onTriangleChange = (e) => {
        this.setState({show: false})
        this.setState({show2: false})
        this.setState({show3: false})
        this.setState({show4: true})
        this.changeTriangle();
    }
    changeOsc = (e) => {
        this.setState({name: "OSC"})
        const { osc, poly, pan } = this.props;
        poly.disconnect(pan);
        osc.connect(pan);
    }    
    changePoly = (e) => {
        this.setState({name: "POLY"})
        const { osc, poly, pan } = this.props;
        osc.disconnect(pan);
        poly.connect(pan);
    }
    setOscVol = (val) => {
        const osc = this.props.osc;
        osc.volume.value = val;
        this.setState({knobValueOscVol: Math.floor(val)})
    }
    hover = (e) =>{
        this.setState({isSrcToggle: !this.state.isSrcToggle})
    }
    hover2 = (e) =>{
        this.setState({isSrcToggle2: !this.state.isSrcToggle2})
    }
    turnOscOnOff = () => {
        
        if (this.state.osconoffoval === "onoval") 
        {
           this.setState({osconoffoval: "offoval"}) 
           
        }
        else
        {
            this.setState({osconoffoval: "onoval"})
        }
        if (this.state.osconoffcircle === "oncircle") 
        {
            this.setState({osconoffcircle: "offcircle"})
        }
        else
        {
            this.setState({osconoffcircle: "oncircle"})
        }

        this.setState({toggleOscOn: !this.state.toggleOscOn})
        
    }

    oscStartStop = () => {
        const { osc } = this.props;
        if (!this.state.toggleOscStartStop) {
            osc.start();
            this.setState({toggleOscStartStop: !this.state.toggleOscStartStop})
            this.setState({oscstartstop: "oscstart stop"})
            this.props.setVolFeed();
        }
        else if (this.state.toggleOscStartStop) {
            osc.stop();
            this.setState({toggleOscStartStop: !this.state.toggleOscStartStop})
            this.setState({oscstartstop: "oscstart"})
            this.props.setVolFeedBack();
        }
    }
    componentDidMount() {
        if (this.props.number > 1) {
            this.turnOscOnOff()
        }
        
    }
    
    render() {
        const { osc, poly } = this.props;
        if (!this.state.toggleOscOn) {
            if (this.state.name === "OSC") {
               osc.mute = true;
            }
        }
        else if (this.state.toggleOscOn)
        {
            osc.mute = false;
        }
        const myStyles = {
  
        }
        var divStyle = {
            display: this.state.isToggle? "block":"none"
        }

        return (
            <div>
                <div onClick= {this.props.changeSelect} class={this.props.myClass}>
                    <div class="number">
                        <div class="textnumber">
                        {this.props.number}
                        </div>
                        
                    </div>
                    
                    <div class="select">
                        <div onClick ={this.props.oscTypeClick} class={this.props.oscTypeClass}> 
                            <div class="openn1">
                                <div class="oscsrctxt">{this.state.name}</div>
                                <div class="triangleupsidedown"></div>
                            </div>
                            <div class="openn2">
                                    <div 
                                        onClick={this.changeOsc}
                                        onMouseEnter={this.hover}
                                        onMouseLeave={this.hover}
                                        style={this.props.divStyle} 
                                        class={this.state.isSrcToggle? "oscsrctxt two":"oscsrctxt2"}>
                                            OSC
                                    </div>
                                    <div 
                                        onClick={this.changePoly}
                                        onMouseEnter={this.hover2}
                                        onMouseLeave={this.hover2}
                                        style={this.props.divStyle} 
                                        class={this.state.isSrcToggle2? "polysrctxt":"polysrctxt2"}>
                                            POLY
                                        </div>
                            </div>
                        </div>  
                        <div onClick = {this.props.onWavClick} class={this.props.myWavClass} >
                        
                            <div class="topselectedwaveform">
                                {this.state.show && <Sine />}
                                {this.state.show2 && <Square />}
                                {this.state.show3 && <Saw />}
                                {this.state.show4 && <Triangle />}

                                <div class="triangleupsidedown">
                                </div>
                                
                            </div>
                            
                            <OscOptions 
                                myStyles = {this.props.myOscStyle}
                                onSine = {this.onSineChange}
                                onSquare = {this.onSquareChange}
                                onSaw = {this.onSawChange}
                                onTriangle = {this.onTriangleChange}
                            />
                        
                        
                        
                        
                        </div>
                        
                    </div>
                    <div class="oscknobs">
                        <div class="oscfreq">
                        <div class="oscfreqtext">Freq</div>
                        <Knob
                                style={ {
                                    width:"35px",
                                    height: "35px",
                                }}
                                min={20}
                                max={20000}
                                value={this.props.knobValueOsc}
                                onChange={this.props.setOscFreq}
                                unlockDistance={1}
                            />   
                        </div>
                        <div class="oscvol">
                        <div class="oscvoltext">Vol</div>
                        <Knob
                                style={ {
                                    width:"35px",
                                    height: "35px",
                                }}
                                min={-48}
                                max={0}
                                value={this.state.knobValueOscVol}
                                onChange={this.setOscVol}
                                unlockDistance={1}
                            />
                        </div>
                    </div>
                    <div class={this.state.oscstartstop} onClick={this.oscStartStop}><div className="p"></div></div>
                    <div class="oscon">
                        <div class="onoff">
                            <div onClick={this.turnOscOnOff} class={this.state.osconoffoval}></div>
                            <div onClick={this.turnOscOnOff} class={this.state.osconoffcircle}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OscSelect;