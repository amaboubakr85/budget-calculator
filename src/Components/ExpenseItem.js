import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const ExpenseItem = ({ expense, handleDeleteItem, handleEditItem }) => {
  const { charge, amount, id } = expense;
  //console.log(props);
  return (
    <>
      <li className="item">
        <div className="info">
          <span className="expense">{charge}</span>
          <span className="amount">$ {amount}</span>
        </div>
        <button
          className="edit-btn"
          aria-label="edit button"
          onClick={() => handleEditItem(id)}
        >
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          aria-label="delete button"
          onClick={() => handleDeleteItem(id)}
        >
          <MdDelete />
        </button>
      </li>
    </>
  );
};

export default ExpenseItem;
