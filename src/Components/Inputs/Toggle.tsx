import * as React from 'react';
import {
    Switch,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { HostConfig } from '../../Configs/Types';
import { StyleManager } from '../../Styles/StyleManager';

export interface ISwitchable {
    title: string;
    activated: boolean;
}

interface IProps extends ISwitchable {
    marginTop?: number;
    theme: 'default' | 'emphasis';
    config: HostConfig;
    onValueChange: (value: boolean) => void;
}

export class Toggle extends React.Component<IProps> {
    public render() {
        return (
            <TouchableWithoutFeedback
                disabled={true}
                onPress={this.onClick}
            >
                <View
                    style={[
                        {
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'stretch',
                            marginTop: this.props.marginTop,
                        }
                    ]}
                >
                    <Text
                        style={{
                            color: this.color,
                            fontSize: StyleManager.getFontSize('default', this.props.config),
                            fontWeight: StyleManager.getFontWeight('default', this.props.config),
                            textAlign: StyleManager.getTextAlign('left'),
                            width: 0,
                            flex: 1,
                            flexWrap: StyleManager.getWrap(true),
                            paddingRight: 16,
                        }}
                    >
                        {this.props.title}
                    </Text>
                    <Switch
                        trackColor={{
                            true: this.switchOnColor,
                            false: this.switchOffColor,
                        }}
                        value={this.props.activated}
                        onValueChange={this.onSwitchValueChange}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    private onClick = () => {
        this.onSwitchValueChange(!this.props.activated);
    }

    private onSwitchValueChange = (value: boolean) => {
        if (this.props.onValueChange) {
            this.props.onValueChange(value);
        }
    }

    private get color() {
        return StyleManager.getCheckboxTitleColor(this.props.theme, this.props.config);
    }

    private get switchOffColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, false, this.props.config);
    }

    private get switchOnColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, true, this.props.config);
    }
}
