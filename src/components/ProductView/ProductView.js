import Styles from "./ProductView.module.scss";
import {useContext,useState,useEffect} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';
import {ral} from "components/UI/RalPalette";

if (!('createImageBitmap' in window)) {
  window.createImageBitmap = async function(blob) {
      return new Promise((resolve,reject) => {
          let img = document.createElement('img');
          img.addEventListener('load', function() {
              resolve(this);
          });
          img.src = URL.createObjectURL(blob);
      });
  }
}

const loadImage = (url) => {
  return new Promise((fulfill, reject) => {
    let imageObj = new Image();
    imageObj.onload = () => fulfill(imageObj);
    imageObj.onerror = () => reject({error:true, message: `error loading: ${url}`});
    imageObj.src = url;
  });
}

async function ralImage(color,maskImage,shadowImage,reflectionsImage) {
  const mask = loadImage(maskImage);
  const shadow = loadImage(shadowImage);
  const reflections = loadImage(reflectionsImage);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  return Promise.all([mask,shadow,reflections])
    .then(images => {
      canvas.width = images[0].width;
      canvas.height = images[0].height;
      context.rect(0, 0, canvas.width,canvas.height);
      context.fillStyle=color;
      context.fill();
      context.globalCompositeOperation ="destination-in";
      context.drawImage(images[0],0,0)
      context.globalAlpha = 0.5;
      context.globalCompositeOperation ="color-burn";
      context.drawImage(images[1],0,0)
      context.globalAlpha = .5;
      context.globalCompositeOperation ="multiply";
      context.drawImage(images[1],0,0)
      context.globalCompositeOperation ="lighten";
      context.drawImage(images[2],0,0)
      return createImageBitmap(context.getImageData(0,0,canvas.width,canvas.height));
    }) 
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
    const {material,materialColor,corners,type,cornerColor,insert} = product;
    const folder = `${window.auraConfiguratorUrl}assets/products/${material}${material == "wood" ? "-" + corners : ""}/${type}/`;

    const images = [];
    images.push(loadImage(folder+"shadow.png"));
    if(material == "wood") {
      if(cornerColor == "wood" && corners == "round") {
        images.push(loadImage(`${folder}wood_${materialColor.color}_${materialColor.wood}.png`));
      } else {
        images.push(loadImage(`${folder}${materialColor.color}_${materialColor.wood}.png`));
        if(cornerColor == "silver") images.push(loadImage(`${folder}silver.png`));
        if(cornerColor == "graphite" && corners == "sharp") images.push(loadImage(`${folder}graphite.png`));
        if(cornerColor.includes("RAL")) {
          images.push(ralImage(
            ral[cornerColor],
            `${folder}ral_mask.png`,
            `${folder}ral_shadow.png`,
            `${folder}reflections.png`,
          ));
        }
      }
    }

    if(material == "composite") {
      images.push(loadImage(`${folder}composite.png`))
      images.push(ralImage(
        ral[materialColor],
        `${folder}ral_mask.png`,
        `${folder}composite.png`,
        `${folder}reflections.png`,
      ))
    }
    
    if(insert) images.push(loadImage(`${folder}${insert}.png`));

    Promise.all(images).then(images=>{
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