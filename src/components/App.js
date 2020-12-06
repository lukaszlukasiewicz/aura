import Styles from "./App.scss";
import ProductView from "components/ProductView/ProductView";
const App = () => {
	return (<div className={Styles.App} id="app">
		<ProductView />
	</div>)
}

export default App;
