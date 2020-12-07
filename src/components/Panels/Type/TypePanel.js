import Panel from "components/UI/Panel";
import Button from "components/UI/Button"

const TypePanel = props => {  
  const {product,update} = props;

  function setType(type) {
    update({
     type
    })
  }
  return (
    <Panel title="Rozmiar donicy">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:".5em"}}>
        <Button 
          label="Standard" 
          active={product.type == "standard"} 
          bigIcon={true}
          iconUrl="./assets/icons/type_standard.svg"
          onClick={()=>setType("standard")} 
        />
        <Button 
          label="Double" 
          active={product.type == "double"} 
          bigIcon={true}
          iconUrl="./assets/icons/type_double.svg"
          onClick={()=>setType("double")} 
        />
        <Button 
          label="Tall" 
          active={product.type == "tall"} 
          bigIcon={true}
          iconUrl="./assets/icons/type_tall.svg"
          onClick={()=>setType("tall")} 
        />
      </div>
    </Panel>
  )
}

export default TypePanel;