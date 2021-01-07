const { createContext } = require("preact");
import {useReducer} from "preact/hooks";

const initialProductState = {
  type : "standard",
  material: "wood",
  materialColor: {
    wood: "okume",
    color:"natural",
  },
  corners : "round",
  cornerColor: "wood",
  insert: false,
};

const getPath = (path,object) => {
  const keys = path.split(".");
  console.log(keys);
}

const reducer = (product,updatedProps) => {

  
  if(updatedProps.material == "wood" && product.insert == "lamela" ) updatedProps.insert = false;
  if(updatedProps.material == "composite" && product.insert == "lechuza" ) updatedProps.insert = false;

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