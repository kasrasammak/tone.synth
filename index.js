var app = {

	
	synth : null,
	polysynth: null,
	filter : null,
	ampEnv : null,
	osc : null,
	ppdelay : null,
	dist : null,
	lfo : null,
	tremolo : null,




	
	play : function (note, duration, offset) {
		setTimeout( () => {
			this.synth.triggerAttackRelease(note, duration);
		}, offset)
	},

	
	
	playAttack : function (note) {
		this.synth.triggerAttack(note);
	},
	
	playRelease : function (note) {
		this.synth.triggerRelease(note);
	},

	initSynth: function (voices) {
		this.synth = new Tone.PolySynth(voices, Tone.Synth);
	},

	initOsc : function (freq, type) {
		this.osc = new Tone.Oscillator(freq, type);
	},

	//filter
	initFilter : function (freq, type, slope ) {
		this.filter = new Tone.Filter(freq, type, slope);
	},

	//ping pong delay - time of delay and feedback amount (0 - 1)
	initPPDelay : function (time, feedback) {
		this.ppdelay = new Tone.PingPongDelay(time, feedback);
	},
	//distortion - amount(0-1)
	initDist : function (amt){
		this.dist = new Tone.Distortion(amt);
	},
	//LFO - freq (0.1 - 10)
	initLFO : function (freq, min, max) {
		this.lfo = new Tone.LFO(freq,min,max);
	},
	initTremolo : function (freq, depth) {
		this.tremolo = new Tone.Tremolo(freq, depth);
	},

	start : function (node) {
		node.start();
	},
	stop : function (node) {
		node.stop();
	},
	connectToMaster : function(node) {
		node.toMaster();
	},
	disconnectMaster : function (node) {
		node.disconnect(Tone.Master);
	},

	//filter
	connectToEffect : function(node, effect){
		node.connect(effect);
	},
	
	disconnectFrom : function(node, effect){
		node.disconnect(effect);
	},
	
	//play a random bass sound
	playRandomBass : function () {
		this.play("G1", "8n", 0000);
	}

}


// call the init functions
app.initSynth();
app.initFilter(20, "highpass", -24);
app.connectToMaster(app.filter);

app.synth.connect(app.filter);
app.initDist(.4);
app.connectToMaster(app.dist);
app.initPPDelay(.25,.1);
app.connectToMaster(app.ppdelay);
app.initLFO(1, 400, 10000);





//VARIABLES
//--------------------------------------
//--------------------------------------

//octave variable to 3rd octave (C3)
var oct = 3;
//notes of the keyboard
var note = {
	name: null,
	number: null,
	65: "C",
	87: "C#",
	83: "D",
	69: "D#",
	68: "E",
	70: "F",
	84: "F#",
	71: "G",
	89: "G#",
	72: "A",
	85: "A#",
	74: "B",
	75: "C",
	79: "C#",
	76: "D",
}


// envelope
// var env = new Tone.Envelope({
// 	"attack": 1,
// 	"decay": 1,
// 	"sustain": .5,
// 	"release": 0.1
// });

// env.connect(filter.frequency);

var synthA = new Tone.Synth({
	oscillator : {
  	type : 'fmsquare',
    modulationType : 'sawtooth',
    modulationIndex : 3,
    harmonicity: 3.4
  },
  envelope : {
  	attack : 0.001,
    decay : 0.1,
    sustain: 0.1,
    release: 0.1
  }
}).toMaster()

var pressedKeys = [];

//FUNCTIONS
//--------------------------------------
//--------------------------------------

