import React, { Component } from 'react'
import { Knob } from 'react-rotary-knob'

class LFOScreen extends Component {
    state = {
        onoffoval: "offoval",
        onoffcircle: "offcircle",

    }

    changeOnOff = () => {
        if (this.state.onoffoval === "offoval") {
            this.setState({onoffoval: "onoval"})
        }
        else if (this.state.onoffoval === "onoval")
        {
            this.setState({onoffoval:"offoval"})
        }
        if (this.state.onoffcircle === "offcircle") {
            this.setState({onoffcircle: "oncircle"})
        }
        else if (this.state.onoffcircle === "oncircle")
        {
            this.setState({onoffcircle:"offcircle"})
        }
    }




    render() {

        
        return(
            
                <div class="settingsarea">
                    <div class="item">
                        <div class="settingstext">
                            FREQUENCY
                            </div>
                        <div class="knobvalue">
                            <div class="value">
                                {this.props.knobLFOFreqValue}
                            </div>
                            <Knob
                                style={ {
                                    width: "35px",
                                    height: "35px",
                                } }
                                min={0}
                                max={65}
                                value={this.props.knobLFOFreqValue}
                                onChange={this.props.knobLFOFreqChange}
                                unlockDistance={1}
                            />
                        </div>
                    </div>
                    <div class="line settingss"></div>
                    <div class="item">
                        <div class="settingstext">
                            AMPLITUDE</div>
                        <div class="knobvalue">
                            <div class="value">
                                {this.props.knobLFOAmpValue}
                            </div>
                            <Knob
                                style={ {
                                    width: "35px",
                                    height: "35px",
                                } }
                                min={0}
                                max={1}
                                value={this.props.knobLFOAmpValue}
                                onChange={this.props.knobLFOAmpChange}
                                unlockDistance={1}
                            />
                        </div>
                    </div>
                    <div class="line settingss"></div>
                    <div class="item">
                    <div class="settingstext">
                        LFO POWER
                    </div>
                    <div class="onoff lfoon">
                        <div onClick={this.props.changeOnOff} class={this.props.lfoonoffoval}></div>
                        <div onClick={this.props.changeOnOff} class={this.props.lfoonoffcircle}></div>
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
          
            // <div className="grid-item6" id="lfo">
            //     <h2>LFO</h2>
            //     <button onClick={this.props.TurnLFOOn}>Turn LFO On</button>
            //     <button onClick={this.props.TurnLFOOff}>Disconnect LFO </button>
            //     <br/>
            //     <span> {this.LFOConnected} </span>
            //     <div id="lfofrequency">
            //         <h3> LFO Frequency: <br/>{this.props.knobLFOFreqValue}</h3>
            //         <Knob
            //             style={ {
            //                 width:"40px",
            //                 height: "40px",
            //             }}
            //             min={0}
            //             max={65}
            //             value={this.props.knobLFOFreqValue}
            //             onChange={this.props.knobLFOFreqChange}
            //             unlockDistance={1}
            //         />
            //     </div>
            //     <div id="lfoamplitude">

            //         <h3> LFO Amplitude: <br/>{this.props.knobLFOAmpValue}</h3>
            //         <Knob
            //             style={ {
            //                 width:"40px",
            //                 height: "40px",
            //             }}
            //             min={0}
            //             max={1}
            //             value={this.props.knobLFOAmpValue}
            //             onChange={this.props.knobLFOAmpChange}
            //             unlockDistance={1}
            //         />
            //     </div>
            //     <span id="lfofoot">
            //     **LFO only connects to the Filter Frequency.</span>
            // </div> 
        )
    }
}

export default LFOScreen