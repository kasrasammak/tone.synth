import React, { Component } from 'react';
import Settings from './Settings'
import Routing from './Routing'
import { PingPongDelay } from 'tone'
import { BitCrusher } from 'tone'
import { Reverb } from 'tone'

let rev = new Reverb();
rev.generate();
let pingpong = new PingPongDelay();
let bitcrush = new BitCrusher();

class RoutingAndSettings extends Component {
    render() {
        return(
            <div className="window">
                <div class="routing">
                    <div class="routingtitle">
                        <div class="routingtext"> ROUTING</div>
                    </div>
                    <div class="line routingl"></div>
                    <Routing 
                        osc={this.props.osc}
                        pan={this.props.pan}
                        filt={ this.props.filt }
                        pingpong={ pingpong }
                        bitcrush= { bitcrush }
                        rev = { rev }
                        />
                </div>
                <div class="line separation"></div>
                <Settings 
                    osc={this.props.osc}
                    bitcrush={ bitcrush }
                    pingpong={ pingpong }
                    lfo={this.props.lfo}
                    filt={this.props.filt}
                    pan={this.props.pan}
                    rev = { rev }
                    />
            </div>
        )
    }
}
export default RoutingAndSettings