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
    console.log(cardImage);

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


//create and manage deck
class Deck extends React.Component {

  constructor(props) {
    super(props)
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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

  	return <div className="deck">
      {allCards}
      </div>
  }
}

class Square extends React.Component {
	constructor(props) {
  	super(props)
    this.state = {empty: true}
  }

  render() {
  	return <div className="board-cell">
       <span className="board-cell-content"></span>
  	</div>
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){

  	return (

      //Consider redesigning to auto resize - aka only have values for the spaces
      //next to each card

    	<div className="board">
      {
      	[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map( (row) => {
				 return <div key={row} className="board-row">
            {
            	[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map( (col) => {
          			return <Square key={[row, col]}></Square>
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
      started: false,
      usedCards: [],
      points: 0,
      deckIndex: 0
    }
  }

  render() {
    if(!this.started) {
      //placing down first card
      //dealing hand

    }
    return (
      <div className="mainContent">
        <Board></Board>
        <Deck></Deck>
        <Hand></Hand>
      </div>
    )
  }



}



ReactDOM.render( <Game />, document.getElementById('root') );
