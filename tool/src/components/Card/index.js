import React from 'react'
import AdaptiveCard from '../../assets/AdaptiveCards'
import './Card.css'

class Card extends React.Component {
    render() {
        return (
            <div className="card">
                <AdaptiveCard {...this.props} />
            </div>
        )
    }
}

export default Card;
