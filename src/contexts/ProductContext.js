const { createContext } = require("preact");
import {useReducer} from "preact/hooks";

const cache = {
  woodColor:  {
    wood: "okume",
    color:"natural",
  },
  composieteColor: "RAL 1000",
  cornerColor: "silver",
}

const initialProductState = {
  type : "standard",
  material: "wood",
  materialColor:cache.woodColor,
  corners : "round",
  cornerColor: cache.cornerColor,
  insert: false,
};

const getPath = (path,object) => {
  const keys = path.split(".");
  console.log(keys);
}

const reducer = (product,updatedProps) => {

  // Save values to cache
  if(product.material == "wood" && updatedProps.materialColor) cache.woodColor = updatedProps.materialColor;
  if(product.material == "composite" && updatedProps.materialColor) cache.composieteColor = updatedProps.materialColor;
  if(product.material == "wood" && updatedProps.cornerColor) cache.cornerColor = updatedProps.cornerColor;
  
  if(updatedProps.material == "wood" && product.insert == "lamela" ) updatedProps.insert = false;
  if(updatedProps.material == "composite" && product.insert == "lechuza" ) updatedProps.insert = false;

  if(updatedProps.material == "composite") delete product.cornerColor; 
  if(updatedProps.material == "wood") product.cornerColor = cache.cornerColor;

  if(updatedProps.material == "wood") product.materialColor = cache.woodColor;
  if(updatedProps.material == "composite") product.materialColor = cache.composieteColor;

  const newState = Object.assign({},product,updatedProps);
  return newState; 
}

const ProductContext = createContext();

export const ProductContextWrapper = (props = {}) => {
  const {children, ...poprsRest} = props;
  const [product,updateProduct] = useReducer(reducer,initialProductState);
  return (
    <ProductContext.Provider value={{
      product,
      updateProduct,
    }}>
      {children}
    </ProductContext.Provider>
  )
}


export default ProductContext