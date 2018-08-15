import * as React from 'react';
import { Text, View } from 'react-native';

interface IProps {
    title: string;
    color: string;
    backgroundColor: string;
}

export class Banner extends React.Component<IProps> {
    public render() {
        return (
            <View
                backgroundColor={this.props.backgroundColor}
                paddingTop={8}
                paddingRight={8}
                paddingBottom={8}
                paddingLeft={8}
                marginTop={4}
                marginRight={4}
                marginBottom={4}
                marginLeft={4}
            >
                <Text
                    style={{
                        color: this.props.color,
                    }}
                >
                    {this.props.title}
                </Text>
                {this.props.children}
            </View>
        );
    }
}
