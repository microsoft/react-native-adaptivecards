import React from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
} from 'react-native';

import mockData from './mockData';
import AdaptiveCard from '../src/index';

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
            <AdaptiveCard adaptiveCard={mockData.email} />
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
