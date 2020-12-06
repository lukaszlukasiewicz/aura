import Styles from "./Panel.module.scss";
const Panel = props => {
  return(
    <div className={`${Styles.Panel} ${props.className}`}>
      {props.title && <h2 className={Styles.Panel__title}>{props.title}</h2>}
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default Panel;