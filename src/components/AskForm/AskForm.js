import Styles from './AskForm.module.scss'
import {Close, Mail} from "components/UI/Icons"
import {useState, useRef, useLayoutEffect} from "preact/hooks"

const AskForm = props => {
  const [visible, setVisible] = useState(false);
  const askRef = useRef();
  
  useLayoutEffect(() => {
    const wrapper = askRef.current;
    if(!wrapper) return false;
    const container = wrapper.firstElementChild;
    wrapper.addEventListener('click', e => {
      if(!container.contains(e.target)) setVisible(false);
    })
  },[visible])

  window.auraAsk = () => {
    setVisible(true);
  }

  return  visible && <div className={Styles.AskForm__wrapper} ref={askRef}>
    <div className={Styles.AskForm__container}>
      <div className={Styles.AskForm__header}>
        <h2>Wyślij Zapytanie</h2>
        <div>
          <button onClick={e => setVisible(false)}><Close /></button>
        </div>
      </div>
        <form>
          <input type="text" placeholder="Imię i nazwisko"  />
          <input type="text" placeholder="Adrres email"  />
          <input type="text" placeholder="Telefon"  />
          <textarea rows="10" placeholder="Twoja wiadomość"></textarea>
          <div className={Styles.AskForm__submit}>
            <button>Wyślij <Mail/></button>
          </div>
        </form>
    </div>
  </div>
}

export default AskForm;