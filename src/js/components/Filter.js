import { Filter } from 'tone'

class MyFilter {
    constructor() {
        this.filter = new Filter();
        this.filter.type = 'bandpass';
        this.filter.toMaster();
    }

    connectInput(node) {
        node.connect(this.filter);
    }
    disconnectInput(node) {
        node.disconnect(this.filter);
    }
    connectOutput(node) {
        this.filter.connect(node);
    }
    disconnectOutput(node) {
        this.filter.disconnect(node);
    }
    toMaster() {
        this.filter.toMaster();
    }
    setFreq (Hz) {
        console.log(this.filter.frequency);
        this.filter.frequency.value = Hz;
    }

}

export default MyFilter;