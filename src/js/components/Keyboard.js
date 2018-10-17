import React, { Component } from 'react'
import Key from './Key'

class Keyboard extends Component {
    state = {
        colora : {background : "lightgrey"},
        colorw : {background : "lightgrey"},
        colors : {background : "lightgrey"},
        colore : {background : "lightgrey"},
        colord : {background : "lightgrey"},
        colorf : {background : "lightgrey"},
        colort : {background : "lightgrey"},
        colorg : {background : "lightgrey"},
        colory : {background : "lightgrey"},
        colorh : {background : "lightgrey"},
        coloru : {background : "lightgrey"},
        colorj : {background : "lightgrey"},
        colork : {background : "lightgrey"},
        coloro : {background : "lightgrey"},
        colorl : {background : "lightgrey"},
        colorz : {background : "lightgrey"},
        colorx : {background : "lightgrey"},
        colornote : {background : "lightgrey"},
        coloroct : {background : "lightgrey"},
    }
    handleKeyDown = (event) => {
        const keyCode = event.keyCode;
        let colora = this.state.colora;
        let colorw = this.state.colorw;
        let colors = this.state.colors;
        let colore = this.state.colore;
        let colord = this.state.colord;
        let colorf = this.state.colorf;
        let colort = this.state.colort;
        let colorg = this.state.colorg;
        let colory = this.state.colory;
        let colorh = this.state.colorh;
        let coloru = this.state.coloru;
        let colorj = this.state.colorj;
        let colork = this.state.colork;
        let coloro = this.state.coloro;
        let colorl = this.state.colorl;
        let colorz = this.state.colorz;
        let colorx = this.state.colorx;
        let colornote = this.state.colornote;
        let coloroct = this.state.coloroct; 

        if (keyCode===65){
            colora={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colora, colornote})
            
        }
        if (keyCode===87){
            colorw= {background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorw, colornote})
        }
        if (keyCode===83){
            colors={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colors, colornote})
        }
        if (keyCode===69){
            colore={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colore, colornote})
        }
        if (keyCode===68){
            colord={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colord, colornote})
        }
        if (keyCode===70){
            colorf={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorf, colornote})
        }
        if (keyCode===84){
            colort={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colort, colornote})
        }
        if (keyCode===71){
            colorg={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorg, colornote})
        }
        if (keyCode===89){
            colory={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colory, colornote})
        }
        if (keyCode===72){
            colorh={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorh, colornote})
        }
        if (keyCode===85){
            coloru={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({coloru, colornote})
        }
        if (keyCode===74){
            colorj={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorj, colornote})
        }
        if (keyCode===75){
            colork={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colork, colornote})
        }
        if (keyCode===79){
            coloro={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({coloro, colornote})
        }
        if (keyCode===76){
            colorl={background: "#31D017"}
            colornote={background: "#31D017"}
            this.setState({colorl, colornote})
        }
        if (keyCode===90){
            colorz={background: "#31D017"}
            coloroct={background: "#31D017"}
            this.setState({colorz, coloroct})
        }
        if (keyCode===88){
            colorx={background: "#31D017"}
            coloroct={background: "#31D017"}
            this.setState({colorx, coloroct})
        }
        this.setState({colora});
    }
    handleKeyUp = (event) => {
        const keyCode = event.keyCode;
        let colora = this.state.colora;
        let colorw = this.state.colorw;
        let colors = this.state.colors;
        let colore = this.state.colore;
        let colord = this.state.colord;
        let colorf = this.state.colorf;
        let colort = this.state.colort;
        let colorg = this.state.colorg;
        let colory = this.state.colory;
        let colorh = this.state.colorh;
        let coloru = this.state.coloru;
        let colorj = this.state.colorj;
        let colork = this.state.colork;
        let coloro = this.state.coloro;
        let colorl = this.state.colorl;
        let colorz = this.state.colorz;
        let colorx = this.state.colorx;
        let colornote = this.state.colornote;
        let coloroct = this.state.coloroct;
        if (keyCode===65){
            colora={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colora, colornote})
        }
        if (keyCode===87){
            colorw={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorw, colornote})
        }
        if (keyCode===83){
            colors={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colors, colornote})
        }
        if (keyCode===69){
            colore={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colore, colornote})
        }
        if (keyCode===68){
            colord={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colord, colornote})
        }
        if (keyCode===70){
            colorf={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorf, colornote})
        }
        if (keyCode===84){
            colort={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colort, colornote})
        }
        if (keyCode===71){
            colorg={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorg, colornote})
        }
        if (keyCode===89){
            colory={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colory, colornote})
        }
        if (keyCode===72){
            colorh={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorh, colornote})
        }
        if (keyCode===85){
            coloru={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({coloru, colornote})
        }
        if (keyCode===74){
            colorj={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorj, colornote})
        }
        if (keyCode===75){
            colork={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colork, colornote})
        }
        if (keyCode===79){
            coloro={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({coloro, colornote})
        }
        if (keyCode===76){
            colorl={background: "lightgrey"}
            colornote={background: "lightgrey"}
            this.setState({colorl, colornote})
        }
        if (keyCode===90){
            colorz={background: "lightgrey"}
            coloroct={background: "lightgrey"}
            this.setState({colorz, coloroct})
        }
        if (keyCode===88){
            colorx={background: "lightgrey"}
            coloroct={background: "lightgrey"}

            this.setState({colorx, coloroct})
        }
        
        this.setState({colora})
        
    }
    

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
    }
    render() {
        return(
            <div className="component keyboard">
                        <div className="section keys">  
                            <div className="key tab space">

                            </div>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorw}
                            >
                                W
                            </Key>
                            
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colore}
                            >
                                E
                            </Key>
                            <div className="key letter space">

                            </div>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colort}
                            >
                                T
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colory}
                            >
                                Y
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.coloru}
                            >
                                U
                            </Key>
                            <div className="key letter space">

                            </div>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.coloro}
                            >
                                O
                            </Key>


                            <div className="key caps space">

                            </div>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colora}
                            >
                                A
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colors}
                            >
                                S
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colord}
                            >
                                D
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorf}
                            >
                                F
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorg}
                            >
                                G
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorh}
                            >
                                H
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorj}
                            >
                                J
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colork}
                            >
                                K
                            </Key>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorl}
                            >
                                L
                            </Key>

                            <div className="key shift space">
                                <div className="arrow down">
                                v
                                </div>
                            </div>
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorz}
                            >
                                Z
                            </Key>  
                            <Key
                                myClass="key letter"
                                myStyle={this.state.colorx}
                            >
                                X
                            </Key>
                            <div className="key space arrow up">
                                ^

                            </div>
                        </div>
                        
                        <div className="section notemap">
                            <div className="note">NOTE
                                <Key
                                    myClass="notekey"
                                    myStyle={this.state.colornote}
                                >
                                    {this.props.note}
                                </Key>
                            </div>
                            <div className="oct">OCTAVE 
                                <Key
                                    myClass="noteoct"
                                    myStyle={this.state.coloroct}
                                >
                                    {this.props.oct}
                                </Key>
                                
                            </div>
                        </div>
                    </div>
        )
    }
}

export default Keyboard