import * as React from 'react';
import { ImageBlock } from '../../Components/Basic/ImageBlock';
import { ActionContext } from '../../Contexts/ActionContext';
import { HostConfigManager } from '../../Styles/HostConfig';
import { StyleManager } from '../../Styles/StyleManager';
export class ImageView extends React.Component {
    constructor(props) {
        super(props);
        this.getBorderRadius = () => {
            const { element } = this.props;
            if (element && element.isValid() && element.style === 'person') {
                return {
                    borderRadius: this.state.width / 2,
                };
            }
            return {};
        };
        this.onImageSize = (width, height) => {
            this.setState({
                width: width,
                height: height
            }, () => {
                const { element } = this.props;
                if (element && element.isValid()) {
                    if (this.props.onImageSize) {
                        this.props.onImageSize(width, height, element.url);
                    }
                }
            });
        };
        this.onPress = () => {
            console.log('ImageView pressed');
            let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
            if (callback) {
                callback();
            }
        };
        const { element } = this.props;
        if (element && element.isValid()) {
            this.styleConfig = StyleManager.getInstance().getStyle(element);
            if (this.props.size) {
                this.styleConfig.imgSize = HostConfigManager.getInstance().getImgSize(this.props.size);
            }
            this.state = {
                width: 0,
                height: 0,
            };
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(ImageBlock, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, relativeWidth: false, url: element.url, alt: element.altText, flexDirection: 'row', alignSelf: this.styleConfig.alignSelf, alignItems: this.styleConfig.alignSelf, alignContent: 'center', justifyContent: 'center', width: this.styleConfig.imgSize, vSpace: this.styleConfig.spacing || this.props.vSpace, hSpace: this.props.hSpace, containerWidth: this.props.containerWidth, containerHeight: this.props.containerHeight, maxWidth: this.props.maxWidth, maxHeight: this.props.maxHeight, fitAxis: this.props.fitAxis, imgStyle: this.getBorderRadius(), onPress: element.selectAction ? this.onPress : undefined, onImageSize: this.onImageSize }));
    }
}
