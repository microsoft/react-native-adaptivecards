import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { ImageBlock } from '../../Components/Basic/ImageBlock';
import { ImageModel } from '../../Models/CardElements/Image';
import { Dimension } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageUtils } from '../../Utils/ImageUtils';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    model: ImageModel;
    size?: 'auto' | 'stretch' | 'small' | 'medium' | 'large';
    spacing?: number;
    maxWidth?: number;
    maxHeight?: number;
    theme: 'emphasis' | 'default';
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

        setTimeout(this.fetchImageSize, 500);
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
        const { model, spacing, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.url + ' is not valid', theme, 'error');
        }

        if (this.state.loaded) {
            return (
                <ImageBlock
                    url={model.url}
                    alt={model.alt}
                    flex={this.flex}
                    alignSelf={StyleManager.getHorizontalAlign(model.horizontalAlignment)}
                    width={this.state.width}
                    height={this.state.height}
                    onPress={model.selectAction ? this.onPress : undefined}
                    onLayout={this.onLayout}
                    onLoad={this.onImageLoad}
                    onError={this.onImageError}
                    marginTop={this.spacing}
                    marginLeft={spacing}
                    mode={model.style === 'person' ? 'avatar' : 'default'}
                />
            );
        }
        return null;
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
        const { model } = this.props;
        if (model && model.context) {
            let handler = model.context.infoHandler;
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
            const { model } = this.props;
            if (model && model.context) {
                let handler = model.context.errorHandler;
                if (handler) {
                    handler(`AdaptiveCard >> Image Load Failed >> ${error.message}`);
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
            });
        }
    }

    private fetchImageSize = () => {
        const { model, size, maxWidth, maxHeight } = this.props;

        if (model) {
            if (model.context) {
                let handler = model.context.infoHandler;
                if (handler) {
                    handler(`AdaptiveCard >> Start load img >> ${model.url}`);
                }
            }

            ImageUtils.fetchSize(
                model.url,
                size || model.size,
                { width: maxWidth, height: maxHeight },
                this.onImageSize,
                this.onImageSizeError
            );
        }
    }

    private get flex() {
        const { model, size } = this.props;

        if (!model) {
            return undefined;
        }

        let finalSize = StyleManager.getImageSize(size || model.size);
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
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
