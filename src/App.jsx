import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import "./App.css";
import { v4 as uuid } from "uuid";
import { useState } from "react";

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "credit card", amount: 600 },
  { id: uuid(), charge: "car payment", amount: 1400 },
  { id: uuid(), charge: "car payment", amount: 1400 },
];

function App() {
  //************State values****************** */
  //All expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  //Single expense
  const [charge, setCharge] = useState("");
  //Single amount
  const [amount, setAmount] = useState("");
  //************Functionality****************** */
  function handleCharge(e) {
    setCharge(e.target.value);
  }
  function handleAmount(e) {
    setAmount(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      const singleExpense = { id: uuid(), charge: charge, amount: amount };
      setExpenses([...expenses, singleExpense]);
      setCharge("");
      setAmount("");
    } else {
      //Handle alert
    }
  }

  return (
    <>
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Total Spending:{" "}
        <span className="total">
          $
          {expenses.reduce((total, curr) => {
            //Reduces the object to a total figure
            return (total += parseInt(curr.amount)); //Parse Int takes new amount as a number instead iof string
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
