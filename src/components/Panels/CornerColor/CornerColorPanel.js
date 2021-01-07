import RalPalette from "components/UI/RalPalette";
import Panel from "components/UI/Panel"
import Button from "components/UI/Button"
import {useContext, useState} from "preact/hooks"
import ProductContext from 'contexts/ProductContext';

let cachedRalColor = "RAL 1000";
const ralIcon = `${window.auraConfiguratorUrl}/assets/textures/ral.jpg`;

const CornerColorPanel = (props = {}) =>{
  const {product,updateProduct} = useContext(ProductContext);  
  if(product.material != "wood") return false;

  const {color,wood} = product.materialColor;
  const woodIcon = `${window.auraConfiguratorUrl}/assets/textures/${color != 'natural' ? `${color  }_` : ""}${wood}.jpg`;
  const ralColor = product.cornerColor.includes("RAL") ? product.cornerColor : cachedRalColor;
  console.log(product.cornerColor.includes('RAL'));
  const [ral, setRal] = useState(product.cornerColor.includes('RAL'));
  const setColor = color => {
    const isRal = color.includes('RAL');
    if(isRal) cachedRalColor = color;
    setRal(isRal);
    updateProduct({cornerColor:color})
  }
  return (
    <Panel title="Kolor narożników">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5em",marginBottom:".5em"}}>
        <Button label="Srebrny" iconColor="#eee" round={true} active={product.cornerColor == "silver"} onClick={()=>setColor("silver")} />
        <Button label="Grafitowy"  iconColor="#555" round={true} active={product.cornerColor == "graphite"} onClick={()=>setColor("graphite")} />
        <Button label="Drewno" iconUrl={woodIcon} round={true} active={product.cornerColor == "wood"} onClick={()=>setColor("wood")} />
        <Button label="RAL" iconUrl={ralIcon} round={true} active={ral} onClick={()=>setColor(ralColor)} />
      </div>
      { ral && <div>
        <h3>Wybierz kolor</h3>
        <RalPalette selected={cachedRalColor} onClick={setColor} />
      </div>}
    </Panel>
  )
} 

export default CornerColorPanel;