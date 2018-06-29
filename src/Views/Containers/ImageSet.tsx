import * as React from 'react';
import { ScrollView } from 'react-native';
import { Row } from '../../Components/Containers/Row';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ImageSetElement> {
    containerWidth?: number;
    containerHeight?: number;
}

interface IState {
    maxWidth: number;
    maxHeight: number;
}

export class ImageSetView extends React.Component<IProps, IState> {
    private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        const { element } = this.props;
        if (element && element.isValid()) {
            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }

        this.state = {
            maxWidth: undefined,
            maxHeight: undefined,
        };
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <ScrollView
                flex={1}
                horizontal={true}
                minHeight={this.state.maxHeight}
            >
                <Row
                    vIndex={0}
                    hIndex={0}
                    spacing={this.styleConfig.spacing}
                    wrap='nowrap'
                >
                    {this.renderImages()}
                </Row>
            </ScrollView>
        );
    }

    private renderImages = () => {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return undefined;
        }

        return element.images.map((img, index) => (
            <ImageView
                key={index}
                vIndex={1}
                hIndex={index}
                element={img}
                size={element.imageSize}
                maxWidth={this.state.maxWidth}
                maxHeight={this.state.maxHeight}
                onImageSize={this.onImageSize}
                hSpace={10}
            />
        ));
    }

    private onImageSize = (width: number, height: number, url: string) => {
        console.log(`ImageSet adjust height: ${height}`);
        let maxWidth = width;
        let maxHeight = height;
        let ratio = width > 0 ? height / width : height;
        if (maxWidth > this.props.containerWidth) {
            maxWidth = this.props.containerWidth;
        }
        maxHeight = maxWidth * ratio;
        if (this.state.maxHeight !== undefined && this.state.maxHeight !== 0 && maxHeight > this.state.maxHeight) {
            maxHeight = this.state.maxHeight;
        }
        this.setState({
            maxHeight: maxHeight
        });
    }
}
