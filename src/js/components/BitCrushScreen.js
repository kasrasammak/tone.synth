import React, { Component } from 'react'
import { Knob } from 'react-rotary-knob'
import App from './App';


class BitCrushScreen extends Component {
    render() {
        console.log(this.props)
        return (
            <div class="settingsarea">
                <div class="item">
                    <div class="settingstext">
                        BIT DEPTH</div>
                    <div class="knobvalue">
                        <div class="value">
                            {this.props.knobDepthValue}
                        </div>
                        <Knob
                                style={ {
                                    width: "35px",
                                    height: "35px",
                                } }
                                min={1}
                                max={8}
                                value={this.props.knobDepthValue}
                                onChange={this.props.knobDepthChange}
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
                {/* <div class="item">
                    <div class="settingstext">
                        BIT CRUSH POWER
                    </div>
                    <div class="onoff lfoon">
                        <div onClick={this.props.changeOnOff} class={this.props.onOffOval}></div>
                        <div onClick={this.props.changeOnOff} class={this.props.onOffCircle}></div>
                    </div>
                </div> */}
            </div>

        )
    
    }
}

export default BitCrushScreen

