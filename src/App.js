import React, {useState, useEffect, useContext} from 'react'
import {
  Heading,
  Stack,
  Container,
  Box,
  SimpleGrid,
  Text
} from '@chakra-ui/react'
import PlayCard from "./PlayCard.js"
import { CardContext } from './Context.js'

const uniqueCards = [
  {
    type: "red",
    color: "#ff0000"
  },
  {
    type: "green",
    color: "#008000"
  },
  {
    type: "blue",
    color: "#0000FF"
  },
  {
    type: "yellow",
    color: "#FFFF00"
  },
  {
    type: "brown",
    color: "#A52A2A"
  },
  {
    type: "pink",
    color: "#FFC0CB"
  }
]

const shuffleCards = (array) => {

  for(let i = array.length -1; i > 0; i--) {
    // Dapetin random index dari array
    const randomIndex = Math.floor(Math.random() * i);
    // SWAP CARD
    const temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function App() {

  const [cards, setCards] = useState(() => shuffleCards(uniqueCards.concat(uniqueCards)));

  // Maximum isinya 2 kartu
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const {moves, addMoves} = useContext(CardContext)

  const evaluate = () => {
    // first ==> index kartu pertama
    // second ==> index kartu kedua
    const [first, second] = openCards

    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({...prev, [cards[first].type]: true}))
      setOpenCards([]);
      return;
    } 

    setTimeout(() => {
      setOpenCards([]);
    }, 500)

  }
  
  useEffect(() => {
    if(openCards.length === 2) {
      setTimeout(evaluate, 500);
    }
  }, [openCards])

  const handleClick = (index) => {
    if(openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      // setMoves((move) => move + 1)
      addMoves()
    } else {
      setOpenCards([index])
    }
  }

  const checkIsFlipped = (index) => {
    // Apakah index kartu ada didalam array opencards ????
    // True or False
    return openCards.includes(index);
  }

  const checkIsInActive = (card) => {
    // object dengan key card type
    // true or false
    return Boolean(clearedCards[card.type])
  }

  return (
    <div className="App">
      <Stack spacing={6}>
        <Heading as="h3">
            Play flip card Game
        </Heading>
      </Stack>
      <Container maxW={"2xl"} padding={"30px"}>
        <Box bg="gray" padding={"20px"}>
          <SimpleGrid columns={4} spacing={10}>
            {cards.map((card, index) => {
              return (
                <PlayCard
                  key={index}
                  card={card}
                  index={index}
                  handleCardClick={handleClick}
                  isFlipped={checkIsFlipped(index)}
                  isInactive={checkIsInActive(card)}
                />
              )
            })}
          </SimpleGrid>
        </Box>
       <Text>Score: {JSON.stringify(moves)}</Text>
      </Container>
     
    </div>
  );
}

export default App;

// bulma, tailwind, chakra, bootstrap, material ui, ant design
