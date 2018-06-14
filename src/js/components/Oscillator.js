
import { Oscillator } from 'tone';
import { Master } from 'tone';

class MyOscillator {
    constructor() {
        // this.tone = tone;
        // create an osci
        this.osc = new Oscillator("C4");
        this.osc.type = "sine"
        // connect to master
        this.osc.toMaster();
    }
    start () {
        this.osc.start();
    }
    stop (time) {
        this.osc.stop(time);
    }
    startstop(time) {
        this.osc.start().stop(time);
    }
    restart(){
        this.osc.restart();
    }
    connect(node) {
        this.osc.connect(node);
    }
    disconnect(node) {
        this.osc.disconnect(node);
    }
    toMaster() {
        this.osc.toMaster();
    }
    disconnectMaster() {
        this.osc.disconnect(Master);
    }
    setFreq (Hz) {
        console.log(this.osc.frequency);
        this.osc.frequency.value = Hz;
    }
    setOscType (type) {
        console.log('setting type');
        console.log(type);
        this.osc.type = type;
       this.stop();
       this.start();
    }
}

export default MyOscillator;