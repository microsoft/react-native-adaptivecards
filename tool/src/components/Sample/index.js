import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

 import RightArrowIcon from '../../static/icons/right-arrow.svg';
import './Sample.css';

class Sample extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.clickHandler(this.props.id, e.target.checked);
    }

    render() {
        const iconClassName = 'right-arrow-icon' + (this.props.mode === 'card' && this.props.cardId === this.props.id ? ' active' : '');
        return (
          <div className="sample">
              <input id={this.props.id} name="sample-name" type="checkbox" onChange={this.handleChange.bind(this)} checked={this.props.selected}/>
              <label htmlFor={this.props.id}>{this.props.name}<RightArrowIcon className={iconClassName} /></label>
          </div>
        );
    }
}

Sample.propTypes = {
    id: PropTypes.string.required,
    name: PropTypes.string.required,
    selected: PropTypes.bool.required,
    mode: PropTypes.string.required,
    cardId: PropTypes.string.required,
    clickHandler: PropTypes.func.required
};

const mapStateToProps = (state) => {
     return {
         mode: state.card.mode,
         cardId: state.card.cardId
     };
};

export default connect(mapStateToProps)(Sample);