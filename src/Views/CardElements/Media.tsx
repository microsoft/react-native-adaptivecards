import * as React from 'react';

import { LoadError } from 'react-native-video';
import { Media } from '../../Components/Basic/Media';
import { safe } from '../../Components/Shared/Safe';
import { MediaNode } from '../../Models/Nodes/CardElements/Media';
import { IViewProps } from '../../Shared/Types';
import { NumberUtils } from '../../Utils/Number';

interface IProps extends IViewProps<MediaNode> {
}

interface IState {
    current: number;
    paused: boolean;
}

@safe
export class MediaView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            current: this.props.model && this.props.model.sources && this.props.model.sources.length > 0 ? 0 : -1,
            paused: true,
        };
    }

    public componentDidUpdate(prevProps: IProps) {
        if (prevProps.model.sources && this.props.model.sources) {
            if (prevProps.model.sources.length !== this.props.model.sources.length) {
                this.setState({
                    current: this.props.model.sources.length > 0 ? 0 : -1,
                    paused: true,
                });
            } else {
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
        } else {
            if (this.props.model.sources) {
                this.setState({
                    current: this.props.model.sources.length > 0 ? 0 : -1,
                    paused: true,
                });
            } else {
                this.setState({
                    current: -1,
                    paused: true,
                });
            }
        }
    }

    public render() {
        const { model, context } = this.props;
        if (model && model.sources && context && context.config) {
            if (NumberUtils.isInRange(this.state.current, 0, model.sources.length - 1)) {
                let source = model.sources[this.state.current];
                if (source) {
                    return (
                        <Media
                            url={source.url}
                            mime={source.mimeType}
                            host={context.config.baseUrl}
                            alt={model.altText}
                            onLoadStart={this.onLoadStart}
                            onLoad={this.onLoad}
                            onEnd={this.onEnd}
                            onError={this.onError}
                            resize='contain'
                        />
                    );
                }
            }
        }
        return null;
    }

    private onError = (error: LoadError) => {
        const { model, context } = this.props;

        if (model && context) {
            let handler = context.host.onError;
            if (handler) {
                handler(`AdaptiveCard >> Image Get Size Failed >> ${model.sources[this.state.current]} >> ${error.error.errorString}`);
            }
        }
    }

    private onEnd = () => {
        const { model } = this.props;
        if (model && model.sources) {
            if (this.state.current < model.sources.length - 1) {
                this.setState({
                    current: this.state.current + 1
                });
            } else {
                this.setState({
                    current: 0,
                    paused: true,
                });
            }
        }
    }

    private onLoad = () => {
        const { model, context } = this.props;

        if (model && context) {
            let handler = context.host.onInfo;
            if (handler) {
                handler(`AdaptiveCard >> Media Load Success >> ${model.sources[this.state.current]}`);
            }
        }
    }

    private onLoadStart = () => {
        const { model, context } = this.props;

        if (model && context) {
            let handler = context.host.onInfo;
            if (handler) {
                handler(`AdaptiveCard >> Start Load Media >> ${model.sources[this.state.current]}`);
            }
        }
    }
}
