import React, { Component } from 'react'
import Node from './Node'



class RowofNodes extends Component {
    state = {
        selectedNodes: [],
        selectedNode: null,
        inputWire: null,
        outputWire: null,
        isWire1: false,
        isWire2: false,
        isWire3: false,
        isWire5: false,
        isWire6: false,
        isWire7: false,
        isWire8: false,
        isWire9: false,
        isWire10: false,


   
    }
    addNode = () => {
        if (this.state.selectedNodes.length < 3 ) 
        { 
           this.setState(prevState => ({
            selectedNodes: prevState.selectedNodes.concat(this.state.selectedNodes[this.state.selectedNodes.length - 1] + 1)
        }))
        }
    }
    removeNode = () => {
        if (this.state.selectedNodes.length != 1) {
            this.state.selectedNodes.pop()
            this.setState({selectedNodes: this.state.selectedNodes})
        }
       
    }
    addRow = () => { 
        this.props.addRow(this.props.number);
    }
    removeRow = () => { 
        
        this.props.removeRow(this.props.number)
     }


    // changeEffect = () => {
    //     console.log("it's working")
    //     this.setState({selectedNode: this.props.filt})
    // }
    // changeEffect2 = () => {
    //     console.log("it's working"+ this.state.selectedNode)
    //     this.setState({selectedNode: this.props.pingpong})
    // }
    // changeEffect3 = () => {
    //     console.log("it's working")
    //     this.setState({selectedNode: this.props.bitcrush})
    // }

    onDragStart = (ev, number, node) => {
        console.log('dragstart: ', ev, number);
        // ev.dataTransfer.setData("id", ev.target.myID);
        // this.setState({selectedNode: this.state.selectedNode});
        this.props.connector(ev, node);
      
        console.log("ISNODEOUT", node)
        console.log(number);
        this.props.setWire1(number);
        this.props.setOutputNode(node);
        

    }



     onDragOver = (e) => {
         
         e.preventDefault();
         
         
     }

     onDrop = (ev, number, node) => {
        // ev.dataTransfer.getData(ev);
        this.props.connected(ev, number, node);
        console.log("this will be", this.props.inputWire, "to", number);
        console.log("Noooooode", this.props.isNodeOutputNull, "and", node)
        this.props.setWire2(number);

        if (!node && !this.props.isNodeOutputNull)
        {
            if (this.props.inputWire === -1 && number === 0){
                if (this.state.isWire1) {
                    this.setState({isWire1: !this.state.isWire1})
                }
                else if (!this.state.isWire1) {
                    this.setState({isWire1: !this.state.isWire1})
                }
            }
            if (this.props.inputWire === -1 && number === 1){
                if (this.state.isWire2) {
            
                    this.setState({isWire2: !this.state.isWire2})
                }
                else if (!this.state.isWire2) {

                    this.setState({isWire2: !this.state.isWire2})
                }
            }
            if (this.props.inputWire === -1 && number === 2){
                if (this.state.isWire3) {
            
                    this.setState({isWire3: !this.state.isWire3})
                }
                else if (!this.state.isWire3) {

                    this.setState({isWire3: !this.state.isWire3})
                }
            }

            if (this.props.inputWire === 0 && number === 0){
                if (this.state.isWire1) {
                    this.setState({isWire1: !this.state.isWire1})
                }
                else if (!this.state.isWire1) {
                    this.setState({isWire1: !this.state.isWire1})
                }
            }
            if (this.props.inputWire === 0 && number === 1){
                if (this.state.isWire2) {
            
                    this.setState({isWire2: !this.state.isWire2})
                }
                else if (!this.state.isWire2) {

                    this.setState({isWire2: !this.state.isWire2})
                }
            }
            if (this.props.inputWire === 0 && number === 2){
                if (this.state.isWire3) {
            
                    this.setState({isWire3: !this.state.isWire3})
                }
                else if (!this.state.isWire3) {

                    this.setState({isWire3: !this.state.isWire3})
                }
            }

            if (this.props.inputWire === 1 && number === 0){
                if (this.state.isWire6) {
                    this.setState({isWire6: !this.state.isWire6})
                }
                else if (!this.state.isWire6) {
                    this.setState({isWire6: !this.state.isWire6})
                }
            }
            if (this.props.inputWire === 1 && number === 1){
                if (this.state.isWire5) {
            
                    this.setState({isWire5: !this.state.isWire5})
                }
                else if (!this.state.isWire5) {

                    this.setState({isWire5: !this.state.isWire5})
                }
            }
            if (this.props.inputWire === 1 && number === 2){
                if (this.state.isWire7) {
            
                    this.setState({isWire7: !this.state.isWire7})
                }
                else if (!this.state.isWire7) {

                    this.setState({isWire7: !this.state.isWire7})
                }
            }

            if (this.props.inputWire === 2 && number === 0){
                if (this.state.isWire8) {
                    this.setState({isWire8: !this.state.isWire8})
                }
                else if (!this.state.isWire8) {
                    this.setState({isWire8: !this.state.isWire8})
                }
            }
            if (this.props.inputWire === 2 && number === 1){
                if (this.state.isWire9) {
            
                    this.setState({isWire9: !this.state.isWire9})
                }
                else if (!this.state.isWire9) {

                    this.setState({isWire9: !this.state.isWire9})
                }
            }
            if (this.props.inputWire === 2 && number === 2){
                if (this.state.isWire10) {
            
                    this.setState({isWire10: !this.state.isWire10})
                }
                else if (!this.state.isWire10) {

                    this.setState({isWire10: !this.state.isWire10})
                }
            }
        }
   
        
     }

