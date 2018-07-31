import React from 'react';
import { ScrollView, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

import AdaptiveCards from './AdaptiveCards';
import mockData from './mockData';
import BingAnswer from './mockData/BingAnswer2';

const cardGap = 20;
const cardOverrideStyle = {
    image: {
        imageSize: {
            small: 32,
            medium: 64,
        }
    },
};

export default class App extends React.Component {
	constructor(props){
		super(props);
		
		AdaptiveCards.registerSVGRenderer((svgXmlData, width, height) => {
			return (
				<SvgUri
					width={width}
					height={height}
					svgXmlData={svgXmlData} />
			);
		})
	}

	render() {
		return (
			<ScrollView style={{
				marginTop: 24,
				flex: 1,
			}}
			contentContainerStyle={{
				padding: 10,
				backgroundColor: 'white',
			}}>
				<AdaptiveCards adaptiveCard={mockData.weatherCompact} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={BingAnswer.heightOfEiffelTower} overrideStyle={cardOverrideStyle} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={BingAnswer.highestMountionInTheWorld} overrideStyle={cardOverrideStyle} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={BingAnswer.latestNews} overrideStyle={cardOverrideStyle} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={BingAnswer.microsoftStock} overrideStyle={cardOverrideStyle} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={BingAnswer.showMeFunnyVideo} overrideStyle={cardOverrideStyle} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={BingAnswer.timeInLondon} overrideStyle={cardOverrideStyle} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={BingAnswer.whatIsTheWeather} overrideStyle={cardOverrideStyle} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.adaptiveUpdate} overrideStyle={cardOverrideStyle} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.peaplePicker} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.emailSent} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.searchEmail} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.readEmail} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.news} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.adaptiveUpdate} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.flightItinerary} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.flightUpdate} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.foodOrder} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.imageGallery} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.inputForm} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.inputs} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.restaurant} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.solitaire} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.sportsGameUpdate} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.stockUpdate} />
				{this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.weatherLarge} />
			</ScrollView>
		);
	}

	renderGap() {
		return <View style={{ height: cardGap }}/>;
	};
}
