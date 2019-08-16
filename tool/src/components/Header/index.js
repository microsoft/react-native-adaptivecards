import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../Button/index'
import { setMode, loadDefaultPayload } from '../../actions/cardActions';
import './Header.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.setMode = this.setMode.bind(this);
        this.loadDefaultPayload = this.loadDefaultPayload.bind(this);
    }

    setMode(mode) {
        this.props.setMode(mode);
    }

    loadDefaultPayload() {
        this.props.loadDefaultPayload();
    }

    openGitHUb() {
        window.open("https://github.com/microsoft/react-native-adaptivecards/", "_blank");
    }

    render() {
        return (
            <div className="header">
                <Button desc="Card editor" name="card" clickHandler={this.setMode} />
                <Button desc="Config editor" name="config" clickHandler={this.setMode} />
                <Button desc="GitHub" name="GitHub" clickHandler={this.openGitHUb}
                    additionalClass="fr" />
                <Button desc="Load default" name="load_default" clickHandler={this.loadDefaultPayload}
                    additionalClass="fr" />
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
        setMode: (mode) => dispatch(setMode(mode)),
        loadDefaultPayload: () => dispatch(loadDefaultPayload())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);