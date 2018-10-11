import React, { Component } from 'react'
import Node from './Node'

class RowofNodes extends Component {
    state = {
        selectedNodes: [],
    }
    addNode = () => {
        this.setState(prevState => ({
            selectedNodes: prevState.selectedNodes.concat(1)
        }))
    }
    removeNode = () => {
        this.state.selectedNodes.pop()
        this.setState({selectedNodes: this.state.selectedNodes})
    }
    addRow = () => { 
        this.props.addRow(this.props.number);
    }
    removeRow = () => { 
        
        this.props.removeRow(this.props.number)
     }
    render() {
        return(
            <div key={this.props.key} class="rownodes">
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
                        <div class="connector"></div>
                        <Node 
                            name="FILT"
                            name2="DELAY"
                            name3="BITCRUSH"
                            name4="   -null-   "
                            name5="   -toMaster-   " />
                        <div class="connector"></div>
                    </div>

                    {this.state.selectedNodes.map((number) => 
                    <div class="nodeconnector"> 
                        <div class="connector"></div>
                        <Node 
                            name="FILT"
                            name2="DELAY"
                            name3="BITCRUSH"
                            name4="   -null-    "
                            name5="   -toMaster-    " />
                        <div class="connector"></div>
                    </div>)}
                    
                    
                    <div class="nodeconnector"> 
                        <div class="connector invis">
                        </div>
                        <div onClick={this.addNode} class="node add split">
                            <div class="p1">+</div>
                        </div>

                        <div onClick={this.removeNode} class="node add split">
                            <div class="p1">-</div>
                        </div>

                    </div>

                    <div class="nodeconnector"> {this.props.number}</div>
                        

                </div>
                <div class="row2">

                        {/* <div class="wire5"></div>
                        <div class="wire6"></div>
                        <div class="wire7"></div>
                        <div class="wire8"></div>
                        <div class="wire9"></div>
                         */}

                </div> 

            </div>
        )
    }
}
export default RowofNodes