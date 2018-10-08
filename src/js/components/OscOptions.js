import React, { Component } from 'react' 


class OscOptions extends Component {
    state = {
        isToggle: false,
        isToggle2: false,
        isToggle3: false,
        isToggle4: false
    }

    hover = (e) =>{
        this.setState({isToggle: !this.state.isToggle})
    }
    hover2 = (e) =>{
        this.setState({isToggle2: !this.state.isToggle2})
    }
    hover3 = (e) =>{
        this.setState({isToggle3: !this.state.isToggle3})
    }
    hover4 = (e) =>{
        this.setState({isToggle4: !this.state.isToggle4})
    }

    render() {
        return (
            <div style={this.props.myStyles}>
                <div 
                    onClick={this.props.onSine}
                    onMouseEnter={this.hover}
                    onMouseLeave={this.hover}
                    class={this.state.isToggle? "selected":"selected non"}>
                    <div class="sine">
                        <div class="sineleft"></div>
                        <div class="sineright"></div>
                    </div>                      
                </div>
                
                <div 
                    onClick={this.props.onSquare}
                    onMouseEnter={this.hover2}
                    onMouseLeave={this.hover2}
                    class={this.state.isToggle2? "selected":"selected non"}>
                    <div class="square">
                        <div class="squareleft"></div>
                        <div class="squareright"></div>
                    </div>
                </div>
                
                <div 
                    onClick={this.props.onSaw}
                    onMouseEnter={this.hover3}
                    onMouseLeave={this.hover3}                
                    class={this.state.isToggle3? "selected":"selected non"}>
                    <div class="sawtooth">
                        <div class="sawleft"></div>
                        <div class="sawcenter"></div>
                        <div class="sawright"></div>
                    </div>
                </div>
                <div 
                    onClick={this.props.onTriangle}
                    onMouseEnter={this.hover4}
                    onMouseLeave={this.hover4}
                    class={this.state.isToggle4? "selected":"selected non ba"}>
                    <div class="trianglewave">
                        <div class="lineleft"></div>
                        <div class="lineright"></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default OscOptions