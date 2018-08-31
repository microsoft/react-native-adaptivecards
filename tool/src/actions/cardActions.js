import * as Constants from '../Constants'

export function setMode(mode) {
    return {
        type: Constants.SET_MODE,
        mode
    }
}

export function modifyConfig(config) {
    return {
        type: Constants.MODIFY_CONFIG,
        config
    }
}

export function modifyCard(id, card) {
    return {
        type: Constants.MODIFY_CARD,
        id,
        card
    }
}

export function setCardSelected(id, selected) {
    return {
        type: Constants.SET_CARD_SELECTED,
        id,
        selected
    }
}

export function addCard(name) {
    return {
        type: Constants.MODIFY_CARD,
        name
    }
}

export function removeCard(id) {
    return {
        type: Constants.REMOVE_CARD,
        id
    }
}
