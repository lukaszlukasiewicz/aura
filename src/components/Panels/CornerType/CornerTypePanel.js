import Panel from "components/UI/Panel";
import Button from "components/UI/Button"
import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';

const CornerTypePanel = props => {  
  
  const {product,updateProduct} = useContext(ProductContext);
  return (
    <Panel title="Narożniki">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5em"}}>
        <Button label="Proste" active={product.corners == "sharp"} onClick={()=>updateProduct({corners:"sharp"})} />
        <Button label="Zaokrąglone" active={product.corners == "round"} onClick={()=>updateProduct({corners:"round"})} />
      </div>
    </Panel>
  )
}

export default CornerTypePanel;