function connect() {
	var connectFromNodeVal = document.getElementById("nodeFromConnect").value;
	var connectToNodeVal = document.getElementById("nodeToConnect").value;
	var connectFromNode = null;
	var connectToNode = null;
	if (connectFromNodeVal === "synth"){
		connectFromNode = app.synth;
	}
	if (connectFromNodeVal === "filter"){
		connectFromNode = app.filter;
	}
	if (connectFromNodeVal === "pingpong"){
		connectFromNode = app.dist;
	}
	if (connectFromNodeVal === "distortion"){
		connectFromNode = app.ppdelay;
	}
	if (connectToNodeVal === "synth"){
		connectToNode = app.synth;
	}
	if (connectToNodeVal === "filter"){
		connectToNode = app.filter;
	}
	if (connectToNodeVal === "pingpong"){
		connectToNode = app.ppdelay;
	}
	if (connectToNodeVal === "distortion"){
		connectToNode = app.dist;
	}
	app.connectToEffect(connectFromNode, connectToNode);
}
function disconnect() {
	var disconnectFromNodeVal = document.getElementById("nodeFromDisconnect").value;
	var disconnectToNodeVal = document.getElementById("nodeToDisconnect").value;
	var disconnectFromNode = null;
	var disconnectToNode = null;
	if (disconnectFromNodeVal === "synth"){
		disconnectFromNode = app.synth;
	}
	if (disconnectFromNodeVal === "filter"){
		disconnectFromNode = app.filter;
	}
	if (disconnectFromNodeVal === "pingpong"){
		disconnectFromNode = app.ppdelay;
	}
	if (disconnectFromNodeVal === "distortion"){
		disconnectFromNode = app.dist;
	}
	if (disconnectToNodeVal === "synth"){
		disconnectToNode = app.synth;
	}
	if (disconnectToNodeVal === "filter"){
		disconnectToNode = app.filter;
	}
	if (disconnectToNodeVal === "pingpong"){
		disconnectToNode = app.ppdelay;
	}
	if (disconnectToNodeVal === "distortion"){
		disconnectToNode = app.dist;
	}
	app.disconnectFrom(disconnectFromNode, disconnectToNode);
}
function connectToMaster() {
	var MasterConnect = null;
	var MasterConnectVal = document.getElementById("toMasterNode").value;
	if (MasterConnectVal === "synth"){
		MasterConnect = app.synth;
	}
	if (MasterConnectVal === "filter"){
		MasterConnect = app.filter;
	}
	if (MasterConnectVal === "pingpong"){
		MasterConnect = app.ppdelay;
	}
	if (MasterConnectVal === "distortion"){
		MasterConnect = app.dist;
	}
	app.connectToMaster(MasterConnect);
}
function disconnectFromMaster() {
	var MasterDisconnect = null;
	var MasterDisconnectVal = document.getElementById("toMasterNode").value;
	if(MasterDisconnectVal === "synth") {
		MasterDisconnect = app.synth;
	}
	if(MasterDisconnectVal === "filter") {
		MasterDisconnect = app.filter;
	}
	if (MasterConnectVal === "pingpong"){
		MasterConnect = app.ppdelay;
	}
	if (MasterConnectVal === "distortion"){
		MasterConnect = app.dist;
	}
	app.disconnectMaster(MasterDisconnect);
}
function setFilterFreq () {
	var x = document.getElementById("filterFreqText").value;
	x = parseInt(x);
	app.filter.frequency.value = x;
	document.getElementById("demo").innerHTML = app.filter.frequency.value;
}
function setFilterType () {
	var x = document.getElementById("filterType").value;
	app.filter.type = x;
	document.getElementById("demo2").innerHTML = app.filter.type;
}
function setFilterSlope () {
	var x = document.getElementById("filterSlopeText").value;
	x = parseInt(x);
	app.filter.rolloff = x;
	document.getElementById("demo3").innerHTML = app.filter.rolloff;
}
function setFilter() {
	var FilterFreq = document.getElementById("filterFreqText").value;
	FilterFreq = parseInt(FilterFreq);
	var FilterType = document.getElementById("filterType").value;
	var FilterSlope = document.getElementById("filterSlopeText").value;
	FilterSlope = parseInt(FilterSlope);
	app.filter.type = FilterType; 
	app.filter.frequency.value = FilterFreq;
	app.filter.rolloff = FilterSlope;
	document.getElementById("demo").innerHTML = app.filter.frequency.value;
	document.getElementById("demo2").innerHTML = app.filter.type;
	document.getElementById("demo3").innerHTML = app.filter.rolloff;
}
function setPingPongTime() {
	var PingPongTime = document.getElementById("pingpongtime").value;
	app.ppdelay.delayTime.value = PingPongTime;
}
function setPingPongFeedback() {
	var PingPongFeedback = document.getElementById("pingpongfeedback").value;
	app.ppdelay.feedback.value = PingPongFeedback;
}
function setLFOFrequency() {

	var LFOFrequency = document.getElementById("lfofrequency").value;
	app.lfo.frequency.value = LFOFrequency;

}
function connectLFO() {
	var LFOto = document.getElementById("lfo").value;
	var LFOtoVal = null;
	document.getElementById("demo").innerHTML = LFOto;
	if (LFOto === "lfofilterfreq"){
		LFOtoVal = app.filter.frequency;
	}
	if (LFOto ==="lfopingpongtime"){
		LFOtoVal = app.ppdelay.delayTime.value;
	}
	if (LFOto === "lfolfoamount"){
		LFOtoVal = app.lfo.amplitude;
	}
	if (LFOto ==="lfodistamt"){
		LFOtoVal = app.dist.distortion.value;
	}
	app.connectToEffect(app.lfo, LFOtoVal);
	app.lfo.start();
}
function disconnectLFO() {
	// app.lfo.stop();
	var LFOfrom = document.getElementById("LFOfrom").value;
	app.disconnectFrom(app.lfo);
}
function start() {
	var startNodeVal = document.getElementById("startstop").value;
	var startNode = null;
	if (startNodeVal === "lfo") {
		startNode = app.lfo;
	}
	app.start(startNode);
}
function stop() {
	var stopNodeVal = document.getElementById("startstop").value;
	var stopNode = null;
	if (stopNodeVal === "lfo") {
		stopNode = app.lfo;
	}
	app.stop(stopNode);
}


