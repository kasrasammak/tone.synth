import React, { Component } from 'react'
import ScreenManager from './ScreenManager'
import BitCrushScreen from './BitCrushScreen'
import LFOScreen from './LFOScreen'
import PingPongScreen from './PingPongScreen'

class Settings extends Component {


    state = {
        delaysettings: "setting off delay",
        lfosettings: "setting on lfo",
        crushsettings: "setting off bitcrush",


        filtonoff: false,
        hoverlfo: false,
        
        hoverdelay: false,
        hoverbitcrush: false,

        isLFOOn : false,
        isDelayOn : false,
        isBitCrushOn : false,
        lfoonoffoval: "offoval",
        lfoonoffcircle: "offcircle",
        delayOnOffOval: "offoval",
        delayOnOffCircle: "offcircle",
        bitCrushOnOffOval: "offoval",
        bitCrushOnOffCircle: "offcircle",
        currentScreen: 1,
    }

    updateScreen = (currentScreen) => {
        this.setState({currentScreen})
    }


    changeSettingsDelay = (e) => {
        if (this.state.delaysettings == "setting off delay") {
            this.setState({delaysettings: "setting on delay"})
            this.setState({hoverdelay: false}) 
            this.setState({lfosettings: "setting off lfo"})
            this.setState({crushsettings: "setting off bitcrush"})
        }
        this.setState({currentScreen: 2})
    }
    changeSettingsLFO = (e) => {
        if (this.state.lfosettings == "setting off lfo") {
            this.setState({delaysettings: "setting off delay"}) 
            this.setState({lfosettings: "setting on lfo"})
            this.setState({hoverlfo: false})
            this.setState({crushsettings: "setting off bitcrush"})
        }
        this.setState({currentScreen: 1})
    }
    changeSettingsBitCrush= (e) => {
        if (this.state.crushsettings == "setting off bitcrush") {
            this.setState({delaysettings: "setting off delay"}) 
            this.setState({lfosettings: "setting off lfo"})
            this.setState({crushsettings: "setting on bitcrush"})
            this.setState({hoverbitcrush: false})
        }
        this.setState({currentScreen: 0})
    }

    hoverLFO = () => {
        if (this.state.lfosettings === "setting off lfo")
        {
           this.setState({hoverlfo: !this.state.hoverlfo}) 
        }
        else if (this.state.lfosettings === "setting on lfo") 
        {
            this.setState({hoverlfo: false})
        }
        
    }

    hoverDelay = () => {
        if (this.state.delaysettings === "setting off delay")
        {
           this.setState({hoverdelay: !this.state.hoverdelay}) 
        }
        else if (this.state.delaysettings === "setting on delay") 
        {
            this.setState({hoverdelay: false})
        }
        
    }

    hoverBitCrush = () => {
        if (this.state.crushsettings === "setting off bitcrush")
        {
           this.setState({hoverbitcrush: !this.state.hoverbitcrush}) 
        }
        else if (this.state.crushsettings === "setting on bitcrush") 
        {
            this.setState({hoverbitcrush: false})
        }
        
    }


    setPingPongTime = (value) => {

        console.log(value);
        this.setState( { knobValuePingPongTime: value.toFixed(2)  } );
        const {pingpong} = this.props;
        pingpong.delayTime.value = value;


    }
    setPingPongFeedback = (value) => {

        console.log(value);
        this.setState( { knobValuePingPongFeedback: value.toFixed(2) } );
        const {pingpong} = this.props;
        pingpong.feedback.value = value;


    }
    setPingPongWet = (val) => {
        this.setState ( {knobValuePingPongWet: val.toFixed(2)})
        const {pingpong} = this.props;
        pingpong.wet.value = val;
    }
    setLFOFreq = (value) => {
        this.setState( { knobValueLFOFreq : Math.floor(value) } );
        const {lfo} = this.props;

        lfo.frequency.value = value;
        console.log(lfo.frequency.value)

    }
    setLFOAmp = (value) => {
        this.setState( { knobValueLFOAmp: value.toFixed(2) } );
        const {lfo} = this.props;
        lfo.amplitude.value = value;
    }
    turnLFOon = (event) => {
        const {lfo, filt} = this.props;
        lfo.connect(filt.frequency);
        lfo.start();
        this.setState( { LFOConnected : "Connected" } );
    }
    disconnectLFO = (event) => {
        const {lfo} =this.props;
        lfo.disconnect();
        this.setState( { LFOConnected : "Disconnected" } );
    }

    changeLFOOnOff = () => {
        if (!this.state.isLFOOn) {
            this.setState({lfoonoffoval: "onoval"})
            this.setState({lfoonoffcircle: "oncircle"})
            console.log("isworking")
            const {lfo, filt} = this.props;
            lfo.connect(filt.frequency);
            lfo.start(); 
            this.setState( { isLFOOn : true } );
            console.log("allgood")
        }
        else {
            this.setState({lfoonoffoval: "offoval"})
            this.setState({lfoonoffcircle: "offcircle"})
            const {lfo} = this.props;
            lfo.disconnect();
            this.setState( { isLFOOn : false } );
        }
    }

