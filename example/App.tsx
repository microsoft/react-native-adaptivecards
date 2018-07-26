import React from 'react';
import {
    ScrollView,
    View,
} from 'react-native';

import mockData from './mockData';
import bingAnswerData from './mockData/BingAnswer2';
import AdaptiveCard from './AdaptiveCards';

const cardGap = 20;
const cardOverrideStyle = {
    image: {
        imageSize: {
            small: 32,
            medium: 64,
        }
    },
};

export default class App extends React.Component<any, any> {
    render() {
        return <ScrollView
            style={{
                marginTop: 24,
                flex: 1,
            }}
            contentContainerStyle={{
                padding: 10,
                backgroundColor: 'whitesmoke',
            }}
        >
            <AdaptiveCard adaptiveCard={bingAnswerData.heightOfEiffelTower} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={bingAnswerData.highestMountionInTheWorld} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={bingAnswerData.latestNews} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={bingAnswerData.microsoftStock} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={bingAnswerData.showMeFunnyVideo} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={bingAnswerData.timeInLondon} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={bingAnswerData.whatIsTheWeather} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.adaptiveUpdate} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.peaplePicker} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.emailSent} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.searchEmail} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.readEmail} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.news} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.adaptiveUpdate} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.flightItinerary} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.flightUpdate} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.foodOrder} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.imageGallery} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.inputForm} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.inputs} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.restaurant} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.solitaire} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.sportsGameUpdate} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.stockUpdate} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.weatherCompact} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.weatherLarge} />
        </ScrollView>;
    }

    private renderGap() {
        return <View style={{ height: cardGap }} />;
    }
}
