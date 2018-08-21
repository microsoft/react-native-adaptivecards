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
                <AdaptiveCards adaptiveCard={mockData.peoplePicker} onCallback={this.onCallback}/>
            </ScrollView>
        );
    }

    renderGap() {
        return <View style={{ height: cardGap }} />;
    };

    onCallback = (url, data) => {
        return Promise.resolve(mockData.peopleSuggestion);
    }
}
