import Styles from "./ProductView.module.scss";
import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';

const ProductView  = props => {
  
  const {product} = useContext(ProductContext);
  return (
    <div className={`${Styles.ProductView} ${props.className}`}>
      <pre>
        {JSON.stringify(product,undefined,4)}
      </pre>
    </div>
  )
}

export default ProductView;