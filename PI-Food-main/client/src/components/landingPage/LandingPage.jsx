import { useNavigate } from 'react-router-dom'
import './landingPage.css'
const LandingPage = ()=>{
    const navigate = useNavigate()

    return(
        <div className='conteiner-landing'>
            <button id="btn-home" onClick={()=>navigate(`/home`)}>HOME</button>
        </div>
    )

}

export default LandingPage

{/* <video className={styles.videobackground} autoPlay loop muted>
             <source src={FoodBackground} type="video/mp4" />
         </video> */}