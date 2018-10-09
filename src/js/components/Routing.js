import React, { Component } from 'react'
import  Node  from './Node'
import RowofNodes from './RowofNodes'


class Routing extends Component {

    state = {
        dragStart: null,
        dragging: null,
        dragEnd: null,
        onDrop: null,
        nodeState: "node green",
        selectedNodes: [],

    }
    addSection = () => {
        this.state.selectedNodes.unshift(this.state.selectedNodes[0]-1);
        console.log(this.state.selectedNodes)
        this.setState({selectedNodes: this.state.selectedNodes})
    }
    removeSection = () => {
        this.state.selectedNodes.pop();
        this.setState({selectedNodes: this.state.selectedNodes})
    }
    

    render() {
        
        return (
           
            <div class="routingarea">
                
                <div class="pluscircles">
                <div onClick={this.addSection} class="pluscircleleft">
                    <div class="p12">+</div>
                </div>
                <div onClick={this.removeSection} class="pluscircleright">
                    <div class="p12">-</div>
                </div>
                </div>
                
                
                <div class="grid">
            
                
                    <div class="row">

                        <div class="nodeconnector"> 
                        <Node name="OSC" />
                        <div class="connector"></div>
                        </div>

                    

                
                    
                    
                    </div>
                    
                    <div class="row2">
                        
                        
                        
                        {/* <div class="wire2"></div>
                        <div class="lowwirebottom2"></div>
                        <div class="wire3"></div>
                        <div class="lowwirebottom"></div>
                        <div class="wire1"></div> */}
                        
                    </div>

                    <RowofNodes />
                    
                    <div class="row2">

                            {/* <div class="wire5"></div>
                            <div class="wire6"></div>
                            <div class="wire7"></div>
                            <div class="wire8"></div>
                            <div class="wire9"></div> */}
                            

                    </div>

                    {this.state.selectedNodes.map((number) => <RowofNodes />)}
                    
                    
                    <div class="row">
                    
                        <div class="nodeconnector"> 

                            <div onClick={this.addSection} class="node add">
                            <div class="p1">+</div>
                            </div>
                        
                        </div>

                        
                        
                    </div>
                
                </div>  
            </div>
               
        )
    }
}

export default Routing;