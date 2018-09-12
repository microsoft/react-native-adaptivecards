import * as React from 'react';
import { View } from 'react-native';
import { Touchable } from '../../Components/Basic/Touchable';
import { ColumnModel } from '../../Models/Containers/Column';
import { ActionType } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { BackgroundImageView } from '../CardElements/BackgroundImage';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    model: ColumnModel;
    theme: 'default' | 'emphasis';
}

export class ColumnView extends React.Component<IProps> {
    public render() {
        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }

        let backgroundColor = StyleManager.getBackgroundColor(model.style);

        if (model.selectAction) {
            return this.renderTouchableBlock(backgroundColor);
        } else {
            return this.renderNonTouchableBlock(backgroundColor);
        }
    }

    private renderTouchableBlock = (backgroundColor: string) => {
        return (
            <Touchable
                onPress={this.onPress}
                oneTime={this.hasOneTimeAction}
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
                style={{
                    flex: this.flex,
                    flexDirection: 'column',
                    alignSelf: this.alignSelf,
                    justifyContent: this.justifyContent,
                    marginLeft: this.spacing,
                    backgroundColor: backgroundColor
                }}
            >
                {this.renderContent()}
            </View>
        );
    }

    private renderContent = () => {
        const { model, theme } = this.props;

        if (!model) {
            return undefined;
        }

        const background = model.backgroundImage;

        if (background && background.url) {
            return (
                <BackgroundImageView
                    model={background}
                    theme={theme}
                >
                    {this.renderItems()}
                </BackgroundImageView>
            );
        }
        return this.renderItems();
    }

    private renderItems = () => {
        const { model } = this.props;

        if (!model) {
            return undefined;
        }

        if (model.items) {
            return model.items.map((content, index) => ContentFactory.createView(content, index, model.style || this.props.theme));
        }
        return undefined;
    }

    private onPress = () => {
        const { model } = this.props;

        if (model && model.selectAction && model.selectAction.onAction) {
            model.selectAction.onAction(
                () => {
                    console.log('Action Success');
                },
                (error) => {
                    console.log('Action Failed >> ', error);
                }
            );
        }
    }

    private get hasOneTimeAction() {
        return this.props.model.selectAction && this.props.model.selectAction.type === ActionType.Submit;
    }

    private get justifyContent() {
        const { model } = this.props;

        if (!model) {
            return 'flex-start';
        }
        switch (model.verticalContentAlignment) {
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
        const { model } = this.props;

        if (!model) {
            return 'flex-start';
        }
        if (model.height === 'stretch') {
            return 'stretch';
        }
        return 'flex-start';
    }

    private get flex() {
        const { model } = this.props;

        if (!model || model.width === 'auto') {
            return 0;
        }
        if (model.width === undefined || model.width === 'stretch') {
            return 1;
        }
        return model.width;
    }

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
