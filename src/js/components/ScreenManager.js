import React, { Component } from 'react';


// Here's a component

// I'm going to pass a series of screens to it

// It's responsible for displaying the current screen

// and letting me switch between the screens passed to it

export default class ScreenManager extends Component {


	render() {
		const { screens } = this.props;
		const currentScreen = screens[this.props.currentScreen];

		return (
			<div class="settingsarea">
					{currentScreen}
			</div>
		);
	}
}
