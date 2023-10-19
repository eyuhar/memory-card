import { useEffect, useState } from 'react';
import './App.css'
import GameBoard from './components/GameBoard'
import ScoreBoard from './components/ScoreBoard'

const pokemonList = [
  "venusaur",
  "charizard",
  "blastoise",
  "meganium",
  "typhlosion",
  "feraligatr",
  "sceptile",
  "blaziken",
  "swampert"
];


async function getCards(){
  const result = [];

  for (let i = 0; i < pokemonList.length; i++) {
    await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonList[i])
      .then(response => {
        return response.json();
      })
      .then(response => {
        result.push({id: pokemonList[i], image: response.sprites.front_default});
      })
  }

  return result;
}

function App() {
  const [cardList, setCardList] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [picks, setPicks] = useState({});

  useEffect(() => {
    const pickList = {};
    pokemonList.forEach(element => {
      pickList[element] = false;
    });
    setPicks(pickList);

    getCards().then(response => {
      setCardList(response);
    })
  }, []);

  return (
    <>
      <div id='header'>
        <h1>Memory Card</h1>
        <ScoreBoard
          score = {score}
          bestScore ={bestScore}
        />
      </div>
      <div id='game-board'>
        <GameBoard
          cardList = {cardList}
          picks = {picks}
          score = {score}
          bestScore = {bestScore}
          setScore = {setScore}
          setBestScore = {setBestScore}
          setPicks = {setPicks}
        />
      </div>
    </>
  )
}

export default App
