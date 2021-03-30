import Styles from "./ProductView.module.scss";
import {useContext,useState,useEffect} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';
import {useProductImage} from "hooks/useProductimage";

// Create  image Boitmap polyfill for Safari
if (!('createImageBitmap' in window)) {
	window.createImageBitmap = async function (data) {
		return new Promise((resolve,reject) => {
			let dataURL;
			if (data instanceof Blob) {
				dataURL = URL.createObjectURL(data);
			} else if (data instanceof ImageData) {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				canvas.width = data.width;
				canvas.height = data.height;
				ctx.putImageData(data,0,0);
				dataURL = canvas.toDataURL();
			} else {
				throw new Error('createImageBitmap does not handle the provided image source type');
			}
			const img = document.createElement('img');
			img.addEventListener('load',function () {
				resolve(this);
			});
			img.src = dataURL;
		});
	};
}


const ProductView  = props => {
  
  const [canvas, setCanvas] = useState(false);
  const [loading, setLoading] = useState(false);
  const {product} = useContext(ProductContext);
  const refFn = newCanvas => {
    if(newCanvas && newCanvas != canvas) setCanvas(newCanvas);
  }

  useEffect(()=>{
    // render product
    if(!canvas.getContext) return false;
    setLoading(true);
    const context = canvas.getContext('2d');
    context.scale(.2,.2);

    const productImage = useProductImage(product);

    productImage.then(images=>{
      canvas.width = images[0].width;
      canvas.height = images[0].height;
      images.forEach(image => {
        context.drawImage(image,0,0,image.width,image.height)
      })
    }).then(() => {
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
    }) 
  },[canvas,product])

  return (
    <div className={`${Styles.ProductView} ${props.className}`}>
      <div className={`${Styles.loading} ${loading ? Styles.isLoading : null}`}><span></span><span></span></div>
      <pre className={Styles.DebugView}>
        {JSON.stringify(product,undefined,4)}
      </pre>
      <canvas ref={refFn} width="1200" height="1200" />
    </div>
  )
}

export default ProductView;