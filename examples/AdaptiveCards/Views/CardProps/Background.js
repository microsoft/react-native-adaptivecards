import * as React from 'react';
import { Background } from '../../Components/Basic/Background';
export class BackgroundImageView extends React.Component {
    constructor() {
        super(...arguments);
        this.onImageLoad = (data) => {
            const { model, context } = this.props;
            if (model && context) {
                let handler = context.host.onInfo;
                if (handler) {
                    handler(`AdaptiveCard >> Image Load Success >> ${model.url}`);
                }
            }
        };
        this.onError = (error) => {
            const { model, context } = this.props;
            if (model && context) {
                let handler = context.host.onError;
                if (handler) {
                    handler(`AdaptiveCard >> Image Load Failed >> ${error.message}`);
                }
            }
        };
    }
    componentDidMount() {
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
    render() {
        const { model, context } = this.props;
        return (React.createElement(Background, { url: model.url, host: context.config.baseUrl, flex: 1, resizeMode: model.mode, onLoad: this.onImageLoad, onError: this.onError }, this.props.children));
    }
}
