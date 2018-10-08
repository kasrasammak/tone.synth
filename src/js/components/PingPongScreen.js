import React, { Component } from 'react'
import { Knob } from 'react-rotary-knob'

class PingPongScreen extends Component {
    render() {
        return (
            <div class="settingsarea">
                    <div class="item">
                        <div class="settingstext">
                            TIME
                        </div>
                        <div class="knobvalue">
                            <div class="value">
                                {this.props.knobTimeValue}
                            </div>
                            <Knob
                                style={ {
                                    width: "35px",
                                    height: "35px",
                                } }
                                min={0}
                                max={1}
                                value={this.props.knobTimeValue}
                                onChange={this.props.knobTimeChange}
                                unlockDistance={1}
                            />
                        </div>
                    </div>
                    <div class="line settingss"></div>
                    <div class="item">
                        <div class="settingstext">
                            FEEDBACK</div>
                        <div class="knobvalue">
                            <div class="value">
                                {this.props.knobFeedbackValue}
                            </div>
                            <Knob
                                style={ {
                                    width: "35px",
                                    height: "35px",
                                } }
                                min={0}
                                max={1}
                                value={this.props.knobFeedbackValue}
                                onChange={this.props.knobFeedbackChange}
                                unlockDistance={1}
                            />
                        </div>
                    </div>
                    <div class="line settingss"></div>
                    <div class="item">
                        <div class="settingstext">
                            DRY/WET</div>
                        <div class="knobvalue">
                            <div class="value">
                                {this.props.knobWetValue}
                            </div>
                            <Knob
                                style={ {
                                    width: "35px",
                                    height: "35px",
                                } }
                                min={0}
                                max={1}
                                value={this.props.knobWetValue}
                                onChange={this.props.knobWetChange}
                                unlockDistance={1}
                            />
                        </div>
                    </div>
                    <div class="line settingss"></div>
                    <div class="item">
                        <div class="settingstext">
                            DELAY POWER
                        </div>
                        <div class="onoff lfoon">
                            <div onClick={this.props.changeOnOff} class={this.props.onOffOval}></div>
                            <div onClick={this.props.changeOnOff} class={this.props.onOffCircle}></div>
                        </div>
                    </div>
                    <div class="line settingss"></div>
                    <div class="item"></div>
                    <div class="line settingss"></div>
                    <div class="item"></div>
                    <div class="line settingss"></div>
                    <div class="item"></div>
                    <div class="line settingss"></div>
                    <div class="item"></div>
                    <div class="line settingss"></div>
                    <div class="item"></div>
                </div>
            // <div id= "pingpong">
            //     <h2> Ping Pong Delay</h2>
            //     <div className="ppgrid">
            //         <div className="pp1" id = "ppdelaytime">
            //             <h3> Delay Time: <br/>{this.props.knobTimeValue}</h3>
            //             <Knob
            //                 style={ {
            //                     width:"40px",
            //                     height: "40px",
            //                 }}
            //                 min={0}
            //                 max={1}
            //                 value={this.props.knobTimeValue}
            //                 onChange={this.props.knobTimeChange}
            //                 unlockDistance={1}
            //             />
            //         </div>
            //         <div className="pp2"id="ppfeedback">
            //             <h3> Feedback: <br/> {this.props.knobFeedbackValue}</h3>
            //             <Knob
            //                 style={ {
            //                     width:"40px",
            //                     height: "40px",
            //                 }}
            //                 min={0}
            //                 max={1}
            //                 value={this.props.knobFeedbackValue}
            //                 onChange={this.props.knobFeedbackChange}
            //                 unlockDistance={1}
            //             />
            //         </div>
            //         <div className="pp3"id="ppwet">
            //             <h3> Dry/Wet: <br/> {this.props.knobWetValue}</h3>
            //             <Knob
            //                 style={ {
            //                     width:"40px",
            //                     height: "40px",
            //                 }}
            //                 min={0}
            //                 max={1}
            //                 value={this.props.knobWetValue}
            //                 onChange={this.props.knobWetChange}
            //                 unlockDistance={1}
            //             />
            //         </div>
            //     </div>
            // </div>
        )
    }
}
export default PingPongScreen