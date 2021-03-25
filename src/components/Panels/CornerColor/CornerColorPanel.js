import RalPalette from "components/UI/RalPalette";
import Panel from "components/UI/Panel"
import Button from "components/UI/Button"
import {useContext, useState} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';

let cachedRalColor = "RAL 1000";
const ralIcon = `${window.auraConfiguratorUrl}/assets/textures/ral.jpg`;

const CornerColorPanel = (props = {}) =>{
  const {product,updateProduct} = useContext(ProductContext);  
  if( !product.cornerColor) return false;
  const {woodType:wood,woodColor:color} = product;
  const woodIcon = `${window.auraConfiguratorUrl}/assets/textures/${color != 'natural' ? `${color  }_` : ""}${wood}.jpg`;
  const ralColor = product.cornerColor.includes("RAL") ? product.cornerColor : cachedRalColor;
  const isRal = product.cornerColor.includes('RAL');
  const setColor = color => {
    updateProduct({cornerColor:color})
  }
  return (
    <Panel title="Kolor narożników">
      <div style={{display:"grid",gridAutoColumns:"1fr",gridAutoFlow:"column",gap:".5em"}}>
        <Button label="Srebrny" bigIcon={true} iconColor="#eee" round={true} active={product.cornerColor == "silver"} onClick={()=>setColor("silver")} />
        <Button label="Grafitowy"  bigIcon={true}  iconColor="#555" round={true} active={product.cornerColor == "graphite"} onClick={()=>setColor("graphite")} />
        <Button label="RAL" bigIcon={true}  iconUrl={ralIcon} round={true} active={isRal} onClick={()=>setColor(ralColor)} />
      </div>
      { isRal && <div>
        <h3>Wybierz kolor</h3>
        <RalPalette selected={product.cornerColor} onClick={setColor} />
      </div>}
    </Panel>
  )
} 

export default CornerColorPanel;