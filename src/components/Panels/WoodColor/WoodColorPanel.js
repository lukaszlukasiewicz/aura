import {useContext} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';
import Panel from "components/UI/Panel";
import Button from "components/UI/Button"


const getTextureUrl = (wood,color) => `${window.auraConfiguratorUrl}/assets/textures/${color != 'natural' ? `${color  }_` : ""}${wood}.jpg`;

const WoodColorButton = props => {

  const {product,updateProduct} = useContext(ProductContext);
  const {wood,color} = product.materialColor;

  return (
    <Button 
      label={props.label}
      round={true}
      active={color == props.color} 
      iconUrl={getTextureUrl(wood,props.color)}
      bigIcon={true}
      onClick={() => updateProduct(
        {
          materialColor: {
            wood,
            color: props.color,
          }
        }
      )}
    />
  )
}

const WoodColorPanel = props => {

  const {product} = useContext(ProductContext);
  if(product.material != "wood") return false;

  return (
    <Panel title="Kolor drewna">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:".5em"}}>
        <WoodColorButton label="Naturalny" color="natural"/>
        <WoodColorButton label="Ash gray" color="ash-gray"/>
        <WoodColorButton label="TVT 5060" color="tvt-5060"/>
        <WoodColorButton label="TVT 5056" color="tvt-5056"/>
        <WoodColorButton label="5073" color="5073"/>
        <WoodColorButton label="5077" color="5077"/>
      </div>
    </Panel>
  );
}

export default WoodColorPanel;