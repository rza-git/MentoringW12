import React, {useContext} from 'react'
import {
    Card,
    CardBody,
    Text
} from '@chakra-ui/react'
import { CardContext } from './Context.js'

const CardContent = (isFlipped, card, isInactive) => {

    if(isFlipped) {
        return(
            <Card size={"lg"} bgColor={card.color} opacity={isInactive ? 0 : ""}>
                <CardBody>
                    CARD
                </CardBody>
            </Card>
        )
    } else {
        return(
            <Card size={"lg"} opacity={isInactive ? 0 : ""}>
                <CardBody>
                    CARD
                </CardBody>
            </Card>
        )
    }
}

function PlayCard ({card, handleCardClick, index, isFlipped, isInactive}) {
    const {moves, addMoves} = useContext(CardContext)
    const handleClick = () => {
        handleCardClick(index);
    }

    return(
        <div onClick={handleClick}>
            {CardContent(isFlipped, card, isInactive)}
        </div>
    )
}

export default PlayCard