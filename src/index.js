import habitat from 'preact-habitat';
import App from './components/App';

const _habitat = habitat(App)
_habitat.render({
  selector:"#aura-konfigurator",
  clean:true,
})
