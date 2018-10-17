import React, { Component } from 'react'

export default class Instructions extends Component {
    render() {
        return (
            <div className="instructions">
                <div class="welcome">Welcome to Kasra's <br/>Sound Synthesizer Web Application!</div>
                <br/>
                Simply click on any of the keys listed above to generate a sound.
                <br/><br/>
                Click on an empty node in the section labeled ROUTING to select an effect.
                <br/><br/>
                Drag and drop the yellow node connectors to connect nodes.
                <br/><br/>
                Clicking on the primary OSC node will connect it to and disconnect it from the Master channel.
                <br/><br/>
                <br/>
                <div className="notedd">
                    ***This site is still under construction, so please keep in mind: 
                        <ul>
                            <li>Do not connect the same effect twice</li>
                            <li>Do not connect nodes in the same row</li>
                            <li>Do not change a node which is already connected</li>
                            <li>Should you accidentally do any of this, <br/>simply refresh the page</li>
                            <li>LFO Power connects the LFO directly 
                                <br/>to the filter's frequency, 
                                <br/>so you must have the filter connected 
                                <br/>in order to hear its effects.</li>
                        </ul>
                </div>
                <br/>
                
                Enjoy!
            </div>
        )
    }
}