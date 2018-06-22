import React, { Component } from 'react'
import { Knob } from 'react-rotary-knob'
import App from './App';


class Screen extends Component {
    render() {
        console.log(this.props)
        return (
            <div id="oscillator" >
                <h2>Bit Crusher</h2>
                <Knob 
                    style={ {
                        width:"40px",
                        height: "40px",
                    }}
                    min={1}
                    max={8}
                    value={1}
                    onChange={this.props.updateScreen}
                    unlockDistance={1}
                />
            </div>
        )
    
    }
}

export default Screen

