import * as React from 'react';
import { ImageBackground } from '../../Components/Basic/ImageBackground';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class BackgroundImageView extends React.Component {
    constructor() {
        super(...arguments);
        this.onImageLoad = (data) => {
            const { model } = this.props;
            if (model && model.context) {
                let handler = model.context.infoHandler;
                if (handler) {
                    handler(`AdaptiveCard >> Image Load Success >> ${model.url}`);
                }
            }
        };
        this.onError = (error) => {
            const { model } = this.props;
            if (model && model.context) {
                let handler = model.context.errorHandler;
                if (handler) {
                    handler(error);
                }
            }
        };
    }
    componentDidMount() {
        const { model, } = this.props;
        if (model) {
            if (model.context) {
                let handler = model.context.infoHandler;
                if (handler) {
                    handler(`AdaptiveCard >> Start load background img >> ${model.url}`);
                }
            }
        }
    }
    render() {
        const { model, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.url + ' is not valid', theme, 'error');
        }
        return (React.createElement(ImageBackground, { url: model.url, flex: 1, resizeMode: model.mode, onLoad: this.onImageLoad, onError: this.onError }, this.props.children));
    }
}
