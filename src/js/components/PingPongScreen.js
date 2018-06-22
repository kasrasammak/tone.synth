import React, { Component } from 'react'
import { Knob } from 'react-rotary-knob'

class PingPongScreen extends Component {
    render() {
        return (
            <div id= "pingpong">
                <h2> Ping Pong Delay</h2>
                <div className="ppgrid">
                    <div className="pp1" id = "ppdelaytime">
                        <h3> Delay Time: <br/>{this.props.knobTimeValue}</h3>
                        <Knob
                            style={ {
                                width:"40px",
                                height: "40px",
                            }}
                            min={0}
                            max={1}
                            value={this.props.knobTimeValue}
                            onChange={this.props.knobTimeChange}
                            unlockDistance={1}
                        />
                    </div>
                    <div className="pp2"id="ppfeedback">
                        <h3> Feedback: <br/> {this.props.knobFeedbackValue}</h3>
                        <Knob
                            style={ {
                                width:"40px",
                                height: "40px",
                            }}
                            min={0}
                            max={1}
                            value={this.props.knobFeedbackValue}
                            onChange={this.props.knobFeedbackChange}
                            unlockDistance={1}
                        />
                    </div>
                    <div className="pp3"id="ppwet">
                        <h3> Dry/Wet: <br/> {this.props.knobWetValue}</h3>
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
                </div>
            </div>
        )
    }
}
export default PingPongScreen