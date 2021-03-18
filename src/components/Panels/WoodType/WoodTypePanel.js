import Panel from "components/UI/Panel";
import Button from "components/UI/Button"
import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';

const getTextureUrl = (wood,color) => `${window.auraConfiguratorUrl}/assets/textures/${color != 'natural' ? `${color  }_` : ""}${wood}.jpg`

const woodPanel = props => {  
  
  const {product,updateProduct} = useContext(ProductContext);
  if(product.material != "wood"  && product.material != "metal") return false;
  const {wood,color} = product.materialColor

  const setwood = wood => {
    updateProduct({
      materialColor : {
        wood,
        color, 
      }
    });
  }

  return (
    <Panel title="Rodzaj drewna">
      <div style={{display:"grid",gridTemplateColumns: "1fr 1fr",gap:".5em"}}>
        <Button 
          label="Okume" 
          round={true}
          active={wood == "okume"} 
          iconUrl={getTextureUrl('okume',color)}
          onClick={() => setwood('okume')}
        />
        <Button 
          label="Olcha" 
          round={true}
          active={wood == "olcha"} 
          iconUrl={getTextureUrl('olcha',color)}
          onClick={() => setwood('olcha',)}
        />
      </div>
    </Panel>
  )
}

export default woodPanel;