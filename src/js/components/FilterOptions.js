import React, { Component } from 'react' 


class FilterOptions extends Component {

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
                    onClick={this.props.onLowpass} 
                    onMouseEnter={this.hover} 
                    onMouseLeave={this.hover} 
                    className={this.state.isToggle? 'filterselector':'filterselector un'}>
                        <div class="shapes lowpass"></div>
                </div>
                    
                <div 
                    onClick={this.props.onHighpass} 
                    onMouseEnter={this.hover2} 
                    onMouseLeave={this.hover2} 
                    className={this.state.isToggle2? 'filterselector':'filterselector un'}>
                        <div class="shapes highpass"></div>
                </div>
                    
                <div 
                    onClick={this.props.onBandpass} 
                    onMouseEnter={this.hover3} 
                    onMouseLeave={this.hover3} 
                    className={this.state.isToggle3? 'filterselector':'filterselector un'}>
                        <div class="shapes bandpass"></div>
                </div>
                    
                <div onClick={this.props.onNotch} 
                    onMouseEnter={this.hover4} 
                    onMouseLeave={this.hover4} 
                    className={this.state.isToggle4? 'filterselector':'filterselector un b'}>
                        <div className="shapes notch">
                            <div className="notchleft"></div>
                            <div className="notchright"></div>
                        </div>
                </div>

            </div>
        )
    }
}

export default FilterOptions;