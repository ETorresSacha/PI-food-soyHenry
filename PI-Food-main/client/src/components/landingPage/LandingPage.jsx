import { useNavigate } from 'react-router-dom'
import video from '../../video/video.mp4'
import './landingPage.css'
const LandingPage = ()=>{
    const navigate = useNavigate()

    return(
        <div className='conteiner-landing'>
            <video  className='video'autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>

            <div className='absolute'>
                <button id="btn-home" onClick={()=>navigate(`/home`)}>HOME</button>
            </div>
            
        </div>
    )

}

export default LandingPage

       {/* <video  className='video'autoPlay loop muted>
                <source src={video} type="video/mp4" />
                </video> */}