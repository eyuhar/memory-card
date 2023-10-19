import "../styles/ScoreBoard.css"

function ScoreBoard({score, bestScore}){

    return  <div id="score-board">
                <div id="score">
                    <p>Score: &nbsp;</p>
                    <p>{score}</p>
                </div>
                <div id="best-score">
                    <p>Best Score: &nbsp;</p>
                    <p>{bestScore}</p>
                </div>
            </div>;
}

export default ScoreBoard;