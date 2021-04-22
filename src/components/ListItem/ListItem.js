import {useProductName} from "hooks/useProductName";
import Styles from "./ListItem.module.scss"
import {Trash} from "components/UI/Icons"

const ImagePlaceholder = () => {
  return <div className={Styles.ListItem__imagePlaceholder}></div>
}


const ListItem = props => {
  const {product,remove} = props
  const [productName,productDescription] = useProductName(product);
  //const productThumb = useProductThumb(product)
  return <div className={Styles.ListItem}> 
    {
      product.image ? <img src={product.image} className={Styles.ListItem__thumb} />
      : <ImagePlaceholder />
    }
    <div className={Styles.ListItem__productDescription}>
      <h2 className={Styles.ListItem__productName}>{productName}</h2>
      <p>{productDescription}</p>
    </div>
    <buton className={Styles.ListItem__remove} onClick={e => {
      setTimeout(() => remove(product), 1);    // set timout prevent list close. Removed item is not child of the list so list closes 
    }}>
      <Trash />
    </buton>
  </div>
}

export default ListItem;