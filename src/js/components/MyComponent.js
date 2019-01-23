import React, { Component } from 'react' 


class MyComponent extends Component {

    
    render() {
        const myStyles = {
        }
        return (
            <div style={myStyles} className={this.props.myClass}></div>
        );
    }
}

export default MyComponent;