import Styles from './Button.module.scss';
const Button = props => {
  const {label,iconUrl, bigIcon,round, ...buttonProps} = props;
  buttonProps.className = buttonProps.className ? `${Styles.Button} ${buttonProps.className}`: Styles.Button; 
  return (
    <button {...buttonProps}>
      {iconUrl && <span className={`${Styles.Button__icon} ${bigIcon && Styles['Button__icon--big']} ${round && Styles['Button__icon--round']}`} style={{backgroundImage:`url(${iconUrl})`}}></span>}
      {label}
    </button>
  )
}

export default Button;