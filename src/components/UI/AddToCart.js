import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';
import Styles from './AddToCart.module.scss';

export default props => {
  
  const {product} = useContext(ProductContext);
  const {cart} = props;
  return (
    <div className={Styles.AddToCart}>
      <button onClick={e => cart.add(product,1)} >Dodaj do koszyka</button>
    </div>
  )
}