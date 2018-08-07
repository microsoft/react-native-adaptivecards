import * as React from 'react';
import { Image } from 'react-native';
export class ImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            width: 0,
            height: 0
        };
    }
    componentWillMount() {
        Image.getSize(this.props.url, (width, height) => {
            this.setState({
                width: width,
                height: height,
            });
        }, (err) => {
            console.log(err);
        });
    }
    render() {
        return (React.createElement(Image, { source: { uri: this.props.url }, style: {
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }, resizeMethod: 'resize', resizeMode: 'contain' }));
    }
}
