import {useProductImage} from "hooks/useProductImage";
import {useProductName} from "hooks/useProductName";
import {useState} from "preact/hooks";
import Styles from './CartItem.module.scss';

const imagesAttrs = {
  'standard' : {
    ratio : 3,
    x : -200,
    y: -200,
  },
  'double' : {
    ratio : 2,
    x : -100,
    y: -150,
  },
  'tall' : {
    ratio : 2,
    x : -200,
    y: -100,
  },
}

const productPrice = (price) => {
  return (
    <div className={Styles.ProductPrice}>
      <h3>{price.unit.gross.text}</h3><span>{price.unit.net.text}</span>
    </div>
  )
}

const getImage = async (product) => {
  const {ratio,x,y} = imagesAttrs[product.type] || {ratio:2,x:100,y:100};
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const productImages = useProductImage(product);
  const images = await productImages;
  canvas.width = images[0].width/ratio;
  canvas.height = images[0].height/ratio;
  images.forEach(image => {
    context.drawImage(image,x,y,image.width,image.height)
  });
  return canvas.toDataURL("image/png");
}

export const CartItem = props => {

  const {id,product,price,amount} = props.product;
  const {updateAmount} = props;
  const [productName, productDescription] = useProductName(product)
  //TODO: Move image genaretion to function that is adding product to cart
  // Not nice way to tell react that new image was generated and it needs to refresh; 
  const [generatedImage, setGeneratedImag] = useState(false)
  if(!product.image) {
    getImage(product).then(image => {
      product.image = image;
      setGeneratedImag(true);
    } );
  }
  return (<li className={Styles.CartItem} key={id}>
    <img src={product.image}  className={Styles.ProductImage}/>
    <div className={Styles.ProductInfo}>
      <h2>{productName}</h2>
      <p>{productDescription}</p>
    </div>
    <div className={Styles.ProductAmount}><input type="number" value={amount} min="1" onChange={e => updateAmount(e.target.value)} /></div>
    <div className={Styles.ProductPrice}>{productPrice(price)}</div>
  </li>)
}


