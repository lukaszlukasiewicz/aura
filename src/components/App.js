import {useState} from "preact/hooks";
import Styles from "./App.scss";
import ProductView from "components/ProductView/ProductView";
const App = () => {

	const [product, setProduct] = useState({
		type : "standard",
		material: {
			type: "wood",
			woodType: "okume",
			color: "natural"
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

	const updateProductState = updatedProductProps => {
		const newProductState = Object.assign({},product,updatedProductProps);
		setProduct(newProductState);
		return newProductState;
	}

	return (<div className={Styles.App} id="app">
		<ProductView product={product} />
	</div>)
}

export default App;