    turnDelayOnOff = () => {
        if (!this.state.isDelayOn) {
            this.setState({delayOnOffOval: "onoval"})
            this.setState({delayOnOffCircle: "oncircle"})
            const {osc, pingpong, filt, pan} = this.props;
            pingpong.connect(pan);
            filt.connect(pingpong);
            this.setState( { isDelayOn : true } );
        }
        else {
            this.setState({delayOnOffOval: "offoval"})
            this.setState({delayOnOffCircle: "offcircle"})
            const { pingpong } = this.props;
            pingpong.disconnect();
            this.setState( { isDelayOn : false } );
        }
    }
    turnBitCrushOnOff = () => {
        if (!this.state.isBitCrushOn) {
            this.setState({bitCrushOnOffOval: "onoval"})
            this.setState({bitCrushOnOffCircle: "oncircle"})
            const {osc, bitcrush, filt, pan} = this.props;
            bitcrush.connect(pan);
            filt.connect(bitcrush);
            this.setState( { isBitCrushOn : true } );
        }
        else {
            this.setState({bitCrushOnOffOval: "offoval"})
            this.setState({bitCrushOnOffCircle: "offcircle"})
            const { bitcrush } = this.props;
            bitcrush.disconnect();
            this.setState( { isBitCrushOn : false } );
        }
    }

    setBitCrushDepth = (val) => {
        const {bitcrush} = this.props;
        this.setState( { knobValueBitCrushDepth : Math.floor(val) } );
        bitcrush.bits =  Math.floor(val);
    }
    setBitCrushWet = (val) => {
        const {bitcrush} = this.props;
        this.setState( { knobValueBitCrushWet : val.toFixed(2) } );
        bitcrush.wet.value =  val;
    }


    render(){
        
        var hoverlfostyle = {
            background: this.state.hoverlfo? 'lightgrey':null,
            // color: this.state.hoverlfo? 'white':null
        }
        var hoverdelaystyle = {
            background: this.state.hoverdelay? 'lightgrey':null,
            // color: this.state.hoverdelay? 'white':null
        }
        var hoverbitcrushstyle = {
            background: this.state.hoverbitcrush? 'lightgrey':null,
            // color: this.state.hoverbitcrush? 'white':null
        }

        return(
            <div class="settings">
                <div class="settingsoptions">
                    <div 
                        onClick={this.changeSettingsLFO} 
                        class={this.state.lfosettings}
                        onMouseEnter={this.hoverLFO} 
                        onMouseLeave={this.hoverLFO} 
                        style = {hoverlfostyle}
                    >
                        LFO
                    </div>
                    <div 
                        onClick={this.changeSettingsDelay} 
                        class={this.state.delaysettings}
                        onMouseEnter={this.hoverDelay}
                        onMouseLeave={this.hoverDelay}
                        style = {hoverdelaystyle}
                    >
                        DELAY
                    </div>
                    <div 
                        onClick={this.changeSettingsBitCrush} 
                        class={this.state.crushsettings}
                        onMouseEnter={this.hoverBitCrush}
                        onMouseLeave={this.hoverBitCrush}
                        style = {hoverbitcrushstyle}
                    >
                        BIT CRUSH
                    </div>
                </div>
                <div class="line settingsl"></div>
                <ScreenManager
                    currentScreen={this.state.currentScreen}
                    updateScreen={this.updateScreen}
                    screens={[
                        <BitCrushScreen 
                            knobDepthChange={this.setBitCrushDepth}
                            knobDepthValue={this.state.knobValueBitCrushDepth}
                            knobWetChange={this.setBitCrushWet}
                            knobWetValue={this.state.knobValueBitCrushWet}
                            changeOnOff={this.turnBitCrushOnOff}
                            onOffOval={this.state.bitCrushOnOffOval}
                            onOffCircle={this.state.bitCrushOnOffCircle}
                        />,
                        <LFOScreen 
                            
                            TurnLFOOn={this.turnLFOon} 
                            TurnLFOOff={this.disconnectLFO}
                            knobLFOFreqChange={this.setLFOFreq}
                            knobLFOFreqValue={this.state.knobValueLFOFreq}
                            knobLFOAmpChange={this.setLFOAmp}
                            knobLFOAmpValue={this.state.knobValueLFOAmp}
                            changeOnOff={this.changeLFOOnOff}
                            lfoonoffoval= {this.state.lfoonoffoval}
                            lfoonoffcircle= {this.state.lfoonoffcircle}
                        />,
                        <PingPongScreen
                            knobTimeChange={this.setPingPongTime}
                            knobTimeValue={this.state.knobValuePingPongTime}
                            knobFeedbackChange={this.setPingPongFeedback}
                            knobFeedbackValue={this.state.knobValuePingPongFeedback}
                            knobWetChange={this.setPingPongWet}
                            knobWetValue={this.state.knobValuePingPongWet}
                            changeOnOff={this.turnDelayOnOff}
                            onOffOval={this.state.delayOnOffOval}
                            onOffCircle={this.state.delayOnOffCircle}
                        />
                    ]}
                />
            </div>
        )
    }
}
             
export default Settings