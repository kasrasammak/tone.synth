import {Envelope} from 'tone'

class MyEnvelope {
    constructor() {
        this.env = new Envelope;
    }
    connect(param) {
        console.log(this.env);
        this.env.connect(param);
    }
}

export default MyEnvelope;