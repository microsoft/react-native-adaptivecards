import React from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
} from 'react-native';

import mockData from './mockData';
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
            <AdaptiveCard adaptiveCard={mockData.adaptiveUpdate} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.flightItinerary} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.flightUpdate} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.foodOrder} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.imageGallery} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.inputForm} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.inputs} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.restaurant} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.solitaire} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.sportsGameUpdate} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.stockUpdate} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.weatherCompact} overrideStyle={cardOverrideStyle} />
            {this.renderGap()}
            <AdaptiveCard adaptiveCard={mockData.weatherLarge} overrideStyle={cardOverrideStyle} />
        </ScrollView>;
    }

    private renderGap() {
        return <View style={{ height: cardGap }} />;
    }
}
