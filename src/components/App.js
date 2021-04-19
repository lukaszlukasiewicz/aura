
import {ProductContextWrapper} from "contexts/ProductContext";
import Styles from "./App.module.scss";
import ProductView from "components/ProductView/ProductView";
import Sidebar from "components/UI/Sidebar";
import MaterialPanel from "components/Panels/Material/MaterialPanel";
import TypePanel from "components/Panels/Type/TypePanel";
import WoodTypePanel from "components/Panels/WoodType/WoodTypePanel";
import WoodColorPanel from "components/Panels/WoodColor/WoodColorPanel"
import CornerTypePanel from "components/Panels/CornerType/CornerTypePanel"
import CornerColorPanel from "components/Panels/CornerColor/CornerColorPanel"
import InsertPanel from "components/Panels/Insert/InsertPanel"
import ColorPanel from "components/Panels/Color/ColorPanel"
import AddToCart from "components/UI/AddToCart"
const App = props => {
	return (<ProductContextWrapper><div className={Styles.App} id="app">
		<div className={Styles.viewWraprer}>
			<ProductView />
		</div>
		<Sidebar>
			<MaterialPanel />
			<TypePanel />
			<CornerTypePanel />
			<CornerColorPanel/>
			<ColorPanel/>
			<WoodTypePanel />
			<WoodColorPanel />
			<InsertPanel />
			{ props.cartRef ? <AddToCart cart={props.cartRef}/> : false}			
		</Sidebar>
	</div></ProductContextWrapper>)
}

export default App;
