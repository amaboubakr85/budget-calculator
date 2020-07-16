import React, { useState } from "react";
import Alert from "./Components/Alert";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

const initialExpenses = [
  { id: uuidv4(), charge: "rent", amount: 250 },
  { id: uuidv4(), charge: "car expense", amount: 450 },
  { id: uuidv4(), charge: "foods", amount: 650 },
];
//console.log(initialExpenses);

function App() {
  // console.log(useState());

  // const result = useState(initialExpenses);
  // const expenses = result[0];
  // const setExpenses = result[1];

  // distructuring

  // *********************** state values ******************************

  // expenses , add expense
  const [expenses, setExpenses] = useState(initialExpenses);

  // single expense
  const [charge, setCharge] = useState("");

  // single amount
  const [amount, setAmount] = useState("");

  const [alert, setAlert] = useState({ show: false });

  // edit
  const [edit, setEdit] = useState(false);

  // edit item
  const [id, setId] = useState(0);
  // *********** functionality ************
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleCharge = (e) => {
    console.log(`charge ${e.target.value}`);
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    console.log(`amount ${e.target.value}`);
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempEpenses = expenses.map((item) => {
          return item.id === id
            ? { ...item, charge: charge, amount: amount }
            : item;
        });
        setExpenses(tempEpenses);
        setEdit(false);
        handleAlert({
          type: "success",
          text: "item had been edited succesffuly ",
        });
      } else {
        const tempExpense = {
          id: uuidv4(),
          charge: charge,
          amount: amount,
        };
        setExpenses([...expenses, tempExpense]);
        handleAlert({
          type: "success",
          text: "you have successfully added the expense",
        });
      }

      setCharge("");
      setAmount("");
    } else {
      console.log("error");
      handleAlert({
        type: "danger",
        text: "somthing  wrong , please be sure of entering all fields  ",
      });
    }
  };

  // clear list

  const clearList = () => {
    setExpenses([]);
  };
  // delete single item

  const handleDeleteItem = (id) => {
    let filteredExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(filteredExpenses);
    handleAlert({ type: "danger", text: "item deleted " });
  };

  // handle edit item

  const handleEditItem = (id) => {
    let filteredExpense = expenses.find((item) => item.id === id);
    console.log(filteredExpense);
    setCharge(filteredExpense.charge);
    setAmount(filteredExpense.amount);
    setEdit(true);
    setId(id);
  };

  // *********************** state values ******************************

  // console.log(expenses);
  return (
    <React.Fragment>
      {alert.show && (
        <Alert
          type={alert.type}
          text={alert.text}
          handleAlert={handleAlert}
        ></Alert>
      )}

      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          charge={charge}
          amount={amount}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearList={clearList}
          handleDeleteItem={handleDeleteItem}
          handleEditItem={handleEditItem}
        ></ExpenseList>
      </main>
      <h1>
        total spending :
        <span className="total">
          {" "}
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </React.Fragment>
  );
}

export default App;
