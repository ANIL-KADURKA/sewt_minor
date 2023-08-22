import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

/* prettier-ignore */
const PopUp = props => {
  const {show,onClickRemovePop} = props
   const onRemovePopUp = () => {
    onClickRemovePop()
   } 
  return (
    <div className={`popup ${show ? 'show' : ''}`}>
        <span className="hello-popup">Item Added to Cart! 
        <button
        className="delete-button-pop-up"
        type="button"
        onClick={onRemovePopUp}
        >
        <AiFillCloseCircle color="#616E7C" size={20} />
        </button>
        </span>
    </div>
  )
}

export default PopUp
