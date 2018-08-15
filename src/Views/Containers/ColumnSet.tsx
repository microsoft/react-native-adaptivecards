import * as React from 'react';
import { View } from 'react-native';
import { Touchable } from '../../Components/Basic/Touchable';
import { ActionContext } from '../../Contexts/ActionContext';
import { ColumnSetElement } from '../../Schema/Containers/ColumnSet';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
import { ColumnView } from './Column';

interface IProps {
    index: number;
    element: ColumnSetElement;
    theme: 'default' | 'emphasis';
}

export class ColumnSetView extends React.Component<IProps> {
    public render() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', 'error');
        }

        if (element.selectAction) {
            return this.renderTouchableBlock();
        } else {
            return this.renderNonTouchableBlock();
        }
    }

    private renderTouchableBlock = () => {
        return (
            <Touchable
                onPress={this.onPress}
                style={{
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    justifyContent: 'flex-start',
                    marginTop: this.spacing,
                }}
            >
                {this.renderContent()}
            </Touchable>
        );
    }

    private renderNonTouchableBlock = () => {
        return (
            <View
                flexDirection='row'
                alignSelf='stretch'
                justifyContent='flex-start'
                marginTop={this.spacing}
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
            return ContentFactory.createBackgroundImageView(this.renderColumns(), background);
        }
        return this.renderColumns();
    }

    private renderColumns = () => {
        const { element } = this.props;

        if (!element || !element.isValid || !element.columns || element.columns.length === 0) {
            return undefined;
        }

        return element.columns.map((column, index) => (
            <ColumnView
                key={index}
                index={index}
                element={column}
                theme={this.props.theme}
            />
        ));
    }

    private onPress = () => {
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
        if (callback) {
            callback();
        }
    }

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
