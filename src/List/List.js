import ListContainer from '../components/ListContainer/ListContainer';
import {render as renderPreact} from 'preact';
const products = new Set();
const lists = new Set();

function List() {

  const add = product => {
    products.add(JSON.stringify(product));
    if(window.auraToast) window.auraToast("Produkt dodany do listy");
    update();
  }

  const remove = product => {
    products.delete(JSON.stringify(product));
    update();
  }

  const update = () => {
    lists.forEach( (container) => {
      renderPreact( <ListContainer products={parsedProducts()} remove={remove} />,container);
    });
  }

  const parsedProducts = () => {
    const productsArray = Array.from(products);
    return productsArray.map(product => JSON.parse(product));
  }
  const getProducts = () => {
    return parsedProducts();
  }

  const render = container => {
    lists.add(container);
    const list = <ListContainer remove={remove} products={parsedProducts()} />
    renderPreact(list,container);
  }

  return {
    add,
    remove,
    render,
    getProducts,
  }
}


export default List;