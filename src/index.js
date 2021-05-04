import habitat from 'preact-habitat';
import App from './components/App';
import List from './List/List.js';
import Toaster from 'components/Toaster/Toaster'
import AskForm from 'components/AskForm/AskForm'
/*
import Cart from './components/Cart/Cart';
const cartRef = {};
const _cart = habitat(Cart)
_cart.render({
  selector: "body",
  clean: false,
  defaultProps: {cartRef}
})

const cartBtn = document.querySelectorAll('[data-aura-show-cart]');
cartBtn.forEach( btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    if(cartRef.show) cartRef.show();
  })
})

*/

const productsList = new List();

window.productsList = productsList;
const listContainers = document.querySelectorAll('.aura-list__container');
if( listContainers ) listContainers.forEach( listContainer => productsList.render( listContainer ) )

const debug = document.getElementById('aura-configurator')?.dataset.configuratorDebug;

const _habitat = habitat(App)
_habitat.render({
  selector:"#aura-configurator",
  clean:true,
  defaultProps: {
    list : productsList,
    debug,
  },
});

const toastContainer = document.createElement('div')
toastContainer.classList.add('toster');
document.body.append(toastContainer);
const _toastHabitat = habitat(Toaster)
_toastHabitat.render({
  selector:".toster",
  clean:false,
});

const askContainer = document.createElement('div')
askContainer.classList.add('aura-ask');
document.body.append(askContainer);
productsList.render( askContainer, AskForm );