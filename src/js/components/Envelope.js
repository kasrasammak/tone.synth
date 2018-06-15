import {Envelope} from 'tone'

class MyEnvelope {
    constructor() {
        this.env = new Envelope();
        this.env.triggerAttackRelease(1);
    }
    connect(param) {
        this.env.connect(param);
    }
}

export default MyEnvelope;