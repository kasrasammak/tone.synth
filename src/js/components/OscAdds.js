//for later in the development of this program

import React, { Component } from 'react' 
import OscSelect from './OscSelect'

class OscAdds extends Component {
    render() {
        return(
            <div class="oscillators">
                {this.props.selectedNumbers.map((number, i) => 
                    <OscSelect number={number} />
                    )}
            </div>
        )
    }
}

export default OscAdds