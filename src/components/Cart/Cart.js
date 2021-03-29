import {useState,useCallback} from "preact/hooks";
import Styles from "./Cart.module.scss";
import {CartItem} from "components/CartItem/CartItem";

const cartTotal = () => {
  return <div>
    <h2>300 pln</h2>
    <p>netto 280 pln</p>
  </div>
}

const CartSummary = props => {
 return (
  <div className={Styles.CartSummary}>
    <div>
      <div className={Styles.CartTotal}>
        {cartTotal()}
      </div>
      <div className={Styles.CartOrder}>
        <button>Zamów</button>
      </div>
    </div>
  </div>
 )
}

const Cart = props => {
  const [cart, updateCart] = useState([]);
  const [visible,showCart] = useState(false);
  const {cartRef} = props
  const add = (product,amount) => {
    updateCart(cart => {
      const inCart = cart.find(item => JSON.stringify(item.product) == JSON.stringify(product));
      if(inCart) {
        inCart.amount += amount
      } else {
        const id = Math.random().toString(32).substring(2);
        cart.push({ id,product,amount });
      }
      console.log(cart);
      return [...cart];
    })
  }
  const show = () => {
    showCart(1);
    document.body.classList.add(Styles['aura-configurator__cart--visible']);
  }
  const hide = () => {
    showCart(0);
    document.body.classList.remove(Styles['aura-configurator__cart--visible']);
  }
  const remove = () => cart;
  const get = () => cart;

  const captureClickEvent = useCallback(e => e.stopPropagation(),[cartRef]);

  cartRef.add = add;
  cartRef.get = get;
  cartRef.show = show;
  cartRef.hide = hide;
  return ( visible ? 
  <div className={Styles.CartWraper} onClick={e => hide()}>
    <div className={Styles.Cart} onClick={captureClickEvent} >
      <h1>Twój koszyk</h1>
      { cart.length > 0 ? <>
        <ul className={Styles.CartItems}>
          {cart.map((cartItem) => <CartItem product={cartItem} />)}
          {cart.map((cartItem) => <CartItem product={cartItem} />)}
          {cart.map((cartItem) => <CartItem product={cartItem} />)}
          {cart.map((cartItem) => <CartItem product={cartItem} />)}
          {cart.map((cartItem) => <CartItem product={cartItem} />)}
        </ul>
        <CartSummary/>
      </> :
      <p>Twój koszyk jest pusty. Dodaj produkt do koszyka aby złożyc zamówienie</p>
      }
    </div>
  </div> 
  : false)
}

export default Cart;