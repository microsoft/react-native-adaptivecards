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
    constructor(props) {
        super(props);
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
                <AdaptiveCards adaptiveCard={mockData.peoplePicker} onCallback={this.onCallback} onSubmit={this.onSubmit}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.bingMap} onSubmit={this.onSubmit}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.dinning} onSubmit={this.onSubmit}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.vocabulary} onSubmit={this.onSubmit} />
                {this.renderGap()}
				<AdaptiveCards adaptiveCard={mockData.fact} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.showVideo} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.weatherCompact} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.heightOfEiffelTower} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.highestMountionInTheWorld} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.latestNews} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.microsoftStock} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.showMeFunnyVideo} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.timeInLondon} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.whatIsTheWeather} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.adaptiveUpdate} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.emailSent} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.searchEmail} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.readEmail} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.news} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.adaptiveUpdate} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.flightItinerary} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.flightUpdate} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.foodOrder} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.imageGallery} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.inputForm} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.inputs} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.restaurant} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.solitaire} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.sportsGameUpdate} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.stockUpdate} onSubmit={this.onSubmit} />
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.weatherLarge} onSubmit={this.onSubmit} />
            </ScrollView>
        );
    }

    renderGap() {
        return <View style={{ height: cardGap }} />;
    };

    onSubmit = (data) => {
        console.log(data);
        return Promise.resolve(true);
    }

    onCallback = (url, data) => {
        console.log(url);
        console.log(data);
        return Promise.resolve(mockData.peopleSuggestion);
    }
}