    componentDidMount() {
        if (this.state.selectedNodes.length === 0) {
            this.setState({selectedNodes: this.state.selectedNodes.concat(0)})
        }
    }
    render() {
        console.log("wire number is ", this.props.inputWire)
        // console.log(this.state.selectedNode)
        var divStyleWire1 = {
            display: this.state.isWire1? "block": "none"
        }
        var divStyleWire2 = {
            display: this.state.isWire2? "block": "none"
        }
        var divStyleWire3 = {
            display: this.state.isWire3? "block": "none"
        }
        var divStyleWire5 = {
            display: this.state.isWire5? "block": "none"
        }
        var divStyleWire6 = {
            display: this.state.isWire6? "block": "none"
        }
        var divStyleWire7 = {
            display: this.state.isWire7? "block": "none"
        }
        var divStyleWire8 = {
            display: this.state.isWire8? "block": "none"
        }
        var divStyleWire9 = {
            display: this.state.isWire9? "block": "none"
        }
        var divStyleWire10 = {
            display: this.state.isWire10? "block": "none"
        }
        return(
            <div key={this.props.myKey} class="rownodes">
                <div class="row2">

                    <div style={divStyleWire1} class="wire1"></div>
                    <div style={divStyleWire2} class="wire2"></div>
                    <div style={divStyleWire2} class="wire2bottom"></div>
                    <div style={divStyleWire3} class="wire3"></div>
                    <div style={divStyleWire3} class="wire3bottom"></div>
                        <div style={divStyleWire5} class="wire5"></div>
                        <div style={divStyleWire6} class="wire6top"></div>
                        <div style={divStyleWire6} class="wire6bottom"></div>
                        <div style={divStyleWire7} class="wire7"></div>
                        <div style={divStyleWire7} class="wire7bottom"></div>
                        <div style={divStyleWire8} class="wire8bottom"></div>
                        <div style={divStyleWire8} class="wire8top"></div>
                        <div style={divStyleWire9} class="wire9bottom"></div>
                        <div style={divStyleWire9} class="wire9top"></div>
                        <div style={divStyleWire10} class="wire10"></div>

                </div> 


                <div class="row">
                
                    <div class="pluscircles">
                        <div 
                            // onClick={() => this.props.addRow(this.props.number)}
                            class="pluscircleleft blank"
                        >
                            <div class="p12"></div>
                        </div>
                        <div 
                            // onClick={() => this.props.removeRow(this.props.number)} 
                            class="pluscircleright blank"
                        >
                            <div class="p12"></div>
                        </div>
                    </div>      
                    {this.state.selectedNodes.map((number) => 
                        <Node 
                            key={number}
                            number={number}
                            myKey={[this.props.number, number]}
                            name="FILT"
                            name2="DELAY"
                            name3="BITCRUSH"
                            name4="   -null-    "
                            name5="   -toMaster-    "
                            changeEffect={this.changeEffect}
                            changeEffect2={this.changeEffect2}
                            changeEffect3={this.changeEffect3}
                            selectedNode={this.state.selectedNode}
                            onDragStart={(e, node) => {this.onDragStart(e, number, node)}}
                            onDrop={(e, node) => this.onDrop(e, number, node)}
                            onDragOver={(e) => {this.onDragOver(e)}}
                            osc={this.props.osc}
                            pan={this.props.pan}
                            filt={this.props.filt}
                            pingpong={this.props.pingpong}
                            bitcrush={this.props.bitcrush} 
                            
                            />
                   )}
                    
                    
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


            </div>
        )
    }
}
export default RowofNodes