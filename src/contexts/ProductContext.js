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


   if(product.material.type == "wood" && updatedProps?.material?.type == "composite") {
    console.log("dupa1")
    product.material.woodType = "dupa";
  }   
  if(product.material.type == "composite" && updatedProps?.material?.type == "wood") {
    console.log("dupa2")
    product.material.woodType = initialProductState.material.woodType;
  } 
  
  const newState = Object.assign({},product,updatedProps);
  //console.log("product",product,updatedProps,newState);
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