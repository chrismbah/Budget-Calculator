import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses }) {
  return (
    <>
      <ul className="list">
        {expenses.map((expense)=>{
          return <ExpenseItem key={expense.id} expense={expense}/>
        })}
      </ul>
      {expenses.length>0 && <button>Hello</button> }
    </>
  );
}
