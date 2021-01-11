import Panel from "components/UI/Panel";
import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';
import RalPalette from "components/UI/RalPalette";

const ColorPanel = props => {  
  
  const {product,updateProduct} = useContext(ProductContext);
  if (product.material == "wood") return false;
  return (
    <Panel title="Kolor">
      <RalPalette selected={product.materialColor} onClick={ color => updateProduct({materialColor:color})}/>
    </Panel>
  )
}

export default ColorPanel;