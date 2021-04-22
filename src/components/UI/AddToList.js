import {useContext} from "preact/hooks";
import ProductContext from 'contexts/ProductContext';
import Styles from './AddToList.module.scss';
import {useProductThumb} from "hooks/useProductThumb";
import {Star} from "components/UI/Icons"

export default props => {
  const {product} = useContext(ProductContext);
  const productThumb = useProductThumb(product);
  return (
    <div className={Styles.AddToCart}>
      <button onClick={e => {
        props.add(Object.assign({},product,{image:productThumb}))
      }} >Dodaj do Listy <Star /></button>
    </div>
  )
}