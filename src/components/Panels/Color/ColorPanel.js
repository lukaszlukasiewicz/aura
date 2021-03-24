import Panel from "components/UI/Panel";
import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';
import RalPalette from "components/UI/RalPalette";

const ColorPanel = props => {  
  
  const {product,updateProduct} = useContext(ProductContext);
  if (!product.color) return false;
  return (
    <Panel title="Kolor">
      <div>
        <RalPalette selected={product.color} onClick={ color => updateProduct({color})}/>
      </div>
    </Panel>
  )
}

export default ColorPanel;