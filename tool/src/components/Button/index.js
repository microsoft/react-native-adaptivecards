import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './button.css'
class Button extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.clickHandler(this.props.name);
    }

    render() {
        const className = 'button' + (this.props.name === this.props.mode ? ' active' : '');
        return (
            <div className={className} onClick={this.handleClick} >{this.props.desc}</div>
        )
    }
}

Button.propTypes = {
    desc: PropTypes.string,
    name: PropTypes.string,
    mode: PropTypes.string,
    clickHandler: PropTypes.func,
};

Button.defaultProps = {
    desc: 'button'
};

const mapStateToProps = (state) => {
    return {
        mode: state.card.mode
    };
};

export default connect(mapStateToProps)(Button);