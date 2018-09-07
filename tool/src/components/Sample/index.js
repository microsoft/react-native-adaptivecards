import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RightArrowIcon from '../../static/icons/right-arrow.svg';
import RemoveIcon from '../../static/icons/remove.svg'
import './Sample.css';


class Sample extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            removable: false
        }
    }

    handleChange(e) {
        this.props.clickHandler(this.props.id, e.target.checked);
    }

    handleMouseOver() {
        this.setState({
            removable: true
        })
    }

    handleMouseOut() {
        this.setState({
            removable: false
        })
    }

    handleRemove() {
        this.props.removeHandler(this.props.id);
    }

    render() {
        const rightArrowIconClass = 'right-arrow-icon' + (this.props.mode === 'card' && this.props.cardId === this.props.id ? ' active' : '');
        const removeIconClass = 'remove-icon' + (this.state.removable ? ' show' : '');
        return (
            <div className="sample" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                <input id={this.props.id} name="sample-name" type="checkbox" onChange={this.handleChange.bind(this)} checked={this.props.selected}/>
                <label htmlFor={this.props.id}><RemoveIcon className={removeIconClass} onClick={this.handleRemove}/>{this.props.name}<RightArrowIcon className={rightArrowIconClass} /></label>
            </div>
        )
    }
}

Sample.propTypes = {
    id: PropTypes.string.required,
    name: PropTypes.string.required,
    selected: PropTypes.bool.required,
    mode: PropTypes.string.required,
    cardId: PropTypes.string.required,
    clickHandler: PropTypes.func.required,
    removeHandler: PropTypes.func.required,
};

const mapStateToProps = (state) => {
     return {
         mode: state.card.mode,
         cardId: state.card.cardId
     };
};

export default connect(mapStateToProps)(Sample);