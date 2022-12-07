import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import React from "react";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item, true);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHanlder = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-2e0a3-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          items: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onSubmit={submitOrderHanlder} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingContent = <p>Sending Over Data...</p>;

  const didSubmitContent = (
    <React.Fragment>
      <p>Succesfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
