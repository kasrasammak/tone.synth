import React, { Component } from 'react'

class NodeOption extends Component {
    hover = () => {
        this.props.hover(this.props.name);
    }
    onClick = () => {
        this.props.onClick(this.props.name)
    }
    render() {
        return(
            <div 
                onClick={this.onClick}
                style={this.props.divStyle}
                onMouseEnter={this.hover}
                onMouseLeave={this.hover}
                // className={!this.props.isToggle1?"p":"p selected top"}
                className={this.props.toggleClass}
                >
                    
                {this.props.name}

            </div>
        )
    }
}
export default NodeOption