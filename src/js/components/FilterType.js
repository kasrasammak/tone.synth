import React, { Component } from 'react' 
import FilterOptions from 'components/FilterOptions';

class FilterType extends Component {
    state = {
        filtertype : "lowpass above",
        filteroption2 : " above",
        isToggle : false,
        filtType : "lowpass"
    }
    
    changeHighpass = (e) => {
        this.setState({filtertype: "highpass" })
        this.setState({isToggle: false})
        this.setState({filtType : "highpass"})
        const filt = this.props.myFilt;
        filt.type = this.state.filtType;
      
    }

    changeLowpass = (e) => {
        this.setState({filtertype: "lowpass above" })
        this.setState({isToggle: false})
        this.setState({filtType : "lowpass"})
        const filt = this.props.myFilt;
        filt.type = this.state.filtType;
        
        
    }

    changeBandpass = (e) => {
        this.setState({filtertype: "bandpass" })
        this.setState({isToggle: false})
        this.setState({filtType : "bandpass"})
        const filt = this.props.myFilt;
        filt.type = this.state.filtType;
       
    
    }

    changeNotch = (e) => {
        this.setState({isToggle: true})
        this.setState({filtertype: "notchabove" })
        this.setState({filtType : "notch"})
        const filt = this.props.myFilt;
        filt.type = this.state.filtType;
    }


    render() {

        var divStyle = {
            display: this.state.isToggle? "block":"none"
        }

        return (
            <div style={this.props.myStyles} onClick={this.props.onClick} className={this.props.myClass}>

                <div class="shape">
                      
                      <div class="firstshapes">
                        <div class={this.state.filtertype}>                           
                                <div style={divStyle} class="notchleft"></div>
                                <div style={divStyle} class="notchright"></div>
                        </div>
                        <div class="triangleupsidedown filttype"></div>
                      </div>
                      
                      <FilterOptions 
                        myClass=""
                        onHighpass={this.changeHighpass}
                        onLowpass={this.changeLowpass}
                        onBandpass={this.changeBandpass}
                        onNotch={this.changeNotch}
                        myStyles={this.props.myFilterStyles}
                    
                        />
                    
                    
                        
                </div>
            
            </div>
        );
    }
}

export default FilterType;