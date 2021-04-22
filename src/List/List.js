import ListContainer from '../components/ListContainer/ListContainer';
import {render as renderPreact} from 'preact';
const products = new Set();
const lists = new Map();


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
    lists.forEach( (Component, container) => {
      renderPreact( <Component products={parsedProducts()} remove={remove} />,container);
    });
  }

  const parsedProducts = () => {
    const productsArray = Array.from(products);
    return productsArray.map(product => JSON.parse(product));
  }

  const getProducts = () => {
    return parsedProducts();
  }

  const render = (container, ListComponent = ListContainer) => {
    lists.set(container,ListComponent);
    const list = <ListComponent remove={remove} products={parsedProducts()} />
    renderPreact(list,container);
  }

  return {
    add,
    remove,
    render,
    products,
    getProducts,
  }
}


export default List;