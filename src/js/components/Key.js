import React, { Component } from 'react';

class Key extends Component { 
    state = {
        color : { 
            background: "lightgrey",
        },      
    }
    setColor = (color) => {
        this.setState({color})
    }
    render () {
        return (
            <div className={this.props.myClass} style={this.props.myStyle}>{this.props.children}</div>
        )
    }
}

export default Key