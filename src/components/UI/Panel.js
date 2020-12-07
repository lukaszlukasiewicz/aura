import {useState} from 'preact/hooks';
import Styles from "./Panel.module.scss";
const Panel = props => {
  const [expanded, setExpandState]  = useState(true);

  const togglePanelContent = () => {
    setExpandState(!expanded)
  }
  return(
    <div className={`${Styles.Panel} ${props.className}`}>
      {props.title && <div className={Styles.Panel__title} onClick={togglePanelContent}>
        <h2>{props.title}</h2>
        <div className={Styles.Panel__toggle} >
          <span className={expanded && Styles['Panel__toggle--expanded']} />
        </div>
      </div>}
      {expanded && <div className={Styles.Panel__content}>
        {props.children}
      </div>}
    </div>
  )
}

export default Panel;