import './CurrencyInput.css';

function CurrencyInput(props) {
  return (
    <div className="CurrencyInput">

          <select value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)}>
            {props.currencies.map((currency=>(<option> {currency}</option>)))}
         </select>
         <br></br>
        <input type="text" value ={props.amount} onChange={e => props.onAmountChange(e.target.value)}/>
         
    </div>
  );
}

export default CurrencyInput;
