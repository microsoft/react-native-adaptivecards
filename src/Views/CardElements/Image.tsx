import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';

import { Image } from '../../Components/Basic/Image';
import { ImageNode } from '../../Models/Nodes/CardElements/Image';
import { Dimension, IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageUtils } from '../../Utils/Image';
import { SelectActionView } from '../CardProps/SelectAction';

interface IProps extends IViewProps<ImageNode> {
    size?: 'auto' | 'stretch' | 'small' | 'medium' | 'large';
    spacing?: number;
    maxWidth?: number;
    maxHeight?: number;
}

interface IState {
    loaded: boolean;
    width: number;
    height: number;
}

export class ImageView extends React.Component<IProps, IState> {
    private mounted: boolean;

    constructor(props: IProps) {
        super(props);

        this.state = {
            loaded: false,
            width: 0,
            height: 0,
        };
    }

    public componentDidMount() {
        this.mounted = true;

        this.fetchImageSize();
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    // tslint:disable-next-line:max-line-length
    public setState<K extends keyof IState>(state: ((prevState: Readonly<IState>, props: Readonly<IProps>) => (Pick<IState, K> | IState | null)) | (Pick<IState, K> | IState | null), callback?: () => void) {
        if (this.mounted) {
            super.setState(state, callback);
        }
    }

    public render() {
        const { model, context, spacing, theme } = this.props;

        if (this.state.loaded) {
            return (
                <SelectActionView
                    index={0}
                    theme={theme}
                    model={model.selectAction}
                    context={context}
                    
                    onLayout={this.onLayout}
                    style={{
                        flex: this.flex,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: StyleManager.getHorizontalAlign(model.horizontalAlignment),
                        marginTop: this.spacing,
                        marginLeft: spacing,
                    }}
                >
                    <Image
                        url={model.url}
                        host={context.config.baseUrl}
                        alt={model.alt}
                        width={this.state.width}
                        height={this.state.height}
                        onLoad={this.onImageLoad}
                        onError={this.onImageError}
                        mode={model.style === 'person' ? 'avatar' : 'default'}
                    />
                </SelectActionView>
            );
        }
        return null;
    }

    private onLayout = (event: LayoutChangeEvent) => {
        let ratio = this.state.width > 0 && this.state.height > 0 ? this.state.width / this.state.height : 1;
        let width = event.nativeEvent.layout.width;
        if (width !== 0 && width !== this.state.width) {
            this.setState({
                width: width,
                height: width / ratio
            });
        }
    }

    private onImageLoad = () => {
        const { model, context } = this.props;
        if (model && context) {
            let handler = context.host.onInfo;
            if (handler) {
                handler(`AdaptiveCard >> Image Load Success >> ${model.url}`);
            }
        }
    }

    private onImageError = (error: any) => {
        this.handleError(error);
    }

    private onImageSizeError = (error: any) => {
        this.handleError(error);
    }

    private handleError = (error: any) => {
        this.setState({
            loaded: false,
        }, () => {
            const { model, context } = this.props;
            if (model && context) {
                let handler = context.host.onError;
                if (handler) {
                    handler(`AdaptiveCard >> Image Get Size Failed >> ${model.url} >> ${error.message}`);
                }
            }
        });
    }

    private onImageSize = (size: Dimension) => {
        if (size) {
            this.setState({
                loaded: true,
                width: size.width,
                height: size.height,
            }, () => {
                const { model, context } = this.props;
                if (model && context) {
                    let handler = context.host.onInfo;
                    if (handler) {
                        handler(`AdaptiveCard >> Image Get Size Success >> ${model.url}`);
                    }
                }
            });
        }
    }

    private fetchImageSize = () => {
        const { model, context, size, maxWidth, maxHeight } = this.props;

        if (model) {
            if (context) {
                let handler = context.host.onInfo;
                if (handler) {
                    handler(`AdaptiveCard >> Start Load Image >> ${model.url}`);
                }
            }

            ImageUtils.fetchSize(
                model.url,
                size || model.size,
                { width: maxWidth, height: maxHeight },
                context.config,
                this.onImageSize,
                this.onImageSizeError
            );
        }
    }

    private get flex() {
        const { model, size, context } = this.props;

        if (!model) {
            return undefined;
        }

        let finalSize = StyleManager.getImageSize(size || model.size, context.config);
        if (finalSize === 'stretch') {
            return 1;
        }
        return 0;
    }

    private get spacing() {
        if (this.props.model.separator) {
            return 0;
        }

        if (this.props.index !== undefined && this.props.index > 0) {

            return StyleManager.getSpacing(this.props.model.spacing, this.context.config);
        }
        return 0;
    }
}
