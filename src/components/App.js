
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
const App = () => {

	return (<ProductContextWrapper><div className={Styles.App} id="app">
		<div>
			<ProductView />
		</div>
		<Sidebar>
			<MaterialPanel />
			<TypePanel />
			<WoodTypePanel />
			<WoodColorPanel />
			<CornerTypePanel />
			<CornerColorPanel/>
		</Sidebar>
	</div></ProductContextWrapper>)
}

export default App;
