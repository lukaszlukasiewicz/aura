import Styles from "./Sidebar.module.scss";
const Sidebar = props => {
  return (
    <div className={`${Styles.Sidebar} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Sidebar;