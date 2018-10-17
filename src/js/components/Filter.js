import React, { Component } from 'react'
import { Knob } from 'react-rotary-knob'
import  FilterType  from './FilterType'

class MyFilter extends Component {

    state = {
        openfiltertype : {height: "24px" },
        filteropen : false,
        filtonoff: false,
        filtonoffoval: "offoval",
        filtonoffcircle: "offcircle",

        knobValueFiltFreq : 0,
        knobValueFiltRes : 0,

        knobFilterFreqMin : 20,
        knobFilterFreqMax : 20000,
    }

    openFilterType = () => {
        console.log(this.state.openfiltertype)
        if (this.state.openfiltertype.height ===  "24px")
            {
                this.setState({openfiltertype: {height: "115px"}})
                this.setState({filteropen: true})
            }
        else {
            this.setState({openfiltertype: {height: "24px"}})
            this.setState({filteropen: false})
        }
    }

    turnFiltOnOff = () => {
        if (this.state.filtonoffoval === "offoval")
        {
            this.setState({filtonoffoval: "onoval"})
        }
        else 
        {
            this.setState({filtonoffoval: "offoval"})
        }
        if (this.state.filtonoffcircle === "offcircle")
        {
            this.setState({filtonoffcircle: "oncircle"})
        }
        else 
        {
            this.setState({filtonoffcircle: "offcircle"})
        }
        
        this.setState({filtonoff: !this.state.filtonoff})
        
    }
    attachFilt = () => {
        const { osc , filt, pan } = this.props;
        if (!this.state.filtonoff) 
        {
            console.log(filt);
            osc.disconnect();
            filt.rolloff = -96;
            filt.connect(pan);
            osc.connect(filt);
        }
        else if (this.state.filtonoff)
        {
            osc.disconnect(filt)
            filt.disconnect();
            osc.connect(pan);

        }
    }
    setFiltFreq = (value) => {
        const {filt} = this.props;
        const min = 20;
        const max = 20000;
        const position = value;
        const minp = this.state.knobFilterFreqMin;
        const maxp = this.state.knobFilterFreqMax;
        const minv = Math.log(min)/Math.log(2);
        const maxv = Math.log(max)/Math.log(2);
        const scale = (maxv-minv) / (maxp-minp);
        const value2 = Math.pow(2, minv + scale*(position-minp));
        filt.frequency.value = value2;
        this.setState( { knobValueFiltFreq: Math.floor(value2) } );
        console.log(filt);
    }
    setFiltRes = (val) => {
        const { filt } = this.props;
        filt.Q.value = val;
        this.setState({knobValueFiltRes: val})

    }

    setFilterType(event) {
        const {filt} = this.props;
        filt.type = event;
        console.log(filt)
    }
    render() {
        var divStyle = {
            display:this.state.filteropen?'block':'none'
          };

        return (
            <div className="component filter">
                <div className="filterleft">
                    FILTER   
                    
                        <FilterType 
                            myFilt={this.props.filt} 
                            myClass="filtertype"
                            myStyles={this.state.openfiltertype}
                            onClick={this.openFilterType}
                            myFilterStyles={divStyle}
                            />

                </div>

                <div className="filterright">
                    <div className="filterknobtext">
                      <div className="filtercutoff">
                        <div className="filtertextscutoff">
                          Cutoff 
                        </div>
                        <Knob
                            style={ {
                                width: "45px",
                                height: "45px",
                            } }
                            min={this.state.knobFilterFreqMin}
                            max={this.state.knobFilterFreqMax}
                            value={this.state.knobValueFiltFreq}
                            onChange={this.setFiltFreq}
                            unlockDistance={1}
                         />
                        
                      </div>
                      <div className="filterres">
                        <div className="filtertextsres">
                          Resonance
                        </div>
                        <Knob
                            style={ {
                                width: "45px",
                                height: "45px",
                            } }
                            min={0}
                            max={6}
                            value={this.state.knobValueFiltRes}
                            onChange={this.setFiltRes}
                            unlockDistance={1}
                         />
                      </div>
                    </div> 


                    {/* <div className="filteron">
                      <div onClick={this.attachFilt} className="onoff clean">
                        <div onClick={this.turnFiltOnOff} className={this.state.filtonoffoval}></div>
                        <div onClick={this.turnFiltOnOff} className={this.state.filtonoffcircle}></div>
                      </div>
                    </div> */}
                    
                </div>
            </div>
        )
    }

}

export default MyFilter;