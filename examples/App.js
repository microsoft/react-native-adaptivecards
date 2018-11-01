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
                <AdaptiveCards adaptiveCard={mockData.button} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.counter} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.inputs} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.peoplePicker} onCallback={this.onCallback} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.bingMap} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.bingFact} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.dinning} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.vocabulary} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.fact} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.showVideo} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.weatherCompact} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.heightOfEiffelTower} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.highestMountainInTheWorld} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.latestNews} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.microsoftStock} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.showMeFunnyVideo} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.timeInLondon} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={BingAnswer.whatIsTheWeather} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.adaptiveUpdate} onSubmit={this.onSubmit} overrideStyle={cardOverrideStyle} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.emailSent} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.searchEmail} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.readEmail} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.news} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.adaptiveUpdate} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.flightItinerary} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.flightUpdate} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.foodOrder} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.imageGallery} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.inputForm} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.restaurant} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.solitaire} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.sportsGameUpdate} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.stockUpdate} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
                <AdaptiveCards adaptiveCard={mockData.weatherLarge} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
            </ScrollView>
        );
    }

    renderGap() {
        return <View style={{ height: cardGap }} />;
    };

    onInfo = (data) => {
        console.log(data);
    }

    onWarning = (data) => {
        console.log(data);
    }

    onError = (error) => {
        console.log(error);
    }

    onSubmit = (data) => {
        console.log(data);
        return Promise.resolve(true);
    }

    onOpenUrl = (url, method, data) => {
        console.log(`OnOpenUrl >> ${method} >> ${url}`, data);
        return Promise.resolve(true);
    }

    onCallback = (url, data) => {
        console.log(url);
        console.log(data);
        return Promise.resolve(mockData.peopleSuggestion);
    }
}
