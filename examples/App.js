import React from 'react';
import { ScrollView, View } from 'react-native';
import { CardRoot } from './AdaptiveCards';
import mockData from './mockData';

const cardGap = 20;

export default class App extends React.Component {
    render() {
        return (
            <ScrollView
                style={{
                    marginTop: 60,
                    flex: 1,
                }}
                contentContainerStyle={{
                    padding: 10,
                    backgroundColor: 'white',
                }}
            >
                {this.renderMockData()}
            </ScrollView>
        );
    }

    renderMockData() {
        return Object.keys(mockData).map((key) => {
            console.log(key);
            let data = mockData[key];
            if (data) {
                return (
                    [
                        <CardRoot
                            key={`card - mock data - ${key}`}
                            payload={data}
                            onSubmit={this.onSubmit}
                            onInfo={this.onInfo}
                            onError={this.onError}
                            onWarning={this.onWarning}
                            onOpenUrl={this.onOpenUrl}
                            onCallback={this.onCallback}
                        />,
                        <View
                            key={`card - gap - ${key}`}
                            style={{ height: cardGap }} 
                        />
                    ]
                );
            }
            return null;
        })
    }

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
