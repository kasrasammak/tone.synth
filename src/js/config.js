import React, { Component } from 'react'
import Screen from 'components/Screen'
import Screen2 from 'components/Screen2'


const noteMap = {
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
const scComps = [
	<Screen updateScreen = {this.updateScreen}/>,
	<Screen2 />
]

export {scComps};
export {noteMap};
