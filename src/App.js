import { useState } from "react";
import "./App.css";

function App() {
  const currency = [2000, 500, 100, 20, 10, 5, 1];
  var change = Array(currency.length).fill(0);
  const [inputBill, setInputBill] = useState(0);
  const [cashGiven, setCashGiven] = useState(0);
  const [returnCash, setReturnCash] = useState(change);
  const [message, setMessage] = useState("");

  function getChange() {
    setReturnCash(change);
    if(inputBill <= 0 || cashGiven <= 0) {
      setMessage('Enter valid amounts');
    }
    else {
      if(cashGiven - inputBill >= 0 ) {
        calculateChange();
        setMessage('Transaction Successful!');
      }
      else {
        setMessage('Wanna wash the dishes?');
      }
    }
  }

  function calculateChange() {
    let returnChange = cashGiven - inputBill;
        let i = 0;
        while (returnChange !== 0) {
          change[i] = Math.trunc(returnChange / currency[i]);
          returnChange = returnChange % currency[i];
          i++;
        }
        setReturnCash(change);
        setMessage("");
  }

  return (
    <div className="App">
      <h1 className="title">Cash Register Manager</h1>
      <p className="subtitle">
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return.
      </p>
      <div className="input--container">
        <label className="input--label" htmlFor="bill-amount">Bill Amount:</label>
        <input
          className="input"
          name="bill-amount"
          value={inputBill}
          type="number"
          onInput={(e) => setInputBill(e.target.value)}
        />
      </div>
      <div className={`input--container ${(inputBill !== '' && inputBill !== 0 && inputBill !== '0') ? 'display-flex' : 'display-none'}`}>
        <label className="input--label" htmlFor="cash-given">Cash Given:</label>
        <input
          className="input"
          name="cash-given"
          value={cashGiven}
          type="number"
          onInput={(e) => setCashGiven(e.target.value)}

        />
      </div>
      <p className="message">{message}</p>
      <button className="button" onClick={getChange}>Check</button>
      <p className="subtitle">Return Change</p>
      <table>
        <tbody>
          <tr>
            <th>No. of Notes</th>
            {returnCash.map((c) => {
              return <td>{c}</td>;
            })}
          </tr>
          <tr>
            <th>Currency</th>
            {currency.map((c) => {
              return <td>{c}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
