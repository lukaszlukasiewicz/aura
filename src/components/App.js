import {useState} from "preact/hooks";
import Styles from "./App.module.scss";
import ProductView from "components/ProductView/ProductView";
import Sidebar from "components/UI/Sidebar";
import MaterialPanel from "components/Panels/Material/MaterialPanel";
import TypePanel from "components/Panels/Type/TypePanel";
const App = () => {

	const [product, setProduct] = useState({
		type : "standard",
		material: {
			type: "wood",
			woodType: "okume",
			color: {
				type: "silver",
				value: "silver",
			}
		},
		corners: {
			type: "round",
			color: {
				type: "silver",
				value: "silver",
			}
		},
		insert: false,
	})

	const updateProduct = updatedProductProps => {
		const newProductState = Object.assign({},product,updatedProductProps);
		setProduct(newProductState);
		return newProductState;
	}

	return (<div className={Styles.App} id="app">
		<div>
			<ProductView product={product} />
		</div>
		<Sidebar>
			<MaterialPanel product={product} update={updateProduct} />
			<TypePanel product={product} update={updateProduct} />
		</Sidebar>
	</div>)
}

export default App;
