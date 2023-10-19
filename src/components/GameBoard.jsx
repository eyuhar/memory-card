import "../styles/GameBoard.css"

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    } 
    
    return array; 
}

function resetPicks(picks, setPicks){
    for (const id in picks) {
        picks[id] = false;
    }
    setPicks(picks);
}

function makeChoice(id, picks, score, bestScore, setScore, setBestScore, setPicks){
    if (picks[id]) {
        console.log("Wrong Choice");
        if(score > bestScore){
            setBestScore(score);
        }
        setScore(0);
        resetPicks(picks, setPicks);
    }else{
        picks[id] = true;
        setScore((prevScore) => prevScore + 1);
        console.log(`${id} chosen. Good choice.`)
    }
}

function transitionOn(){
    const cards = document.querySelectorAll(".card-overlay");
    cards.forEach(element => {
        element.classList.add("card-overlay-active");
    });
}
function transitionOff(){
    const cards = document.querySelectorAll(".card-overlay");
    cards.forEach(element => {
        element.classList.remove("card-overlay-active");
    });
}


function GameBoard({cardList, picks, score, bestScore, setScore, setBestScore, setPicks}) {
    
    return  <>
                {
                    shuffle(cardList).map(element => {
                        return  <div className="card" key={element.id} onClick={() => {
                                    transitionOn();
                                    setTimeout(() => {
                                        transitionOff();
                                    }, 1500);
                                    setTimeout(() => {
                                        makeChoice(element.id, picks, score, bestScore, setScore, setBestScore, setPicks);

                                    },1000);
                                }}>
                                    <div className="card-overlay"></div>
                                    <img src={element.image} alt={element.id}/>
                                    <hr/>
                                    <div className="card-description">{element.id.charAt(0).toUpperCase() + element.id.slice(1)}</div>
                                </div>;
                    })
                }
            </>;
}

export default GameBoard;