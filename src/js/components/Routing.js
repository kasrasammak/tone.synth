import React, { Component } from 'react'
import  Node  from './Node'
import RowofNodes from './RowofNodes'

import {Filter} from 'tone'
import {Oscillator} from 'tone'
import { PingPongDelay } from 'tone'
import {BitCrusher} from 'tone'
import {LFO} from 'tone'
import {Panner} from  'tone'
import {Volume} from 'tone'
import {Master} from 'tone'

class Routing extends Component {

    state = {
        selectedNodes: [],
        connector: this.props.osc,
        connected: null,

        isWire1: false,
        isWire2: false,
        isWire3: false,
        isWire4: false,

        node: "node green",
        isOscMaster: true,
        OsctoFilt: false,
        OsctoBitCrush: false,
        OsctoDelay: false,
        OsctoRev: false,
        FilttoBitCrush: false,
        FilttoDelay: false,
        FilttoRev: false,
        BitCrushtoFilt: false,
        BitCrushtoDelay: false,
        BitCrushtoRev: false,
        DelaytoBitCrush: false,
        DelaytoFilt: false,
        DelaytoRev: false,
        RevtoFilt: false,
        RevtoBitCrush: false,
        RevtoDelay: false,

        inputWire: null,
        outputWire: null,

        isNodeOutputNull: true,

    }
    addRow = () => {
     
        // this.state.selectedNodes.unshift(this.state.selectedNodes[0]-1);
        // this.setState({selectedNodes: this.state.selectedNodes})
        this.setState({selectedNodes: this.state.selectedNodes.concat(this.state.selectedNodes[this.state.selectedNodes.length - 1] + 1)})
        
    }
    removeRow = () => {
        if (this.state.selectedNodes.length > 1) {
            // this.state.selectedNodes.shift();
            // this.setState({selectedNodes: this.state.selectedNodes})
            this.state.selectedNodes.pop();
            this.setState({selectedNodes: this.state.selectedNodes})
        }
    }
    addRowfromIndex = (n) => {
        var index = this.state.selectedNodes.indexOf(n);
        var indexNumber = this.state.selectedNodes[index] - 1;
        this.state.selectedNodes.splice(index, 0, indexNumber);
        this.setState({selectedNodes: this.state.selectedNodes});

    }
    removeRowfromIndex = (n) => {
        if (this.state.selectedNodes.length != 1) {
            var index = this.state.selectedNodes.indexOf(n);
            this.state.selectedNodes.splice(index, 1);
            this.setState({selectedNodes: this.state.selectedNodes})
        }   
    }
    addRowAtEnd = () => {
        this.setState({selectedNodes: this.state.selectedNodes.concat(this.state.selectedNodes[this.state.selectedNodes.length - 1] + 1)})
    }
    removeRowAtEnd = () => {
        if (this.state.selectedNodes.length != 1) {
            this.state.selectedNodes.pop();
            this.setState({selectedNodes: this.state.selectedNodes})
        }
        
    }
    componentDidMount() {
        var newArray = this.state.selectedNodes.concat(1);
        this.setState({selectedNodes: newArray})
    }
    clickConnector() {

    }
    onDragStart = () => {
        console.log("dragstart: ", this.state.connector);
        this.setState({isNodeOutputNull: false})
        this.setState({inputWire: -1});
        this.setState({connector: this.props.osc})
    }
    connector = (e) => {
        this.setState({connector: e})
        console.log("fdfd", e);

    }
    connected = (e, number, node) => {
        this.setState({connected: e})
        console.log("this is", this.state.connector);
        console.log("we are", e, "and", number);

    if (!node && !this.state.isNodeOutputNull)
        {        
            if (this.state.connector === this.props.osc) {
                if (e === this.props.pingpong) {
                    
                    if (!this.state.OsctoDelay){
                        this.setState({OsctoDelay: true})
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({OsctoDelay: false})
                        this.state.connector.disconnect(e);
                    }
                    
                }
                else if (e === this.props.bitcrush) {
                    if (!this.state.OsctoBitCrush){
                    this.setState({OsctoBitCrush: true}) 
                    this.state.connector.connect(e);
                    }
                    else {
                        this.setState({OsctoBitCrush: false}) 
                    this.state.connector.disconnect(e);
                    }
                    
                }
                else if (e === this.props.filt) {
                    if (!this.state.OsctoFilt) {
                        this.setState({OsctoFilt: true})
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({OsctoFilt: false})
                        this.state.connector.disconnect(e);
                    }
                    
                }
                else if (e === this.props.rev) {
                    if (!this.state.OsctoRev) {
                        this.setState({OsctoRev: true})
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({OsctoRev: false})
                        this.state.connector.disconnect(e);
                    }
                    
                }
            }
            else if (this.state.connector === this.props.pingpong) {
                if (e === this.props.bitcrush) {
                    if (!this.state.DelaytoBitCrush) {
                        this.setState({DelaytoBitCrush: true})
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({DelaytoBitCrush: false})
                        this.state.connector.disconnect(e);
                    }
                    
                }
                else if (e === this.props.filt) {
                    if (!this.state.DelaytoFilt) {
                        this.setState({DelaytoFilt: true})
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({DelaytoFilt: false})
                        this.state.connector.disconnect(e);
                    }
                }
                else if (e === this.props.rev) {
                    if (!this.state.DelaytoRev) {
                        this.setState({DelaytoRev: true})
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({DelaytoRev: false})
                        this.state.connector.disconnect(e);
                    }
                }
            }
            else if (this.state.connector === this.props.bitcrush) {
                if (e === this.props.pingpong) {
                    if (!this.state.BitCrushtoDelay){
                        this.setState({BitCrushtoDelay: true})
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({BitCrushtoDelay: false})
                        this.state.connector.disconnect(e);
                    }
                    
                }
                else if (e === this.props.filt) {
                    if (!this.state.BitCrushtoFilt) {
                        this.setState({BitCrushtoFilt: true})
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({BitCrushtoFilt: false})
                        this.state.connector.disconnect(e);
                    }
                    
                }
                else if (e === this.props.rev) {
                    if (!this.state.BitCrushtoRev) {
                        this.setState({BitCrushtoRev: true})
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({BitCrushtoRev: false})
                        this.state.connector.disconnect(e);
                    }
                    
                }
            }
            else if (this.state.connector === this.props.filt) {
                if (e === this.props.bitcrush) {
                    if (!this.state.FilttoBitCrush) {
                        this.setState({FilttoBitCrush: true})
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({FilttoBitCrush: false})
                        this.state.connector.disconnect(e);
                    }
                }
                else if (e === this.props.pingpong) {
                    if (!this.state.FilttoDelay) {
                        this.setState({FilttoDelay: true}) 
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({FilttoDelay: false})
                        this.state.connector.disconnect(e);
                    }
                    
                }
                else if (e === this.props.rev) {
                    if (!this.state.FilttoRev) {
                        this.setState({FilttoRev: true}) 
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({FilttoRev: false})
                        this.state.connector.disconnect(e);
                    }
                    
                }
            }
            else if (this.state.connector === this.props.rev) {
                if (e === this.props.bitcrush) {
                    if (!this.state.RevtoBitCrush) {
                        this.setState({RevtoBitCrush: true})
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({RevtoBitCrush: false})
                        this.state.connector.disconnect(e);
                    }
                }
                else if (e === this.props.pingpong) {
                    if (!this.state.RevtoDelay) {
                        this.setState({RevtoDelay: true}) 
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({RevtoDelay: false})
                        this.state.connector.disconnect(e);
                    }
                    
                }
                else if (e === this.props.filt) {
                    if (!this.state.RevtoFilt) {
                        this.setState({RevtoFilt: true}) 
                        this.state.connector.connect(e);
                    }
                    else {
                        this.setState({RevtoFilt: false})
                        this.state.connector.disconnect(e);
                    }
                    
                }
            }
        }
        
    }
    isOscMaster = () => {
        const {osc, pan} = this.props;
        if (this.state.node === "node") {
            this.setState({node: "node green"})
            // this.setState({isOscMaster: true})
            osc.connect(pan)
        }
        else if (this.state.node === "node green") {
            this.setState({node: "node"})
            // this.setState({isOscMaster: false})
            osc.disconnect(pan)
        }
    }
    setWire1 = (number) => {
        this.setState({inputWire: number})

    }
    setWire2 = (number) => {
        this.setState({outputWire: number})
    }
    setOutputNode = (node) => {
        this.setState({isNodeOutputNull: node})
    }
    readIt = () => {
        console.log("OsctoBitCrush: ", this.state.OsctoBitCrush)
        console.log("OsctoDelay: ", this.state.OsctoDelay)
        console.log("OsctoFilt: ", this.state.OsctoFilt)
        console.log("DelaytoBitCrush: ", this.state.DelaytoBitCrush)
        console.log("DelaytoFilt: ", this.state.DelaytoFilt)
        console.log("FilttoDelay: ", this.state.FilttoDelay)
        console.log("FilttoBitCrush: ", this.state.FilttoBitCrush)
        console.log("BitCrushtoDelay: ", this.state.BitCrushtoDelay)
        console.log("BitCrushtoFilt: ", this.state.BitCrushtoFilt)
    }

