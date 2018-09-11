import * as React from 'react';
import { ImageBackground } from '../../Components/Basic/ImageBackground';
import { BackgroundImageModel } from '../../Models/CardElements/BackgroundImage';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    model: BackgroundImageModel;
    theme: 'emphasis' | 'default';
}

export class BackgroundImageView extends React.Component<IProps> {

    public componentDidMount() {
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

    public render() {
        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.url + ' is not valid', theme, 'error');
        }

        return (
            <ImageBackground
                url={model.url}
                flex={1}
                resizeMode={model.mode}
                onLoad={this.onImageLoad}
                onError={this.onError}
            >
                {this.props.children}
            </ImageBackground>
        );
    }

    private onImageLoad = (data: any) => {
        const { model } = this.props;
        if (model && model.context) {
            let handler = model.context.infoHandler;
            if (handler) {
                handler(`AdaptiveCard >> Image Load Success >> ${model.url}`);
            }
        }
    }

    private onError = (error: any) => {
        const { model } = this.props;
        if (model && model.context) {
            let handler = model.context.errorHandler;
            if (handler) {
                handler(`AdaptiveCard >> Image Load Failed >> ${error.message}`);
            }
        }
    }
}
