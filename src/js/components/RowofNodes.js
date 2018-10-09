import React, { Component } from 'react'
import Node from './Node'

class RowofNodes extends Component {
    state = {
        selectedNodes: [],
    }
    addSection = () => {
        this.setState(prevState => ({
            selectedNodes: prevState.selectedNodes.concat(1)
        }))
    }
    removeSection = () => {
        this.state.selectedNodes.pop()
        this.setState({selectedNodes: this.state.selectedNodes})
        
    }
    render() {
        return(
            <div class="row">
                        
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
                            <div onClick={this.addSection} class="node add split">
                                <div class="p1">+</div>
                            </div>
                        
                        

                        
                            <div onClick={this.removeSection} class="node add split">
                                <div class="p1">-</div>
                            </div>

                        </div>
                        

                        
                    </div>
        )
    }
}
export default RowofNodes