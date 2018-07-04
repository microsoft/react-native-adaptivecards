import React from 'react';
import { ScrollView, View, } from 'react-native';
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
export default class App extends React.Component {
    render() {
        return React.createElement(ScrollView, {
            style: {
                marginTop: 24,
                flex: 1,
            }, contentContainerStyle: {
                padding: 10,
                backgroundColor: 'whitesmoke',
            }
        },
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.email }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.news }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.adaptiveUpdate }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.flightItinerary }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.flightUpdate }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.foodOrder }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.imageGallery }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.inputForm }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.inputs }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.restaurant }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.solitaire }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.sportsGameUpdate }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.stockUpdate }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.weatherCompact }),
            this.renderGap(),
            React.createElement(AdaptiveCard, { adaptiveCard: mockData.weatherLarge })
        );
    }
    renderGap() {
        return React.createElement(View, { style: { height: cardGap } });
    }
}
//# sourceMappingURL=App.js.map