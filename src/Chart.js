import React, { Component } from 'react';
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import { Line } from 'react-chartjs-2';
import App from './App';
import axios from 'axios';

class Chart extends Component {
  state = {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "BTC price",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: []
            }
          ]
        }
      };
  componentDidMount() {
    this.getData();
  }

  getData(timeButton) {
    axios.get(
      'https://min-api.cryptocompare.com/data/histo'
      + timeButton
      + '?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG'
    )
    .then(res => {
      const histoMinute = res.data;
      console.log(histoMinute);

      let time = [];
      let close = [];
      let dataValue = [];

      histoMinute.Data.forEach(piece => {
        dataValue = Object.values(piece);
        time[time.length]= new Date(dataValue[0]).toLocaleTimeString();
        close[close.length]= dataValue[1];
      });
      this.setState({
        chartData: {
          labels: time,
          datasets: [
            { data: close,
              label: "BTC price" }
          ]
        }
      });
      console.log(this.state);
    })
  }

  render(){
    return (
      <Styles>
        <Form
          render={({ reset, submitting, pristine, values }) => (
            <form>
              <div className="buttons">
                <label>Current price</label>
                  <button
                    type="button"
                    onClick={() =>
                      this.getData("minute")}
                  >
                    Minute
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      this.getData("hour")}
                  >
                    Hour
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      this.getData("day")}
                  >
                    Day
                  </button>
              </div>

              <div className="chart">
              {console.log(this.state.chartData)}
                <Line data={this.state.chartData} />
              </div>
            </form>
          )}
        />
      </Styles>
    );
  }
}

export default Chart;
