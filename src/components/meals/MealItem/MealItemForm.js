import { useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
import { useRef } from "react";

const MealItemForm = (props) => {
  const [enteredAmountIsValid, setEnteredAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 10
    ) {
      setEnteredAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "Amount" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!enteredAmountIsValid && <p>Please enter a valid amount 1-10</p>}
    </form>
  );
};

export default MealItemForm;
