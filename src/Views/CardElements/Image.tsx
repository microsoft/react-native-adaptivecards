import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { ImageBlock } from '../../Components/Basic/ImageBlock';
import { ImageModel } from '../../Models/CardElements/Image';
import { Dimension } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageUtils } from '../../Utils/ImageUtils';

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
    constructor(props: IProps) {
        super(props);

        this.state = {
            loaded: false,
            width: 0,
            height: 0,
        };
    }

    public componentDidMount() {
        const { model, size, maxWidth, maxHeight } = this.props;

        if (model) {
            ImageUtils.fetchSize(
                model.url,
                size || model.size,
                { width: maxWidth, height: maxHeight },
                this.onImageSize,
                this.onImageSizeError
            );
        }
    }

    public render() {
        const { model, spacing } = this.props;

        // if (!model || !model.isValid) {
        //     return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.url + ' is not valid', theme, 'error');
        // }

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

    private onImageSizeError = (error: any) => {
        console.log(error);
        this.setState({
            loaded: false,
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

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
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
}
