import Panel from "components/UI/Panel";
import Button from "components/UI/Button"
import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';
import configs from 'config';

const InsertPanel = props => {  
  
  const {product,updateProduct} = useContext(ProductContext);
  const inserts =  configs[product.material].insert.values;
  return (
    <Panel title="Wkład">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5em"}}>
        <Button label="Brak" active={!product.insert} onClick={()=>updateProduct({insert:false})} />
        {inserts && inserts.map(insert => {
          return <Button label={insert} key={insert} active={product.insert == insert} onClick={()=>updateProduct({insert})} />
        })}
      </div>
    </Panel>
  )
}

export default InsertPanel;