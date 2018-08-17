import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { ImageBlock } from '../../Components/Basic/ImageBlock';
import { ActionContext } from '../../Contexts/ActionContext';
import { ImageElement } from '../../Schema/CardElements/Image';
import { Dimension } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageUtils } from '../../Utils/ImageUtils';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    element: ImageElement;
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
        const { element, size, maxWidth, maxHeight } = this.props;

        if (element && element.isValid) {
            ImageUtils.fetchSize(
                element.url, 
                size || element.size, 
                { width: maxWidth, height: maxHeight }, 
                this.onImageSize, 
                this.onImageSizeError
            );
        }
    }

    public render() {
        const { element, spacing, theme } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.url + ' is not valid', theme, 'error');
        }

        if (this.state.loaded) {
            return (
                <ImageBlock
                    url={element.url}
                    alt={element.altText}
                    flex={this.flex}
                    alignSelf={StyleManager.getHorizontalAlign(element.horizontalAlignment)}
                    width={this.state.width}
                    height={this.state.height}
                    onPress={element.selectAction ? this.onPress : undefined}
                    onLayout={this.onLayout}
                    marginTop={this.spacing}
                    marginLeft={spacing}
                    mode={element.style === 'person' ? 'avatar' : 'default'}
                />
            );
        }
        return null;
    }

    private onPress = () => {
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
        if (callback) {
            callback();
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
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }

    private get flex() {
        const { element, size } = this.props;

        if (!element || !element.isValid) {
            return undefined;
        }

        let finalSize = StyleManager.getImageSize(size || element.size);
        if (finalSize === 'stretch') {
            return 1;
        }
        return 0;
    }
}
