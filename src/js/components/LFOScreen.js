import React, { Component } from 'react'
import { Knob } from 'react-rotary-knob'

class LFOScreen extends Component {
    render() {
        return(
            <div className="grid-item6" id="lfo">
                <h2>LFO</h2>
                <button onClick={this.props.TurnLFOOn}>Turn LFO On</button>
                <button onClick={this.props.TurnLFOOff}>Disconnect LFO </button>
                <br/>
                <span> {this.LFOConnected} </span>
                <div id="lfofrequency">
                    <h3> LFO Frequency: <br/>{this.props.knobLFOFreqValue}</h3>
                    <Knob
                        style={ {
                            width:"40px",
                            height: "40px",
                        }}
                        min={0}
                        max={65}
                        value={this.props.knobLFOFreqValue}
                        onChange={this.props.knobLFOFreqChange}
                        unlockDistance={1}
                    />
                </div>
                <div id="lfoamplitude">

                    <h3> LFO Amplitude: <br/>{this.props.knobLFOAmpValue}</h3>
                    <Knob
                        style={ {
                            width:"40px",
                            height: "40px",
                        }}
                        min={0}
                        max={1}
                        value={this.props.knobLFOAmpValue}
                        onChange={this.props.knobLFOAmpChange}
                        unlockDistance={1}
                    />
                </div>
                <span id="lfofoot">
                **LFO only connects to the Filter Frequency.</span>
            </div> 
        )
    }
}

export default LFOScreen