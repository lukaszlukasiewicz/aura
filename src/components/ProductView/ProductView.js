
import Styles from "./ProductView.module.scss";

const ProductView  = props => {
  return (
    <div className={`${Styles.ProductView} ${props.className}`}>
      <pre>
        {JSON.stringify(props.product,undefined,4)}
      </pre>
    </div>
  )
}

export default ProductView;