import * as React from 'react';
import { Background } from '../../Components/Basic/Background';
import { BackgroundImageProp } from '../../Models/Props/Elements/BackgroundImageProp';
import { IViewProps } from '../../Shared/Types';

interface IProps extends IViewProps<BackgroundImageProp> {
}

export class BackgroundImageView extends React.Component<IProps> {

    public componentDidMount() {
        const { model, context } = this.props;

        if (model) {
            if (context) {
                let handler = context.host.onInfo;
                if (handler) {
                    handler(`AdaptiveCard >> Start load background img >> ${model.url}`);
                }
            }
        }
    }

    public render() {
        const { model, context } = this.props;

        return (
            <Background
                url={model.url}
                host={context.config.baseUrl}
                flex={1}
                resizeMode={model.mode}
                onLoad={this.onImageLoad}
                onError={this.onError}
            >
                {this.props.children}
            </Background>
        );
    }

    private onImageLoad = (data: any) => {
        const { model, context } = this.props;
        if (model && context) {
            let handler = context.host.onInfo;
            if (handler) {
                handler(`AdaptiveCard >> Image Load Success >> ${model.url}`);
            }
        }
    }

    private onError = (error: any) => {
        const { model, context } = this.props;
        if (model && context) {
            let handler = context.host.onError;
            if (handler) {
                handler(`AdaptiveCard >> Image Load Failed >> ${error.message}`);
            }
        }
    }
}
