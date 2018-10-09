import React, { Component } from 'react'

class Node extends Component {
    state = {
        node: "node",
        toggle: false,
        isToggle1: false,
        isToggle2: false,
        isToggle3: false,
        isToggle4: false,
        isToggle5: false,
        name: null,
        isMaster: false,
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
    hover1 = () => {
        if (this.props.name != "OSC"){
            this.setState({isToggle1: !this.state.isToggle1})
        }
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
    changeEffect = () => {
        this.setState({name: this.props.name})
        this.setState({isMaster: false})
    }
    changeEffect2 = () => {
        this.setState({name: this.props.name2})
        this.setState({isMaster: false})
    }
    changeEffect3 = () => {
        this.setState({name: this.props.name3})
        this.setState({isMaster: false})
    }
    changeEffect4 = () => {
        this.setState({name: null})
        this.setState({isMaster: false})
    }
    changeEffect5 = () => {
         {
            if (this.state.name === null) {
                this.setState({isMaster: false})
            }
            else {
                this.setState({isMaster: !this.state.isMaster})
            }
            
        }

        
    }
    render() {
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
            <div onClick={this.toggleOptions} class={this.state.node}>
                <div 
                    style={divStyle2}
                    class="p">
                        
                    {this.props.name === "OSC"? this.props.name:this.state.name}
                    <div style={divStyle3} class="littlegreencircle"></div>
                </div>
                
                <div 
                    onClick={this.changeEffect}
                    style={divStyle}
                    onMouseEnter={this.hover1}
                    onMouseLeave={this.hover1}
                    class={!this.state.isToggle1?"p":"p selected top"}>
                        
                    {this.props.name}

                </div>
                <div 
                    onClick={this.changeEffect2}
                    style={divStyle}
                    onMouseEnter={this.hover2}
                    onMouseLeave={this.hover2}
                    class={!this.state.isToggle2? "p": "p selected"}>
                    
                    {this.props.name2}
                    
                </div>
                <div 
                    onClick={this.changeEffect3}
                    style={divStyle} 
                    onMouseEnter={this.hover3}
                    onMouseLeave={this.hover3}
                    class={!this.state.isToggle3? "p": "p selected"}>
                    
                        {this.props.name3}
                
                </div>
                <div 
                    onClick={this.changeEffect4}
                    style={divStyle}
                    onMouseEnter={this.hover4}
                    onMouseLeave={this.hover4}
                    class={!this.state.isToggle4?"p" : "p selected"}>
                    
                    {this.props.name4}
                    
                </div>
                <div 
                    onClick={this.changeEffect5}
                    style={divStyle} 
                    onMouseEnter={this.hover5}
                    onMouseLeave={this.hover5}
                    class={!this.state.isToggle5?"p" : "p selected green"}>
                    
                    {this.props.name5}
                
                </div>
            </div>
        )
    }
}

export default Node;