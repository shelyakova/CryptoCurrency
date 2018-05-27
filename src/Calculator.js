import React, { Component } from "react";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import axios from "axios";

class Calculator extends Component {
  state = {
    crypto: "BTC",
    currency: "EUR",
    number: 1,
    result: "",
    cryptos: []
  };

getData() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,IOT&tsyms=USD,EUR')
    .then(res => {
      const cryptos = res.data;
      this.setState({cryptos: cryptos});
    })
  }

  componentDIdMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.crypto !== this.state.crypto ||
      prevState.currency !== this.state.currency
    ) {
      this.getData();
    }
  }


  render() {
      return (
        <Styles>
          <Form
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  Calculator
                </div>
                <div>

                <Field
                    name="crypto"
                    component="input"
                    type="text"
                    placeholder="BTC, ETH, DASH, IOT"
                  />
                  <OnChange name="crypto">
                    {value => {
                      this.setState({
                        crypto: value
                      });
                    }}
                  </OnChange>

                  <button
                    type="button"
                  >
                    ⇄
                  </button>

                  <Field
                      name="currency"
                      component="input"
                      type="text"
                      placeholder="EUR, USD"
                    />
                  <OnChange name="currency">
                    {value => {
                      this.setState({
                        currency: value
                      });
                    }}
                  </OnChange>

                </div>
                <div>

                <Field
                    name="number"
                    component="input"
                    type="text"
                    placeholder="number"
                  />
                  <OnChange name="number">
                    {value => {
                      this.setState({
                        number: value
                      });
                    }}
                  </OnChange>

                  <Field
                      name="result"
                      component="input"
                      type="text"
                      placeholder="result"
                    />
                    {console.log(this.state)}
                </div>
              </form>
            )}
          />
        </Styles>
      );
    }
}

export default Calculator;
