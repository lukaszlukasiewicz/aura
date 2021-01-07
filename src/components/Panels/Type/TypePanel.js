import Panel from "components/UI/Panel";
import Button from "components/UI/Button";
import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';

const TypePanel = props => {  
  const {product,updateProduct} = useContext(ProductContext);
  if(product.material.type == "composite" && product.type == "tall") updateProduct({type:"standard"});

  return (
    <Panel title="Rozmiar donicy">
      <div style={{display:"grid",gridTemplateColumns: product.material == "wood" ? "1fr 1fr 1fr" : "1fr 1fr",gap:".5em"}}>
        <Button 
          label="Standard" 
          active={product.type == "standard"} 
          bigIcon={true}
          iconUrl={`${window.auraConfiguratorUrl}/assets/icons/type_standard.svg`}
          onClick={()=>updateProduct({type:"standard"})} 
        />
        <Button 
          label="Double" 
          active={product.type == "double"} 
          bigIcon={true}
          iconUrl={`${window.auraConfiguratorUrl}/assets/icons/type_double.svg`}
          onClick={()=>updateProduct({type:"double"})} 
        />
        {product.material == "wood" && <Button 
          label="Tall" 
          active={product.type == "tall"} 
          bigIcon={true}
          iconUrl={`${window.auraConfiguratorUrl}/assets/icons/type_tall.svg`}
          onClick={()=>updateProduct({type:"tall"})} 
        />}
      </div>
    </Panel>
  )
}

export default TypePanel;