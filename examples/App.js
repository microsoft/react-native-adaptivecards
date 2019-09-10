import React from 'react';
import { ScrollView, View } from 'react-native';

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

                <AdaptiveCards adaptiveCard={mockData.inputs} onSubmit={this.onSubmit} onInfo={this.onInfo} onError={this.onError} onWarning={this.onWarning} onOpenUrl={this.onOpenUrl}/>
                {this.renderGap()}
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
