import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

export default function ExpenseList() {
  const {expenses,handleEdit,handleDelete,clearItems}=useContext(AppContext)
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          Clear Expenses <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
}
