import React, { Component } from 'react';
import Settings from './Settings'
import Routing from './Routing'

import {Filter} from 'tone'
import {Oscillator} from 'tone'
import { PingPongDelay } from 'tone'
import {BitCrusher} from 'tone'
import {LFO} from 'tone'

let pingpong = new PingPongDelay();
// let filt = new Filter();
let bitcrush = new BitCrusher();

class RoutingAndSettings extends Component {
    componentDidMount() {
        const {osc, pan, filt} = this.props;
        // osc.connect(pingpong);
        // pingpong.connect(filt);
        // filt.connect(pan);
    }
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
                    />
            </div>
        )
    }
}

export default RoutingAndSettings