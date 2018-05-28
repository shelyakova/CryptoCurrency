import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ChoosePrise from './ChoosePrise';
import Calculator from './Calculator';
import Chart from './Chart';
import LiveChart from './LiveChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChoosePrise  />
        <Calculator />
        {console.log(this.state)}
        <Chart />
        <LiveChart />
      </div>
    );
  }
}

export default App;
