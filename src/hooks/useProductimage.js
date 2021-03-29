import {ral} from "components/UI/RalPalette";

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

const loadImage = (url) => {
  return new Promise((fulfill, reject) => {
    let imageObj = new Image();
    imageObj.onload = () => fulfill(imageObj);
    imageObj.onerror = () => reject({error:true, message: `error loading: ${url}`});
    imageObj.src = url;
  });
}


export const useProductImage = product => {
  const {material,color,woodType,woodColor,corners,type,cornerColor,insert} = product;
    const folder = `${window.auraConfiguratorUrl}assets/products/${material}${material == "wood" || material == "metal"? "-" + corners : ""}/${type}/`;

    const images = [];
    images.push(loadImage(folder+"shadow.png"));
    if(material == "wood") images.push(loadImage(`${folder}${woodColor}_${woodType}.png`));

    if(material == "metal") {      
      images.push(loadImage(`${folder}${woodColor}_${woodType}.png`));
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

    if(material == "composite") {
      images.push(loadImage(`${folder}composite.png`))
      images.push(ralImage(
        ral[color],
        `${folder}ral_mask.png`,
        `${folder}composite.png`,
        `${folder}reflections.png`,
      ))
    }
    
    if(insert) images.push(loadImage(`${folder}${insert.toLowerCase()}.png`));

    return Promise.all(images);
}

