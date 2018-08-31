import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../Button/index'
import { setMode } from '../../actions/cardActions';
import './Header.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(mode) {
        this.props.setMode(mode);
    }

    render() {
        return (
            <div className="header">
                <Button desc="Card editor" name="card" clickHandler={this.handleClick} />
                <Button desc="Config editor" name="config" clickHandler={this.handleClick} />
            </div>
        )
    }
}

Header.propTypes = {
    setMode: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        mode: state.card.mode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setMode: (mode) => dispatch(setMode(mode))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);