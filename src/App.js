import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      mutationChance: 0.25,
      mapOffset: [-200,100],
      mutation: false,
      mapGrid: [
        { key: 'a',
          adjacent: ['b','c'],
          base: true,
          offsetX: -200,
          offsetY: -200 },
        { key: 'b',
          adjacent: ['a','c'],
          base: false,
          offsetX: -300,
          offsetY: 0 },
        { key: 'c',
          adjacent: ['a','b','d','e'],
          base: false,
          offsetX: -100,
          offsetY: 0 },
        { key: 'd',
          adjacent: ['c','h'],
          base: false,
          offsetX: 50,
          offsetY: -200 },
        { key: 'e',
          adjacent: ['c','f'],
          base: false,
          offsetX: 100,
          offsetY: 50 },
        { key: 'f',
          adjacent: ['e','g'],
          base: false,
          offsetX: 300,
          offsetY: 0 },
        { key: 'g',
          adjacent: ['f','i','j'],
          base: false,
          offsetX: 300,
          offsetY: -200 },
        { key: 'h',
          adjacent: ['d','g','i'],
          base: false,
          offsetX: 150,
          offsetY: -400 },
        { key: 'i',
          adjacent: ['g','h','j'],
          base: false,
          offsetX: 350,
          offsetY: -400 },
        { key: 'j',
          adjacent: ['g','i'],
          base: false,
          offsetX: 500,
          offsetY: -200 }
      ]
    }
  }
  componentDidMount() {
    this.timerInterval = setInterval(()=>{
      this.onTick();
    },1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }
  onTick() {
    this.setState({
      time: this.state.time +1,
      mutation: false
    });
    this.checkMutations();
  }
  checkMutations() {
    this.state.mapGrid.forEach((d)=>{
      //Filter down to adjacent grid items
      let adjacentGrids = this.state.mapGrid.filter(item => d.adjacent.indexOf(item.key) > -1);
      if (adjacentGrids.length < 1) {
        return false;
      }
      //Only look at grids without bases
      let gridsWithoutBases = adjacentGrids.filter(item => !item.base);
      if (gridsWithoutBases.length < 1) {
        return false;
      }
      //console.log('gridsWithoutBases',gridsWithoutBases);

      //If there is a base
      if (d.base) {
        //See whether to mutate
        if (Math.random() < this.state.mutationChance) {
          //Choose which adjacent cell to mutate
          if (gridsWithoutBases.length > 1) {
            let randomKey = Math.round(Math.random()*(gridsWithoutBases.length-1));
            //Mutate adjacent cell;
            this.mutateCell(gridsWithoutBases[randomKey],'base',true);
          } else if (gridsWithoutBases.length > 0) {
            //console.log('no adjacent items',gridsWithoutBases);
            this.mutateCell(gridsWithoutBases[0],'base',true);
          }
        }
      }
    });
    return false;
  }
  mutateCell(item,prop,val) {
    item[prop] = val;
    let newMapGrid = Object.assign(this.state.mapGrid, item);
    this.setState({
      mapGrid: newMapGrid,
      mutation: true
    })
  }
  getMapGrid() {
    let mapContent = this.state.mapGrid.map((d,i)=>{
      let transformOffset = {
        'transform': `translate(${ d.offsetX }px,${ d.offsetY }px)`
      }
      return (
        <div style={ transformOffset } className={ `Sector is-${ d.key } ${ d.base ? 'has-base' : '' }` }><p>{ d.key.toUpperCase() }</p></div>
      );
    });
    let offsetStyle = {
      'transform': `translate(${ this.state.mapOffset[0] }px,${ this.state.mapOffset[1] }px)`
    }
    return (
      <div className='App-map' style={ offsetStyle }>
        { mapContent }
      </div>
    );
  }
  render() {
    return (
      <div className='App'>
        <p className='App-time'>{ this.state.time }{ this.state.mutation ? ' mutation!' : '' }</p>
        { this.getMapGrid() }
      </div>
    );
  }
}

export default App;

/*
  {
    key: 'a',
    adjacent: ['b','c'],
    base: 'false',
    type: 'remote',
    transport: 'path',
    intel: 1,
    stability: 0.5,
    supporters: 0.25,
    neutral: 0.5,
    hostile: 0.25,
    insurgents: false,
    military: false,
    garrison: false,
    headquarters: false,
    insurgentGarrison: false
  }
*/
