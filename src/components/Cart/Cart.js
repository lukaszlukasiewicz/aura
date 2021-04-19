import {useState,useCallback, useRef,useEffect, useLayoutEffect} from "preact/hooks";
import Styles from "./Cart.module.scss";
import {CartItem} from "components/CartItem/CartItem";
import {useProductPrice,formatPrice,net} from "hooks/useProductPrice";



const cartTotal = cart => {
  const total = cart.reduce((total,item) => total + item.price.total.gross.value, 0);
  return <div>
    <h2>{formatPrice(total)}</h2>
    <p>netto {formatPrice(net(total))}</p>
  </div>
}

const CartSummary = props => {
  return ( 
    <div className={Styles.CartSummary}>
      <div>
        <div className={Styles.CartTotal}>
          {cartTotal(props.cart)}
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
  const {cartRef} = props;
  const cartRefEl = useRef();
  console.log(cartRefEl)
  const add = useCallback((product,amount = 1) => {
    updateCart(cart => {
      let currentProduct = cart.find(item => JSON.stringify(item.product) == JSON.stringify(product));
      if(currentProduct) {
        currentProduct.amount += amount
      } else {
        const id = Math.random().toString(32).substring(2);
        currentProduct = {id,product,amount}
        cart.push(currentProduct);
      }
      currentProduct.price = useProductPrice(product, currentProduct.amount);
      return [...cart];
    })
  },[])
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

  const updateAmount = useCallback((id,amount) => {
    updateCart(cart =>{
      const itemToUpdate = cart.find(cartItem =>  { 
        return cartItem.id == id;
      });
      if(itemToUpdate) {
        itemToUpdate.amount = amount;
        itemToUpdate.price = useProductPrice(itemToUpdate.product, itemToUpdate.amount);
        return [...cart];
      }
      return cart;
    })
  },[]);

  const captureClickEvent = useCallback(e => e.stopPropagation(),[cartRef]);

  cartRef.add = add;
  cartRef.get = get;
  cartRef.show = show;
  cartRef.hide = hide;
  return ( visible ? 
  <div ref={cartRefEl} className={Styles.CartWraper} onClick={e => hide()}>
    <div className={Styles.Cart} onClick={captureClickEvent} >
      <h1>Twój koszyk</h1>
      { cart.length > 0 ? <>
        <ul className={Styles.CartItems}>
          {cart.map((cartItem) => <CartItem key={cartItem.id} product={cartItem} updateAmount={ amount => updateAmount(cartItem.id,amount)} />)}
        </ul>
        <CartSummary cart={cart}/>
      </> :
      <p>Twój koszyk jest pusty. Dodaj produkt do koszyka aby złożyc zamówienie</p>
      }
    </div>
  </div> 
  : false)
}

export default Cart;