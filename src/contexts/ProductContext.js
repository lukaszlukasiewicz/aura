const { createContext } = require("preact");
import {useReducer} from "preact/hooks";
import configs from "config";

window.auraConfiguratorUrl  = document.currentScript.src.replace("auraConfigurator.js","");

const cache = {
  woodColor:  {
    wood: "okume",
    color:"natural",
  },
  compositeColor: "RAL 1000",
  cornerColor: "wood",
  conrenrType: "round",
}

const validateProductProp = (value,propConfig) => {
  if ( !propConfig ) return false;
  if (  value === false  && propConfig.empty ) return true;
  if ( propConfig.expression instanceof RegExp) return propConfig.expression.test(value);
  if ( propConfig.value  && value === propConfig.value) return true;
  if ( Array.isArray(propConfig.values))  return propConfig.values.includes(value);
  return false;
}

const validateState = (state) => {
  if(!state || !state.material) return false;
  const config = configs[state.material];
  if(!config) return false;
  const keys = Object.keys(config);
  const validState = {};
  keys.forEach(key => {
    const currentValue = state[key];
    const isValid = validateProductProp(currentValue,config[key]);
    validState[key] = isValid ? currentValue : config[key]?.default || config[key]?.value;
  })
  return validState;
}

const initialProductState = validateState({material:"wood"});

const reducer = (product,updatedProps) => {
  const state = Object.assign({},product,updatedProps);
  const newState = validateState(state);
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