var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { Media } from '../../Components/Basic/Media';
import { safe } from '../../Components/Shared/Safe';
import { NumberUtils } from '../../Utils/Number';
let MediaView = class MediaView extends React.Component {
    constructor(props) {
        super(props);
        this.onError = (error) => {
            const { model, context } = this.props;
            if (model && context) {
                let handler = context.host.onError;
                if (handler) {
                    handler(`AdaptiveCard >> Image Get Size Failed >> ${model.sources[this.state.current]} >> ${error.error.errorString}`);
                }
            }
        };
        this.onEnd = () => {
            const { model } = this.props;
            if (model && model.sources) {
                if (this.state.current < model.sources.length - 1) {
                    this.setState({
                        current: this.state.current + 1
                    });
                }
                else {
                    this.setState({
                        current: 0,
                        paused: true,
                    });
                }
            }
        };
        this.onLoad = () => {
            const { model, context } = this.props;
            if (model && context) {
                let handler = context.host.onInfo;
                if (handler) {
                    handler(`AdaptiveCard >> Media Load Success >> ${model.sources[this.state.current]}`);
                }
            }
        };
        this.onLoadStart = () => {
            const { model, context } = this.props;
            if (model && context) {
                let handler = context.host.onInfo;
                if (handler) {
                    handler(`AdaptiveCard >> Start Load Media >> ${model.sources[this.state.current]}`);
                }
            }
        };
        this.state = {
            current: this.props.model && this.props.model.sources && this.props.model.sources.length > 0 ? 0 : -1,
            paused: true,
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.model.sources && this.props.model.sources) {
            if (prevProps.model.sources.length !== this.props.model.sources.length) {
                this.setState({
                    current: this.props.model.sources.length > 0 ? 0 : -1,
                    paused: true,
                });
            }
            else {
                if (!prevProps.model.sources.every((current, index) => {
                    let ref = this.props.model.sources[index];
                    return current && ref && current.url === ref.url && current.mimeType === ref.mimeType;
                })) {
                    this.setState({
                        current: this.props.model.sources.length > 0 ? 0 : -1,
                        paused: true,
                    });
                }
            }
        }
        else {
            if (this.props.model.sources) {
                this.setState({
                    current: this.props.model.sources.length > 0 ? 0 : -1,
                    paused: true,
                });
            }
            else {
                this.setState({
                    current: -1,
                    paused: true,
                });
            }
        }
    }
    render() {
        const { model, context } = this.props;
        if (model && model.sources && context && context.config) {
            if (NumberUtils.isInRange(this.state.current, 0, model.sources.length - 1)) {
                let source = model.sources[this.state.current];
                if (source) {
                    return (React.createElement(Media, { url: source.url, mime: source.mimeType, host: context.config.baseUrl, alt: model.altText, onLoadStart: this.onLoadStart, onLoad: this.onLoad, onEnd: this.onEnd, onError: this.onError, resize: 'contain' }));
                }
            }
        }
        return null;
    }
};
MediaView = __decorate([
    safe
], MediaView);
export { MediaView };
