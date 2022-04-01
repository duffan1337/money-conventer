
import { useEffect, useState } from 'react';
import { getAPI } from './Api/api';
import './App.css';
import CurrencyInput from './Components/CurrencyInput/CurrencyInput';



function App() {

  const [amount1, setAmount1] = useState(1)     //количество 1 валюты
  const [amount2, setAmount2] = useState(1)     //количество 2 валюты
  const [currency1, setCurrency1] = useState("USD")   //Наименование 1 валюты
  const [currency2, setCurrency2] = useState("EUR")    //Наименование 2 валюты
  const [rates, setRates] = useState([])    //Наименование 2 валюты
  const [exchange, setExchange] = useState(0)    //Наименование 2 валюты

  useEffect(()=>{
    (getAPI.getCurrenciesData().then(response=>setRates(response.data.rates)))
  },[])

  useEffect(()=>{
    if(!!rates)
    {
      handleAmount1Change(1)
    }
  },[rates])


  const swap = ()=>{
    handleReverseExchangeChange()
    setAmount1(amount2)
    setAmount2(amount1)
    setCurrency1(currency2)
    setCurrency2(currency1)
  }

  const format = (number) =>{
    return number.toFixed(3)
   }

 const handleAmount1Change = (amount1) =>{
   setAmount2(format(amount1 *rates[currency2] / rates[currency1]))
  setAmount1(amount1)
  handleExchangeChange()
 }

 const handleAmount2Change = (amount2) =>{
  setAmount1(format(amount2 *rates[currency1] / rates[currency2]))
 setAmount2(amount2)
 handleExchangeChange()
}

 const handleCurrency1Change = (currency1) =>{
  setAmount2(format(amount1 *rates[currency2] / rates[currency1]))
 setCurrency1(currency1)
 handleExchangeChange()

}

const handleCurrency2Change = (currency2) =>{
  setAmount1(format(amount2 *rates[currency1] / rates[currency2]))
 setCurrency2(currency2)  
 handleExchangeChange()
}

const formatExchange = (number) =>{
  return number.toFixed(4)
 }

const handleExchangeChange = ()=>{
  setExchange(formatExchange(1 *rates[currency2] / rates[currency1]))
}

const handleReverseExchangeChange = ()=>{
  setExchange(formatExchange(1 *rates[currency1] / rates[currency2]))
}

  return (
    <div className="App">
      <div className="one">
        <p>from</p>
        <CurrencyInput  currencies={Object.keys(rates)} currency={currency1} amount={amount1} onAmountChange={handleAmount1Change} onCurrencyChange={handleCurrency1Change}></CurrencyInput>
      </div>
      <div className="two">
        <p>to</p>
        <CurrencyInput  currencies={Object.keys(rates)} currency={currency2} amount={amount2} onAmountChange={handleAmount2Change} onCurrencyChange={handleCurrency2Change}></CurrencyInput>
      </div>
      <div className="downSection">
        <button className="swapBtn" onClick={swap}> Swap</button>
        <span className="rate">
          <div><p>current rate</p>{exchange} </div>
        </span>
      </div>
    </div>
  );
}

export default App;
