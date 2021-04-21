import {useContext} from "preact/hooks";
import ProductContext from 'contexts/ProductContext';
import Styles from './AddToCart.module.scss';
import {useProductThumb} from "hooks/useProductThumb";
import Star from "assets/icons/star.svg";

export default props => {
  const {product} = useContext(ProductContext);
  const productThumb = useProductThumb(product);
  return (
    <div className={Styles.AddToCart}>
      <button onClick={e => {
        props.add(Object.assign({},product,{image:productThumb}))
      }} >Dodaj do Listy</button>
    </div>
  )
}