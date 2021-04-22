import Styles from "./Toaster.module.scss";
import {useState, useRef, useEffect} from "preact/hooks"
import {Close} from "components/UI/Icons"

const Toast = props => {
  const toastRef = useRef();

  useEffect(() => {
    if(!props.toast?.timeout) {
      setTimeout(() => {
        toastRef.current.classList.add(Styles['Toast--visible'])
      },5);
      setTimeout(removeToast,3000);
      props.toast.timeout = true;
    }
  },[])

  const removeToast = () => {
    console.log(props.toast.id);
    if(toastRef.current) toastRef.current.classList.remove(Styles['Toast--visible']);
    setTimeout(props.onClick, 500)
  }

  return <div ref={toastRef} className={`${Styles.Toast} ${props.toast.type == "error" ? Styles.Toast__error: ''} ${props.toast.timeout ? Styles['Toast--visible'] : ''}`} onClick={removeToast}>
    <div>{props.toast.content}</div>
    <div>
      <Close />
    </div>
  </div>
}

const Toaster = props => {
  const [toasts, updateToasts] = useState([]);

  const addToast = (toastContent, toastType = "success") => {
    updateToasts([...toasts, {
      content: toastContent,
      id : Math.random().toString(36).substring(7),
      type : toastType
    }])
  }

  window.auraToast = addToast;

  const removeToast = toast => {
    updateToasts(toasts => {
      const index = toasts.indexOf(toast);
      const newToasts = [...toasts];
      newToasts.splice(index,1);
      return newToasts;
    });
  } 

  return <div className={Styles.Toaster}>
    <div className={Styles.Toaster__wrapper}>
        {toasts.map(toast => <Toast toast={toast} key={toast.id} onClick={e => removeToast(toast)} />)}
    </div>
  </div>
}
export default Toaster;