import React, { Component } from 'react'

import {Tone} from 'tone'

import {PolySynth} from 'tone'
import {Synth} from 'tone'

import {Envelope} from 'tone'
import {Transport} from 'tone'

import {Filter} from 'tone'
import {Oscillator} from 'tone'
import { PingPongDelay } from 'tone'
import {BitCrusher} from 'tone'
import {LFO} from 'tone'
import {Panner} from  'tone'
import {Volume} from 'tone'
import {Master} from 'tone'

import NodeOption from './NodeOption'
// const { osc, filt, pingpong, lfo, bitcrush } = this.props;

// let delay = new PingPongDelay();
// let filt = new Filter();
// let bitcrush = new BitCrusher();

var currentNode = null;

class Node extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        node: "node",
        toggle: false,
        isToggle1: false,
        isToggle2: false,
        isToggle3: false,
        isToggle4: false,
        isToggle5: false,
        isToggle6: false,
        name: null,
        isMaster: false,
        selectedNode: this.props.pingpong,

        isNodeNull: true,
        isNodeInputNull: true,
        isNodeOutputNull: true,

        effectOptions: ["FILT", "DELAY", "BITCRUSH"],
        toggleClass: false,
    }

    toggleOptions = () => {

        if (this.state.toggle === false)
        {
            if (this.props.name === "OSC") {
                if(this.state.node === "node"){
                    this.setState({node: "node green"})
                    this.setState({toggle: false})
                }
                else if (this.state.node === "node green")
                {
                    this.setState({node: "node"})
                    this.setState({toggle: false})
                }  
            }
            else {
            this.setState({node: "node big"})
            this.setState({toggle: true})
            }
           
        }
        else {
            
            this.setState({node: "node"})
            this.setState({toggle: false})
        }
    }

    toggleClass = () => {
       
    }


    hover = (e) => {
        console.log(e)
        if (e === "FILT") {
            this.hover1();
        }
        else if (e === "DELAY") {
            this.hover2();
        }
        else if (e === "BITCRUSH") {
            this.hover3();
        }
    }
    hover1 = () => {
        
        this.setState({isToggle1: !this.state.isToggle1})
        
    }
    hover2 = () => {
        this.setState({isToggle2: !this.state.isToggle2})
    }
    hover3 = () => {
        this.setState({isToggle3: !this.state.isToggle3})
    }
    hover4 = () => {
        this.setState({isToggle4: !this.state.isToggle4})
    }
    hover5 = () => {
        this.setState({isToggle5: !this.state.isToggle5})
    }
    hover6 = () => {
        this.setState({isToggle6: !this.state.isToggle6})
    }
    change = (item) => {
        if (item === "FILT") {
            this.changeEffect();
            var index = this.state.effectOptions.indexOf("FILT");
            this.state.effectOptions.splice(index, 1);
            this.setState({effectOptions: this.state.effectOptions})
        }
        else if (item === "DELAY") {
            this.changeEffect2();
            var index = this.state.effectOptions.indexOf("DELAY");
            this.state.effectOptions.splice(index, 1);
            this.setState({effectOptions: this.state.effectOptions})
        }
        else if (item === "BITCRUSH") {
            this.changeEffect3();
            var index = this.state.effectOptions.indexOf("BITCRUSH");
            this.state.effectOptions.splice(index, 1);
            this.setState({effectOptions: this.state.effectOptions})
        }
    }
    changeEffect = () => {
        // this.props.changeEffect();
        const { osc, pan, filt, pingpong, bitcrush } = this.props;
        this.setState({name: this.props.name})
        this.setState({isMaster: true})
        this.setState({selectedNode: filt})
        filt.connect(pan);

        this.setState({isNodeNull: false})
        this.setState({isNodeInputNull: false})
        this.setState({isNodeOutputNull: false})

    }
    changeEffect2 = () => {
        // this.props.changeEffect2();
        const { osc, pan, filt, pingpong, bitcrush } = this.props;
        this.setState({name: this.props.name2})
        this.setState({isMaster: true})
        this.setState({selectedNode: pingpong})
        console.log("its working");
        
        
        pingpong.connect(pan);
        
        this.setState({isNodeNull: false})
        this.setState({isNodeInputNull: false})
        this.setState({isNodeOutputNull: false})

 
    }
    changeEffect3 = () => {
        // this.props.changeEffect3();
        const { osc, pan, filt, pingpong, bitcrush } = this.props;
        this.setState({name: this.props.name3})
        this.setState({isMaster: true});
        this.setState({selectedNode: bitcrush});
        console.log(this.props.myKey);
        
        bitcrush.connect(pan);

        this.setState({isNodeNull: false})
        this.setState({isNodeInputNull: false})
        this.setState({isNodeOutputNull: false})
        
    }
    changeEffect6 = () => {
        // this.props.changeEffect3();
        const { osc, pan, filt, pingpong, bitcrush , rev } = this.props;
        this.setState({name: this.props.name6})
        this.setState({isMaster: true});
        this.setState({selectedNode: rev});
        console.log(this.props.myKey);
        rev.decay = .5;
        console.log(rev.decay);
        rev.generate(); 
           
        rev.connect(pan);

        this.setState({isNodeNull: false})
        this.setState({isNodeInputNull: false})
        this.setState({isNodeOutputNull: false})
        
    }
    changeEffect4 = () => {
        this.setState({name: null})
        this.setState({isMaster: false})
        this.setState({isNodeNull: true})
        const { osc } = this.props;
        osc.disconnect(this.state.selectedNode)
    }
    changeEffect5 = () => {
         {
            console.log(this.state.selectedNode)
            const { pan } = this.props;
            if (this.state.name === null) {
                this.setState({isMaster: false})
            }
            else {
                this.setState({isMaster: !this.state.isMaster})
            
                if (!this.state.isMaster) {
                    
                    
                    this.state.selectedNode.connect(pan);
                }
                else if (this.state.isMaster){
                    this.state.selectedNode.disconnect(pan);
                }
        }
        }
    }
    componentDidMount() {
       

    }

    onDragStart = (e) => {
        e.dataTransfer.setData('text','')
        this.props.onDragStart(this.state.selectedNode, this.state.isNodeOutputNull)
    }

    onDrop = (e) => {
        e.dataTransfer.getData('text')
        this.props.onDrop(e, this.state.selectedNode, this.state.isNodeInputNull)
    }

    render() {

        const {pan} = this.props;
        


        var divStyle = {
            display: this.state.toggle? "block":"none"
        }
        var divStyle2 = {
            display: this.state.toggle? "none":"block"
        }
        var divStyle3 = {
            display:this.state.isMaster? "block":"none"
        }

        return(
            <div 
                key={this.props.myKey}
                className="nodeconnector"
            >

                <div
                    
                    onDragOver={this.props.onDragOver}
                    className="droppable"
                    onDrop={(e) => this.onDrop(e)}
                    className="connector">
                </div>


                <div onClick={this.toggleOptions} class={this.state.node}>
                    <div 
                        style={divStyle2}
                        className="p">
                            
                        {this.props.name === "OSC"? this.props.name: this.state.name}
                        <div style={divStyle3} class="littlegreencircle"></div>
                    </div>
                    

                    {/* {this.state.effectOptions.map((item) => 
                        <NodeOption 
                        key={item}
                        name = {item}
                        onClick={(e) => this.change(e)}
                        divStyle={divStyle}
                        hover={(e) => this.hover(e)}
                        toggleClass = {this.state.toggleClass? "p selected top": "p"}
                        isToggle1={this.state.isToggle1}
                            
                        

                    />)} */}
                    <div 
                        onClick={this.changeEffect}
                        style={divStyle}
                        onMouseEnter={this.hover1}
                        onMouseLeave={this.hover1}
                        className={!this.state.isToggle1?"p":"p selected top"}>
                            
                        {this.props.name}

                    </div>
                    <div 
                        onClick={this.changeEffect2}
                        style={divStyle}
                        onMouseEnter={this.hover2}
                        onMouseLeave={this.hover2}
                        className={!this.state.isToggle2? "p": "p selected"}>
                        
                        {this.props.name2}
                        
                    </div>
                    <div 
                        onClick={this.changeEffect3}
                        style={divStyle} 
                        onMouseEnter={this.hover3}
                        onMouseLeave={this.hover3}
                        className={!this.state.isToggle3? "p": "p selected"}>
                        
                            {this.props.name3}
                    
                    </div>
                    <div 
                        onClick={this.changeEffect6}
                        style={divStyle} 
                        onMouseEnter={this.hover6}
                        onMouseLeave={this.hover6}
                        className={!this.state.isToggle6? "p": "p selected"}>
                        
                            {this.props.name6}
                    
                    </div>
                    {/* <div 
                        onClick={this.changeEffect4}
                        style={divStyle}
                        onMouseEnter={this.hover4}
                        onMouseLeave={this.hover4}
                        className={!this.state.isToggle4?"p" : "p selected"}>
                        
                        {this.props.name4}
                        
                    </div> */}
                    <div 
                        onClick={this.changeEffect5}
                        style={divStyle} 
                        onMouseEnter={this.hover5}
                        onMouseLeave={this.hover5}
                        className={!this.state.isToggle5?"p" : this.state.isMaster?"p selected":"p selected green"}>
                        
                        {this.props.name5}
                    
                    </div>
                </div>


                <div
                
                    onDragStart={(e) => this.onDragStart(e)}
                    draggable="true"
                    className="draggable"
                    className="connector"
                >
                </div>


            </div>
        )
    }
}

export default Node;