import { useNavigate } from 'react-router-dom'
import './homePage.css'
const HomeCard = ({recipesAll})=>{
    const navigate = useNavigate()
//console.log(recipesAll.map(ele=>ele.instructions))

    return(
            <div className="conteiner-car">
                {recipesAll.map(({id,title,image,diets})=>{
                    return(
                        <div key={id} className='cards'>
                            <div  className='car-detail'>
                                <h2 id='title-card'>{title}</h2>
                                <img  id='image-card' onClick={()=>navigate(`/detail/${id}`)} src={image} alt={title} />
                        
                                <h3 id='diet-title-card'>Tipos deDietas</h3>
                                <h4 id='diet-card' >{diets?.map((ele,index)=>(
                                                    <div key={index}>
                                                        <li>{ele}</li>
                                                    </div>)
                                            )}
                                </h4>

                            </div>
                        </div>
                        
                    )})}
            </div>
    )
}

export default HomeCard

      {/* <h3>Instruciones</h3>
                            <h4>{instructions}</h4> */}
                            {/* <h4 >{instructions?.map((ele,index)=>(
                                                <div key={index}>
                                                    <li>{ele}</li>
                                                </div>)
                                        )}
                            </h4> */}
