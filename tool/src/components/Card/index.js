import React from 'react'
import { CardRoot } from '../../assets/AdaptiveCards'
import './Card.css'

class Card extends React.Component {
    render() {
        return (
            <div className="card">
                <CardRoot {...this.props} />
            </div>
        )
    }
}

export default Card;
