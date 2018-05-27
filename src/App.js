import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ChoosePrise from './ChoosePrise';
import Calculator from './Calculator';
import Chart from './Chart';

class App extends Component {
  state = {
    cryptos: [],
    price: "USD"
   };

   onChangeState(name, value) {
     console.log(name, value);
      this.setState({[name]: value});
  }



  render() {
    return (
      <div className="App">
        <ChoosePrise onChangeState={this.onChangeState.bind(this)} />

        <Calculator tratata={this.state.cryptos}/>
        {console.log(this.state)}
        <Chart />
      </div>
    );
  }
}

export default App;
