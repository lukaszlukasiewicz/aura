import Panel from "components/UI/Panel";
import Button from "components/UI/Button"

const MaterialPanel = props => {  
  const {product,update} = props;

  function setType(type) {
    update({
      material: Object.assign({},product.material,{type})
    })
  }
  return (
    <Panel title="Wybierz Materiał">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5em"}}>
        <Button label="Drewno" active={product.material.type == "wood"} onClick={()=>setType("wood")} />
        <Button label="Kompozyt" active={product.material.type == "composite"} onClick={()=>setType("composite")} />
      </div>
    </Panel>
  )
}

export default MaterialPanel;