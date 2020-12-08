import Panel from "components/UI/Panel";
import Button from "components/UI/Button"
let woodTypeCache = ""

const WoodTypePanel = props => {  
  const {product,update} = props;
  let woodType = product.material.woodType;
  if(woodType) {
    woodTypeCache = product.material.woodType;
  } else {
    woodType = woodTypeCache; 
  }
  const woodColor = product.material.color.value;
  const getTextureUrl = woodType => `./assets/textures/${woodColor != 'natural' ? `${woodColor  }_` : ""}${woodType}.jpg`

  const setWoodType = woodType => {
    update({
      material : Object.assign(product.material, {woodType})
    })
  }

  return (
    <Panel title="Rozmiar donicy">
      <div style={{display:"grid",gridTemplateColumns: "1fr 1fr",gap:".5em"}}>
        <Button 
          label="Okume" 
          round={true}
          active={woodType == "okume"} 
          iconUrl={getTextureUrl('okume')}
          onClick={() => setWoodType('okume')}
        />
        <Button 
          label="Olcha" 
          round={true}
          active={woodType == "olcha"} 
          iconUrl={getTextureUrl('olcha')}
          onClick={() => setWoodType('olcha')}
        />
      </div>
    </Panel>
  )
}

export default WoodTypePanel;