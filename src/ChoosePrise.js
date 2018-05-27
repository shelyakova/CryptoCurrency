import React, { Component } from "react";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import axios from "axios";

class ChoosePrise extends Component {
  state = {
    currency: "EUR",
    icon: "€",
    cryptos: []
  };

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,IOT&tsyms=USD,EUR')
    .then(res => {
      const cryptos = res.data;
      this.setState({cryptos: cryptos});
    })
  }

  render() {
      return (
        <Styles>
          <Form
            render={({ reset, submitting, pristine, values }) => (
              <form>
                <div className="buttons">
                  <label>Current Prise</label>
                    <button
                      type="button"
                      onClick={() => this.setState({currency: "EUR", icon: "€"})}
                    >
                      EUR
                    </button>
                    <button
                      type="button"
                      onClick={() => this.setState({currency: "USD", icon: "$"})}
                    >
                      USD
                    </button>
                  </div>
                  <ul>
                    {Object.keys(this.state.cryptos).map((key) => (
                        <div class="inline-block">
                          <b>{key}</b>
                            <br />
                          {`
                            ${this.state.cryptos[key][this.state.currency]}
                            ${this.state.icon}
                          `}
                        </div>
                    ))}
                  </ul>
              </form>
            )}
          />
        </Styles>
      );
    }
  }


export default ChoosePrise;
