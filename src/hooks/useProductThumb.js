import {useState} from "preact/hooks"
import {useProductImage} from "hooks/useProductImage"

const imagesAttrs = {
  'standard' : {
    ratio : 2,
    x : -200,
    y: -250,
  },
  'double' : {
    ratio : 1.7,
    x : -50,
    y: -200,
  },
  'tall' : {
    ratio : 2,
    x : -200,
    y: -100,
  },
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

export const useProductThumb = product => {
  const [image, setImage] = useState(false);
    getImage(product).then(image => {
      setImage(image);
    });
  return image
}