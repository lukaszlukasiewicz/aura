import {useState} from "preact/hooks";
import Styles from "./Cart.module.scss";

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
        cart.push({ product,amount });
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

  cartRef.add = add;
  cartRef.get = get;
  cartRef.show = show;
  cartRef.hide = hide;
  return ( visible ? 
  <div className={Styles.CartWraper} onClick={e => hide()}>
    <div className={Styles.Cart}>
      Cart:<ul>
        {cart.map((cartItem,index) => {
          const {product,amount} = cartItem
          return (<li>
            <b>product:</b> {JSON.stringify(product)} <b>amount:</b> {amount}
          </li>)
        })}
      </ul>
    </div>
  </div> 
  : false)
}

export default Cart;