import Panel from "components/UI/Panel";
import Button from "components/UI/Button"
import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';

const MaterialPanel = props => {  
  
  const {product,updateProduct} = useContext(ProductContext);

  function setType(material) {
    updateProduct({ material });
  }
  return (
    <Panel title="Materiał">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:".5em"}}>
        <Button label="Drewno" active={product.material == "wood"} bigIcon={true} onClick={()=>setType("wood")} />
        <Button label="Drewno/Metal" active={product.material == "metal"} bigIcon={true} onClick={()=>setType("metal")} />
        <Button label="Kompozyt" active={product.material == "composite"} bigIcon={true} onClick={()=>setType("composite")} />
      </div>
    </Panel>
  )
}

export default MaterialPanel;