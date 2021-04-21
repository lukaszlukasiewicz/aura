import {useState, useEffect, useRef} from 'preact/hooks'
import ListItem from 'components/ListItem/ListItem';
import Button from "components/UI/Button";
import Star from "assets/icons/star.svg";
import Mail from "assets/icons/mail.svg";
import Styles from './ListContainer.module.scss';
import {useSVG} from "hooks/useSvg";
import Close from "assets/icons/close.svg";

const CloseIcon = () => {
  const icon = atob(Close.replace(/data:image\/svg\+xml;base64,/, ''))
  return <div dangerouslySetInnerHTML={{
    __html: icon
  }} />
}

const ListContainer = props => {
  const [showList, setList] = useState(false)
  const {products,remove} = props;
  let containerRef = useRef(false);
  let ListWrapper = wrapper => { 
    if(!wrapper) return false 
    containerRef.current = wrapper;
    const wrapperRect =  wrapper.getBoundingClientRect();
    const parentRect =  wrapper.parentElement.getBoundingClientRect();
    const parentCenter = parentRect.x + parentRect.width/2;
    const arrow = wrapper.querySelector(':first-child');
    if(parentCenter + wrapperRect.width / 2 > window.innerWidth) {
      let marginLeft = -((parentCenter + wrapperRect.width / 2) - ( window.innerWidth - 20 ));
      if(wrapperRect.x + wrapperRect.width - marginLeft < parentRect.x + parentRect.width) marginLeft += (parentRect.x + parentRect.width) - (wrapperRect.x + wrapperRect.width - marginLeft)
      if(parentRect.x + parentRect.width)
      arrow.style.transform = `translateX(${ -marginLeft }px)`
      wrapper.style.marginLeft =  `${ marginLeft }px`;
    }
    if(parentCenter - wrapperRect.width / 2 < 0) {
      let marginLeft = wrapperRect.width /2 - parentCenter + 10;
      wrapper.style.marginLeft =  `${ marginLeft}px`;
      arrow.style.transform = `translateX(${ -marginLeft }px)`
    }
  };
  useEffect(() =>{
    document.addEventListener('click', e => {
      if(!containerRef.current || !containerRef.current.parentElement) return false;
      console.log(e.target,containerRef.current.parentElement, containerRef.current.parentElement.contains(e.target));
      if(!containerRef.current.parentElement.contains(e.target)) setList(false);
    } )
  },[])

  useEffect( () => {
    if(showList) document.body.classList.add(Styles['ListContainer--visible']);
    else document.body.classList.remove(Styles['ListContainer--visible']);
  },[showList])

  const closeIcon = false;
  return <div className={Styles.ListWrapper}>
    <Button 
      onClick={e => {
        setList(true);
      }}
      label={<>
        <img src={Star} style={{width:"1.2em",marginBottom:"-.15em",marginRight:".5em"}}/>
        <strong style={{textTransform:'uppercase'}}>Lista ({products.length})</strong>
      </>}  
    />
    {showList && 
      <div className={Styles.ListContainer} ref={ListWrapper}> 
        <div></div>
        <div className={Styles.ListContainer__header}>
          <h2>Twoja lista</h2>
          <div>
            <button onClick={e => setList(false)}>{useSVG(Close)}<span>Zamknij</span></button>
          </div>
        </div>
        <div>
        { 
          products.length ? 
            products.map(product => <ListItem remove={remove} product={product}></ListItem>):
            <p className={Styles['ListContainer--empty']}>Twoja lista jest pusta :(</p>
        }
        </div>
        {products.length ? <button className={Styles.ListContainer__ask} onClick={e => {
          console.log(window.auraAsk)
          if(window.auraAsk) {
            setList(false);
            window.auraAsk();
          } 
        }}>
          <span>Zapytaj o wybrane produkty</span> {useSVG(Mail)}
        </button>: ''}
      </div> }
    </div>
}

export default ListContainer;