import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export default function ExpenseItem({ expense }) {
  const { id, charge, amount } = expense; //Destructuring the object
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div>
        <button className="edit-btn" aria-label="edit button">
          <MdEdit />
        </button>
        <button className="clear-btn" aria-label="delete button">
          <MdDelete />
        </button>
      </div>
    </li>
  );
}