    render() {
        console.log(this.state.inputWire, "to", this.state.outputWire)

        var divStyleWire1 = {
            display: this.state.isWire1? "block": "none"
        }
        var divStyleWire2 = {
            display: this.state.isWire2? "block": "none"
        }
        var divStyleWire3 = {
            display: this.state.isWire3? "block": "none"
        }
        return (
           
            <div class="routingarea">
                {/* <div onClick={this.readIt} class= "newnode"><div class="p">Read</div></div> */}
                
                
                
                <div class="grid">
            
                    <div class="rownodes">
                        
                        <div class="row">
                            <div class="pluscircles">
                                <div onClick={this.addRow} class="pluscircleleft">
                                    <div class="p12">+</div>
                                </div>
                                <div onClick={this.removeRow} class="pluscircleright">
                                    <div class="p12">-</div>
                                </div>
                            </div>
                            <div class="nodeconnector"> 
                                <div onClick={this.isOscMaster} class={this.state.node}><div class="p">OSC</div></div>
                                <div 
                                    key={0}
                                    
                                    onDragStart={(e) => {this.onDragStart(e)}}
                                    draggable
                                    className="draggable"
                                    class="connector">
                                </div>
                            </div>

                        </div>

                        {/* <div class="row2">
                            <div style={divStyleWire1} class="wire1"></div>
                            <div style={divStyleWire2} class="wire2"></div>
                            <div style={divStyleWire2} class="wire2bottom"></div>
                            <div style={divStyleWire3} class="wire3"></div>
                            <div style={divStyleWire3} class="wire3bottom"></div>
                        </div> */}
                    </div>


                    {this.state.selectedNodes.map((number) => 
                    <RowofNodes 
                        number={number}
                        key={number}
                        addRow={(n) => this.addRowfromIndex(n)}
                        removeRow={(n) => this.removeRowfromIndex(n)}
                        osc={this.props.osc}
                        pan={this.props.pan}
                        filt={ this.props.filt }
                        pingpong={ this.props.pingpong }
                        bitcrush= { this.props.bitcrush }
                        rev = { this.props.rev }
                        clickConnector={this.clickConnector}
                        connector={(e) => this.connector(e)}
                        connected={(e, num, node) => this.connected(e, num, node)}
                        setWire1={(e) => this.setWire1(e)}
                        setWire2={(e) => this.setWire2(e)}
                        inputWire={this.state.inputWire}
                        outputWire={this.state.outputWire}
                        setOutputNode={(node) => this.setOutputNode(node)}
                        isNodeOutputNull={this.state.isNodeOutputNull}
                        />
                        
                    )}

                    <div class="row2"> </div>
                  
                    <div class="row">
                        <div class="pluscircles blank">
                            <div  class="pluscircleleft blank">
                                <div class="p12"></div>
                            </div>
                            <div class="pluscircleright blank">
                                <div class="p12"></div>
                            </div>
                        </div>
                        <div class="nodeconnector"> 

                            <div onClick={this.addRowAtEnd} class="node add split">
                                <div class="p1">+</div>
                            </div>
                            <div onClick={this.removeRowAtEnd} class="node add split">
                                <div class="p1">-</div>
                            </div>
                        
                        </div>

                        
                        
                    </div>
                
                </div>  
                
            </div>
               
        )
    }
}

export default Routing;