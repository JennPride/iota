import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

//////// Splitting this out into different files once this gets complex enough,
/////// holding off for now

//create and manage individual cards
class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const cardImage = require('./cards/' + this.props.color + this.props.num + this.props.shape + '.png');

  	return <div className="card">
      <img src={cardImage}/>
  	</div>
  }

}


//manage current set of cards in players hand
class Hand extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="playerHand">
      </div>
    )
  }

}


class Square extends React.Component {
	constructor(props) {
  	super(props)
  }

  render() {
    var square = '';
    if((this.props.loc[0] == 2 ) && (this.props.loc[1] == 2 )){
      square = this.props.first;
    }

    console.log(square);

  	return <div className="board-cell">
       <span className="board-cell-content">
       {this.square}
       </span>
  	</div>
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){

  	return (

      //Need to add logic to add rows and cols when the map expands

    	<div className="board">
      {
      	[1,2,3,4,5].map( (row) => {
				 return <div key={row} className="board-row">
            {
            	[1,2,3,4,5].map( (col) => {
                  return <Square loc={[row, col]} first={this.props.firstCard}></Square>
          		})
            }
            </div>

      	})
      }
      </div>
    )

  }

}

class Game extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      usedCards: [],
      points: 0,
      deckIndex: 0,
      gameStarted: false
    }
  }

    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    performAction(card) {

    }

    render() {

      let vals = [[1,2,3,4], ['red','blue','yellow','green'], ['square']];

      //consider switching to foreach? this is messy as hell

      var allCardsDirty = vals[0].map((num) => {
          return vals[1].map((color) => {
            return vals[2].map((shape) => {
              return <Card shape={shape} num={num} color={color}></Card>
            })
          })
        })

      var allCards = allCardsDirty.reduce(function(prev, curr) {
        return prev.concat(curr);
      });

      allCards = this.shuffle(allCards);

    return (
      <div className="mainContent">
        <Board firstCard={allCards[0]}></Board>
        <div className="deck" onClick={this.performAction(allCards[this.state.deckIndex])}>
                {allCards}
                </div>
        <Hand></Hand>
      </div>
    )
  }



}



ReactDOM.render( <Game />, document.getElementById('root') );
