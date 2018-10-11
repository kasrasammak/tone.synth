import React, { Component } from 'react'
import  Node  from './Node'
import RowofNodes from './RowofNodes'


class Routing extends Component {

    state = {
        // dragStart: null,
        // dragging: null,
        // dragEnd: null,
        // onDrop: null,
        // nodeState: "node green",
        selectedNodes: [],

    }
    addRow = () => {
     
        this.state.selectedNodes.unshift(this.state.selectedNodes[0]-1);
        this.setState({selectedNodes: this.state.selectedNodes})
        
    }
    removeRow = () => {
        if (this.state.selectedNodes.length > 1) {
            this.state.selectedNodes.shift();
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
    addRowatEnd = () => {
        this.setState({selectedNodes: this.state.selectedNodes.concat(this.state.selectedNodes[this.state.selectedNodes.length - 1] + 1)})
    }
    removeRowatEnd = () => {
        this.state.selectedNodes.pop();
        this.setState({selectedNodes: this.state.selectedNodes})
    }
    componentDidMount() {
        var newArray = this.state.selectedNodes.concat(10);
        this.setState({selectedNodes: newArray})
    }
    

    render() {
        
        return (
           
            <div class="routingarea">
                
                
                
                
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
                    </div>


                    {this.state.selectedNodes.map((number) => 
                    <RowofNodes 
                        number={number}
                        key={number}
                        addRow={(n) => this.addRowfromIndex(n)}
                        removeRow={(n) => this.removeRowfromIndex(n)}
                        />
                        
                    )}
                  
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

                            <div onClick={this.addRowatEnd} class="node add split">
                                <div class="p1">+</div>
                            </div>
                            <div onClick={this.removeRowatEnd} class="node add split">
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