//sliders
var slider1 = document.getElementById("lfotimeslide");
slider1.oninput = function() {
	var LFOFrequency = this.value;
	app.lfo.frequency.value = this.value;
	document.getElementById("lfofrequency").value = this.value;
}
var slider2 = document.getElementById("filterfreqslide");
slider2.oninput = function() {
	app.filter.frequency.value = this.value;
	document.getElementById("filterFreqText").value = this.value;
}
var slider3 = document.getElementById("lfoampslide");
slider3.oninput = function() {
	var LFOAmplitude = this.value;
	app.lfo.amplitude.value = this.value;
	// document.getElementById("lfofrequency").value = this.value;
}
var slider4 = document.getElementById("ppdelaytimeslide");
slider4.oninput = function() {
	var PPDelayFrequency = this.value;
	app.ppdelay.delayTime.value = this.value;
	document.getElementById("pingpongtime").value = this.value;
}
var slider3 = document.getElementById("ppdelayfeedslide");
slider3.oninput = function() {
	var PPDelayFeedback = this.value;
	app.ppdelay.feedback.value = this.value;
	document.getElementById("pingpongfeedback").value = this.value;
}

// EVENTS
//--------------------------------------
//--------------------------------------


//Buttons
document.getElementById("Btn2").addEventListener('click', function() {app.playRandomBass()});
document.getElementById("connect").addEventListener('click', connect)
document.getElementById("disconnect").addEventListener('click', disconnect)
document.getElementById("toMasterConnect").addEventListener('click', connectToMaster)
document.getElementById("toMasterDisconnect").addEventListener('click', disconnectFromMaster)

document.getElementById("setFilterFreq").addEventListener('click', setFilterFreq)
document.getElementById("setFilterType").addEventListener('click', setFilterType)
document.getElementById("setFilterSlope").addEventListener('click', setFilterSlope)
document.getElementById("setFilter").addEventListener('click', setFilter)
document.getElementById("pingpongtimebtn").addEventListener('click', setPingPongTime)
document.getElementById("pingpongfeedbackbtn").addEventListener('click', setPingPongFeedback)
document.getElementById("setlfofrequency").addEventListener('click', setLFOFrequency)
document.getElementById("connectLFO").addEventListener('click', connectLFO)
document.getElementById("disconnectLFO").addEventListener('click', disconnectLFO)
document.getElementById("start").addEventListener('click', start)
document.getElementById("stop").addEventListener('click', stop)

document.querySelector('#synthA').addEventListener('mousedown', function(){ synthA.triggerAttack('C4') })
document.querySelector('#synthA').addEventListener('mouseup', function(){ synthA.triggerRelease() })
document.querySelector('#synthB').addEventListener('mousedown', function() {app.playAttack("C1")})
document.querySelector('#synthB').addEventListener('mouseup', function(){app.playRelease("C1")})

//Keyboard Listener
window.addEventListener("keydown", function(event) {
	// event.preventDefault();
	note.number = event.keyCode;
	note.name = note[note.number];
    if (note.name != undefined && !pressedKeys.includes(event.keyCode)) {
		pressedKeys.push(event.keyCode);
		if (note.number === 75 || note.number === 79 || note.number === 76) {
			oct = oct + 1;
			app.playAttack(`${note.name}${oct}`);
			oct = oct - 1;
		}
        else{
			app.playAttack(`${note.name}${oct}`);
		}
    }
	if (event.keyCode === 90){
		oct = oct - 1;
	}
	if (event.keyCode === 88){
		oct = oct + 1;
	}
});
window.addEventListener("keyup", function(event) {
    // event.preventDefault();

	var keyIndex = pressedKeys.indexOf(event.keyCode);
	if(keyIndex !== -1) {
		pressedKeys.splice(keyIndex, 1);
		note.number = event.keyCode;
		note.name = note[note.number];
    	if (note.name != undefined) {
			if (note.number === 75 || note.number === 79 || note.number === 76) {
				oct = oct + 1;
				app.playRelease(`${note.name}${oct}`);
				oct = oct - 1;
			}
      	  else{
				app.playRelease(`${note.name}${oct}`);
			}
		}
}
});
