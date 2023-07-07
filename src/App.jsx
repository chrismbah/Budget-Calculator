import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import "./App.css";
import { v4 as uuid } from "uuid";
import { useState,useEffect } from "react";

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "credit card", amount: 600 },
//   { id: uuid(), charge: "car payment", amount: 1400 },
//   { id: uuid(), charge: "car payment", amount: 1400 },
// ];
//Stroing in local storgae so data is available when page is refreshed
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  //************State values****************** */
  //All expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  //Single expense
  const [charge, setCharge] = useState("");
  //Single amount
  const [amount, setAmount] = useState("");
  //Alert
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    localStorage.setItem("expenses",JSON.stringify(expenses));
  },[expenses]);
  //************Functionality****************** */
  function handleCharge(e) {
    setCharge(e.target.value);
  }
  function handleAmount(e) {
    setAmount(e.target.value);
  }
  function handleAlert({ type, text }) {
    setAlert({ show: true, type, text }); //Adds props to alert object
    setTimeout(() => {
      setAlert({ show: false });
    }, 4000);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id
            ? { ...item, charge: charge, amount: amount }
            : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item edited" });
      } else {
        const singleExpense = { id: uuid(), charge: charge, amount: amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      //Handle alert
      handleAlert({
        type: "danger",
        text: "Charge cant be empty value and amoun of value has to be bigger than 0",
      });
    }
  }
  function clearItems() {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All Items deleted" });
  }
  function handleDelete(id) {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item deleted" });
  }
  function handleEdit(id) {
    let expense = expenses.find((item) => item.id == id);
    let { charge, amount } = expense; //Destructuring the object
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
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
