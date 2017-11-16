import React from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
} from 'react-native';

import AdaptiveCard from './src';
import mockData from './mockData';

const GAP_CARD = 20;

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
        return <View style={{ height: GAP_CARD }} />;
    }
}
