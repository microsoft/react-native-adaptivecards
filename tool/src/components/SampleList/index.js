import React from 'react'
import { connect } from 'react-redux'
import {Scrollbars} from "react-custom-scrollbars";

import Sample from '../Sample/index'
import './SampleList.css'
import { setMode, setCardSelected, modifyCard, addCard, removeCard } from '../../actions/cardActions'


class SampleList extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleAddEnter = this.handleAddEnter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleClick(id, checked) {
        // mark selected status
        this.props.setCardSelected(id, checked);
        // change editor mode
        this.props.setMode('card');
        // change editor text
        this.props.modifyCard(id, this.props.cards.find(x => x.id === id).card);
    }

    handleRemove(id) {
        this.props.removeCard(id);
    }

    handleAddEnter(e) {
        if (e.key === 'Enter') {
            this.props.addCard(e.target.value);
            e.target.value = '';
            e.target.blur();
        }
    }

    render() {
        return (
            <div className="sample-list">
                <Scrollbars
                    onScroll={this.handleScroll}
                    autoHide
                    height="100%"
                    universal={true}
                    className="scrollbar"
                    {...this.props}>
                    <div className="sample-list-inner">
                        <div className="add-sample">
                            <input className="add-sample-input" placeholder="Add new card" onKeyPress={this.handleAddEnter}/>
                        </div>
                        <hr />
                        {this.props.cards.map((item) => <Sample key={item.id} id={item.id} name={item.name} selected={item.selected}
                                                                clickHandler={this.handleClick}
                                                                removeHandler={this.handleRemove} />
                            )}
                    </div>
                </Scrollbars>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.card.cards
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCardSelected: (id, selected) => dispatch(setCardSelected(id, selected)),
        addCard: (name) => dispatch(addCard(name)),
        modifyCard: (id, card) => dispatch(modifyCard(id, card)),
        removeCard: (id) => dispatch(removeCard(id)),
        setMode: (mode) => dispatch(setMode(mode)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SampleList);