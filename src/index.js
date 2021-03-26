import habitat from 'preact-habitat';
import App from './components/App';
import Cart from './components/Cart/Cart';

const cartRef = {};

const _cart = habitat(Cart)
_cart.render({
  selector: "body",
  clean: false,
  defaultProps: {cartRef}
})

const _habitat = habitat(App)
_habitat.render({
  selector:"#aura-konfigurator",
  clean:true,
  defaultProps: {cartRef},
})

const cartBtn = document.querySelectorAll('[data-aura-show-cart]');
cartBtn.forEach( btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    if(cartRef.show) cartRef.show();
  })
})
