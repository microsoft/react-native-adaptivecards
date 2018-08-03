import * as React from 'react';
import { ImageBlock } from '../../Abandon/Components/Basic/ImageBlock';
import { ActionContext } from '../../Contexts/ActionContext';
import { StyleManager } from '../../Styles/StyleManager';
export class ImageView extends React.Component {
    constructor(props) {
        super(props);
        this.onImageSize = (width, height) => {
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
        };
        this.onPress = () => {
            let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
            if (callback) {
                callback();
            }
        };
        const { element } = this.props;
        if (element && element.isValid) {
            this.style = StyleManager.getInstance().getImageStyle(element);
            if (this.props.size) {
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
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        return (React.createElement(ImageBlock, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, relativeWidth: false, url: element.url, alt: element.altText, flexDirection: 'column', alignSelf: this.style.align, alignItems: this.style.align, alignContent: 'center', justifyContent: 'center', size: this.style.size, vSpacing: this.style.spacing || this.props.vSpacing, hSpacing: this.props.hSpacing, containerWidth: this.props.containerWidth, containerHeight: this.props.containerHeight, maxWidth: this.props.maxWidth, maxHeight: this.props.maxHeight, fitAxis: this.props.fitAxis, imgStyle: this.borderRadius, source: this.source, mode: this.mode, onPress: element.selectAction ? this.onPress : undefined, onImageSize: this.onImageSize }));
    }
    get mode() {
        const { element } = this.props;
        if (element && element.isValid && element.url.endsWith('avatar')) {
            return 'avatar';
        }
        else {
            return 'default';
        }
    }
    get source() {
        const { element } = this.props;
        if (element && element.isValid && element.url.startsWith('device://')) {
            return 'internal';
        }
        else {
            return 'external';
        }
    }
    get borderRadius() {
        const { element } = this.props;
        if (element && element.isValid && element.style === 'person') {
            return {
                borderRadius: this.state.width / 2,
            };
        }
        return {};
    }
}
