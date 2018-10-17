import React, { Component } from 'react'
import { Knob } from 'react-rotary-knob'

class ReverbScreen extends Component {
    render() {
        return (
            <div class="settingsarea">
                    {/* <div class="item">
                        <div class="settingstext">
                            DECAY TIME
                        </div>
                        <div class="knobvalue">
                            <div class="value">
                                {this.props.knobDecayValue}
                            </div>
                            <Knob
                                style={ {
                                    width: "35px",
                                    height: "35px",
                                } }
                                min={0}
                                max={60}
                                value={this.props.knobDecayValue}
                                onChange={this.props.knobDecayChange}
                                unlockDistance={1}
                            />
                        </div>
                    </div>
                    <div class="line settingss"></div>
                    <div class="item">
                        <div class="settingstext">
                            PREDELAY TIME</div>
                        <div class="knobvalue">
                            <div class="value">
                                {this.props.knobPredelayValue}
                            </div>
                            <Knob
                                style={ {
                                    width: "35px",
                                    height: "35px",
                                } }
                                min={0}
                                max={1}
                                value={this.props.knobPredelayValue}
                                onChange={this.props.knobPredelayChange}
                                unlockDistance={1}
                            />
                        </div>
                    </div>
                    <div class="line settingss"></div> */}
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
                </div>
        )
    }
}
export default ReverbScreen