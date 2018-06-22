import React, { Component } from 'react'
import { Knob } from 'react-rotary-knob'
import App from './App';


class Screen extends Component {
    render() {
        console.log(this.props)
        return (
            <div  id="oscillator" >
                <h2>Bit Crusher</h2>
                    <h3> Bit Depth: <br/>{this.props.knobDepthValue}</h3>
                        <Knob
                            style={ {
                                width:"40px",
                                height: "40px",
                            }}
                            min={1}
                            max={8}
                            value={this.props.knobDepthValue}
                            onChange={this.props.knobDepthChange}
                            unlockDistance={1}
                        />
                    <h3> Dry/Wet: <br/>{this.props.knobWetValue}</h3>
                        <Knob
                            style={ {
                                width:"40px",
                                height: "40px",
                            }}
                            min={0}
                            max={1}
                            value={this.props.knobWetValue}
                            onChange={this.props.knobWetChange}
                            unlockDistance={1}
                        />
            </div>
        )
    
    }
}

export default Screen

