import * as React from 'react';

import { ImageBlock } from '../../Abandon/Components/Basic/ImageBlock';
import { ActionContext } from '../../Contexts/ActionContext';
import { ImageElement } from '../../Schema/CardElements/Image';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageStyle } from '../../Styles/Types';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ImageElement> {
    size?: 'auto' | 'stretch' | 'small' | 'medium' | 'large';
    containerWidth?: number;
    containerHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    fitAxis?: 'h' | 'v';
    vSpacing?: number;
    hSpacing?: number;
    onImageSize?: (width: number, height: number, url: string) => void;
}

interface IState {
    width: number;
    height: number;
}

export class ImageView extends React.Component<IProps, IState> {
    private style: ImageStyle;

    constructor(props: IProps) {
        super(props);

        const { element } = this.props;
        if (element && element.isValid) {
            this.style = StyleManager.getInstance().getImageStyle(element);

            if (this.props.size) {
                // Override the element's size if the size is set by parent.
                this.style.size = StyleManager.getInstance().getImageSize(element.size);
                if (this.style.size === 'stretch') {
                    this.style.align = 'stretch';
                }
            }

            this.state = {
                width: 0,
                height: 0,
            };
        }
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return null;
        }

        return (
            <ImageBlock
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                relativeWidth={false}
                url={element.url}
                alt={element.altText}
                flexDirection='column'
                alignSelf={this.style.align}
                alignItems={this.style.align}
                alignContent='center'
                justifyContent='center'
                size={this.style.size}
                vSpacing={this.style.spacing || this.props.vSpacing}
                hSpacing={this.props.hSpacing}
                containerWidth={this.props.containerWidth}
                containerHeight={this.props.containerHeight}
                maxWidth={this.props.maxWidth}
                maxHeight={this.props.maxHeight}
                fitAxis={this.props.fitAxis}
                imgStyle={this.borderRadius}
                onPress={element.selectAction ? this.onPress : undefined}
                onImageSize={this.onImageSize}
            />
        );
    }

    private get borderRadius() {
        const { element } = this.props;

        if (element && element.isValid && element.style === 'person') {
            return {
                borderRadius: this.state.width / 2,
            };
        }
        return {};
    }

    private onImageSize = (width: number, height: number) => {
        this.setState({
            width: width,
            height: height
        }, () => {
            const { element } = this.props;
            if (element && element.isValid) {
                if (this.props.onImageSize) {
                    this.props.onImageSize(width, height, element.url);
                }
            }
        });
    }

    private onPress = () => {
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
        if (callback) {
            callback();
        }
    }
}
