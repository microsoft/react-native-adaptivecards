import * as React from 'react';

import { ImageBlock } from '../../Components/Basic/ImageBlock';
import { ActionContext } from '../../Contexts/ActionContext';
import { ImageElement } from '../../Schema/CardElements/Image';
import { HostConfigManager } from '../../Styles/HostConfig';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ImageElement> {
    size?: 'auto' | 'stretch' | 'small' | 'medium' | 'large';
    containerWidth?: number;
    containerHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    fitAxis?: 'h' | 'v';
    vSpace?: number;
    hSpace?: number;
    onImageSize?: (width: number, height: number, url: string) => void;
}

interface IState {
    width: number;
    height: number;
}

export class ImageView extends React.Component<IProps, IState> {
    private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        const { element } = this.props;
        if (element && element.isValid()) {
            this.styleConfig = StyleManager.getInstance().getStyle(element);

            if (this.props.size) {
                // Override the element's size if the size is set by parent.
                this.styleConfig.imgSize = HostConfigManager.getInstance().getImgSize(this.props.size);
            }

            this.state = {
                width: 0,
                height: 0,
            };
        }
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <ImageBlock
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                relativeWidth={false}
                url={element.url}
                alt={element.altText}
                flexDirection='row'
                alignSelf={this.styleConfig.alignSelf}
                alignItems={this.styleConfig.alignSelf}
                alignContent='center'
                justifyContent='center'
                width={this.styleConfig.imgSize}
                vSpace={this.styleConfig.spacing || this.props.vSpace}
                hSpace={this.props.hSpace}
                containerWidth={this.props.containerWidth}
                containerHeight={this.props.containerHeight}
                maxWidth={this.props.maxWidth}
                maxHeight={this.props.maxHeight}
                fitAxis={this.props.fitAxis}
                imgStyle={this.getBorderRadius()}
                onPress={element.selectAction ? this.onPress : undefined}
                onImageSize={this.onImageSize}
            />
        );
    }

    private getBorderRadius = () => {
        const { element } = this.props;

        if (element && element.isValid() && element.style === 'person') {
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
            console.log(`ImageView onImageSize width: ${width} height: ${height}`);
            const { element } = this.props;

            if (element && element.isValid()) {
                if (this.props.onImageSize) {
                    this.props.onImageSize(width, height, element.url);
                }
            }
        });
    }

    private onPress = () => {
        console.log('ImageView pressed');
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
        if (callback) {
            callback();
        }
    }
}
