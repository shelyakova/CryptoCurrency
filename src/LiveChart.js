import React, { Component } from "react";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import { Line } from "react-chartjs-2";
import Websocket from "react-websocket";

let dataToChart = new Array(20);
let timeToChart = new Array(20);

class LiveChart extends Component {
  state = {
    label: undefined,
    data: undefined,
    lastMs: Date.now()
  };

  handleData(data) {
    let result = JSON.parse(data);

    if (result.timestampms - this.state.lastMs > 3000 || !dataToChart[0]) {
      let encodedTime = new Date(result.timestampms).toLocaleTimeString();
      let encodedData = result.events[0].price;
      timeToChart.splice(0, 1);
      timeToChart.splice(19, 0, encodedTime);
      dataToChart.splice(0, 1);
      dataToChart.splice(19, 0, encodedData);

      this.setState({
        label: [...timeToChart],
        data: [...dataToChart],
        lastMs: result.timestampms
      });
    }
  }

  render() {
    return (
      <Styles>
        <Form
          render={({ reset, submitting, pristine, values }) => (
            <form>
              <div className="buttons">
                <label>Live Prise</label>
                  <Websocket
                    url="wss://api.gemini.com/v1/marketdata/btcusd"
                    onMessage={this.handleData.bind(this)}
                  />
                  {this.state.data && (
                    <Line
                      width={90}
                      height={30}
                      data={{
                        labels: this.state.label,
                        datasets: [
                          {
                            label: "BTC Real-time",
                            fill: true,
                            lineTension: 0.05,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 3,
                            pointHoverRadius: 8,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: this.state.data
                          }
                        ]
                      }}
                    />
                  )}
                </div>
              </form>
            )}
          />
        </Styles>
    );
  }
}

export default LiveChart;
