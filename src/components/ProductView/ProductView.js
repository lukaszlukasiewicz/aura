
import Styles from "./ProductView.module.scss";

const ProductView  = props => {
  return (
    <div className={`${Styles.ProductView} ${props.className}`}>
      ProductView 3
    </div>
  )
}

export default ProductView;