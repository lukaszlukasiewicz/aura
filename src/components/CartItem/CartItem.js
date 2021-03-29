import {useProductImage} from "hooks/useProductimage";
import {useRef, useEffect} from "preact/hooks";
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

const materialLabels = {
  'metal' : "drewniano/metalowa",
  'wood' : "drweniana",
  'composite' : "kompozytowa"
}

const typeLabels = {
  'standard' : "",
  'double' : "podwójna",
  'tall' : "wysoka"
}

const cornersLabels = {
  'sharp' : 'proste',
  'round' : 'zaokrąglone'
}

const getProductName = product => {
  return `Donica ${materialLabels[product.material]} ${typeLabels[product.type]}`;
}

const getProductDescription = product => {

  if(product.material == 'metal') {
    const {woodType,woodColor,corners,cornerColor,insert} = product;
    return `drewno: ${woodType}, kolor: ${woodColor}, narożniki: ${cornersLabels[corners]}, kolor narożników: ${cornerColor} ${insert ? `, wkład: ${insert}` : ''}`
  } 
  if(product.material == 'wood') {
    const {woodType,woodColor,corners,insert} = product;
    return `drewno: ${woodType}, kolor: ${woodColor}, narożniki: ${cornersLabels[corners]} ${insert ? `, wkład: ${insert}` : ''}`
  } 
  if(product.material == 'composite') {
    const {color,insert} = product;
    return `kolor: ${color} ${insert ? `, wkład: ${insert}` : ''}`
  } 
  return "Opis produktu";
}

const productPrice = (product,amount) => {
  const price = 300;
  return (
    <div className={Styles.ProductPrice}>
      <h3>{price} pln</h3><span>netto: {(price / 1.23).toFixed(2)} pln</span>
    </div>
  )
}

export const CartItem = props => {
  const canvasRef = useRef();
  const {id,product,amount} = props.product;
  useEffect(() =>{
    const canvas = canvasRef.current;
    if(!canvas || !product ) return false;
    const context = canvas.getContext('2d');
    const productImage = useProductImage(product);
    console.log(product.type,imagesAttrs,imagesAttrs[product.type]);
    const {ratio,x,y} = imagesAttrs[product.type] || {ratio:2,x:100,y:100};
    productImage.then(images=>{
      canvas.width = images[0].width/ratio;
      canvas.height = images[0].height/ratio;
      images.forEach(image => {
        context.drawImage(image,x,y,image.width,image.height)
      })
    })

  },[canvasRef.current,product]);
  return (<li className={Styles.CartItem} key={id}>
    <canvas ref={canvasRef} className={Styles.ProductImage} />
    <div className={Styles.ProductInfo}>
      <h2>{getProductName(product)}</h2>
      <p>{getProductDescription(product)}</p>
    </div>
    <div className={Styles.ProductAmount}><input type="number" value={amount} min="1" /></div>
    <div className={Styles.ProductPrice}>{productPrice(product,amount)}</div>
  </li>)
}


