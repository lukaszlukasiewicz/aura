import {useState} from "preact/hooks";
import Styles from "./App.module.scss";
import ProductView from "components/ProductView/ProductView";
import Sidebar from "components/UI/Sidebar";
import Panel from "components/UI/Panel"
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
			<Panel title="test panel">
				<div>
					Panel content;
					<button onClick={ () => {
						updateProduct({
							material : {
								type: "composite",
								color: "silver",
							}
						})
					}}>Composite</button>
				</div>
			</Panel>
		</Sidebar>
	</div>)
}

export default App;
