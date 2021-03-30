import Panel from "components/UI/Panel";
import Button from "components/UI/Button";
import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';
import configs from "config";

const TypePanel = props => {  
  const {product,updateProduct} = useContext(ProductContext);
  
  const {values:types,labels }  = configs[product.material].type;
  console.log(types,labels);
  return (
    <Panel title="Rozmiar donicy">
      <div style={{display:"grid",gridAutoColumns:"1fr",gridAutoFlow:"column",gap:".5em"}}>
        {
          types && types.map(type => {
            return <Button 
              label={labels[type] || type} 
              key={type}
              active={product.type == type} 
              bigIcon={true}
              iconUrl={`${window.auraConfiguratorUrl}/assets/icons/type_${type}.svg`}
              onClick={()=> updateProduct({type})} 
            />
          })
        }
      </div>
    </Panel>
  )
}

export default TypePanel;