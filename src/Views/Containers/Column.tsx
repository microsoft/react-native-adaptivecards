import * as React from 'react';
import { View } from 'react-native';
import { Touchable } from '../../Components/Basic/Touchable';
import { ActionContext } from '../../Contexts/ActionContext';
import { ColumnElement } from '../../Schema/Containers/Column';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    element: ColumnElement;
    theme: 'default' | 'emphasis';
}

export class ColumnView extends React.Component<IProps> {
    public render() {
        const { element, theme } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
        }

        let backgroundColor = StyleManager.getBackgroundColor(element.style);

        if (element.selectAction) {
            return this.renderTouchableBlock(backgroundColor);
        } else {
            return this.renderNonTouchableBlock(backgroundColor);
        }
    }

    private renderTouchableBlock = (backgroundColor: string) => {
        return (
            <Touchable
                onPress={this.onPress}
                style={{
                    flex: this.flex,
                    flexDirection: 'column',
                    alignSelf: this.alignSelf,
                    justifyContent: this.justifyContent,
                    marginLeft: this.spacing,
                    backgroundColor: backgroundColor,
                }}
            >
                {this.renderContent()}
            </Touchable>
        );
    }

    private renderNonTouchableBlock = (backgroundColor: string) => {
        return (
            <View
                flex={this.flex}
                flexDirection='column'
                alignSelf={this.alignSelf}
                justifyContent={this.justifyContent}
                marginLeft={this.spacing}
                backgroundColor={backgroundColor}
            >
                {this.renderContent()}
            </View>
        );
    }

    private renderContent = () => {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return undefined;
        }

        const background = element.getBackgroundImageUrl();

        if (background) {
            return ContentFactory.createBackgroundImageView(this.renderItems(), background);
        }
        return this.renderItems();
    }

    private renderItems = () => {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return undefined;
        }

        if (element.items) {
            return element.items.map((content, index) => ContentFactory.createView(content, index, element.style || this.props.theme));
        }
        return undefined;
    }

    private onPress = () => {
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
        if (callback) {
            callback();
        }
    }

    private get justifyContent() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return 'flex-start';
        }
        switch (element.verticalContentAlignment) {
            case 'top':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'bottom':
                return 'flex-end';
            default:
                return 'center';
        }
    }

    private get alignSelf() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return 'flex-start';
        }
        if (element.height === 'stretch') {
            return 'stretch';
        }
        return 'flex-start';
    }

    private get flex() {
        const { element } = this.props;

        if (!element || !element.isValid || element.width === 'auto') {
            return 0;
        }
        if (element.width === undefined || element.width === 'stretch') {
            return 1;
        }
        return element.width;
    }

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
