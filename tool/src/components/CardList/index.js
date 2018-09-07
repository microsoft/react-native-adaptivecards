import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';

import './CardList.css';
import Card from '../../components/Card'
import { parseJson } from '../../utils/common'

class CardList extends React.Component {

    render() {
        const cards = this.props.cards.filter(item => item.selected).map(item => {return {...item, card: parseJson(item.card)}});
        const config = parseJson(this.props.config);
        return (
            <div className="card-list">
                <Scrollbars
                    onScroll={this.handleScroll}
                    autoHide
                    height="100%"
                    universal={true}
                    className="scrollbar"
                    {...this.props}>
                    <div className="card-list-inner">
                        {cards.map(card => <Card key={card.id} adaptiveCard={card.card} config={config}/>)}
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.card.cards,
        config: state.card.config,
    };
};

export default connect(mapStateToProps)(CardList);