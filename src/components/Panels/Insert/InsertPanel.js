import Panel from "components/UI/Panel";
import Button from "components/UI/Button"
import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';

const InsertPanel = props => {  
  
  const {product,updateProduct} = useContext(ProductContext);
  const {material} = product;
  return (
    <Panel title="Wkład">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5em"}}>
        <Button label="Brak" active={product.insert == false} onClick={()=>updateProduct({insert:false})} />
        {material == "wood" && <Button label="Lechuza" active={product.insert == "lechuza"} onClick={()=>updateProduct({insert:"lechuza"})} />}
        {material == "composite" && <Button label="Lamela" active={product.insert == "lamela"} onClick={()=>updateProduct({insert:"lamela"})} />}
      </div>
    </Panel>
  )
}

export default InsertPanel;