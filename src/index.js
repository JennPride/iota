import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

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

}


// ['red','blue','yellow','green'].map((color) => {
//   ['square','circle','diamond','triangle'].map((shape) => {
//     return <Card shape={shape num={num} color={color}}></Card>
//   })
// })
//create and manage deck
class Deck extends React.Component {
  render() {
  	return <div className="deck">
    {
      [1,2,3,4].map( (num) => {
        return <Card shape='square' num={num} color='red'></Card>
      })
    }
      </div>
  }
}

class Square extends React.Component {
	constructor(props) {
  	super(props)
    this.state = { selected: false }
  }

  //Logic for placing down card
  onClick(e) {
  	this.setState({ selected: !this.state.selected })
  }
  render() {
  	return <div className="board-cell" onClick={this.onClick.bind(this)}>
       <span className="board-cell-content">{this.state.selected ? "O" : null}</span>
  	</div>
  }
}

class Board extends React.Component {

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
          			return <Square key={col}></Square>
          		})
            }
            </div>

      	})
      }
      <Deck></Deck>
      </div>
    )

  }

}



ReactDOM.render( <Board />, document.getElementById('root') );
