import {useState } from "react"
import { useDispatch } from "react-redux"
import { getRecipeAllName } from "../../redux/action"

const Search = ()=>{

    //-------capturamos el valor del input
    const [name,setName] = useState('')
    const dispatch = useDispatch()

    const handleChange =(event)=>{
       setName(event.target.value)

       
    }

    //------buscamos por el nombre
    const onSearch=(name)=> {
        dispatch(getRecipeAllName(name))
        setName("")
    }

    



    return(
        <div className="search-conteiner">
            <input className="buscarInput" onChange={handleChange} value={name} type='search' />
            <button className="buscarClick" onClick={()=>{onSearch(name)}}>
                <svg width="40px" height="40px" viewBox="100 100 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M887.3984 832.1024L704.1024 661.504c-5.3248-4.9152-11.8784-8.192-18.6368-9.8304 35.6352-51.6096 56.5248-114.2784 56.5248-181.6576 0-176.9472-143.5648-320.512-320.512-320.512S101.1712 293.0688 101.1712 470.016 244.5312 790.528 421.6832 790.528c79.0528 0 151.3472-28.672 207.2576-75.9808 2.048 6.144 5.7344 11.6736 10.6496 16.384l183.296 170.5984c16.384 15.1552 42.1888 14.336 57.344-2.048l9.216-10.0352c15.36-16.1792 14.336-41.984-2.048-57.344z m-465.7152-118.3744c-134.5536 0-243.712-109.1584-243.712-243.712s109.1584-243.712 243.712-243.712 243.712 109.1584 243.712 243.712-109.1584 243.712-243.712 243.712z" fill="#FFFE9F" /><path d="M850.5344 926.9248c-13.5168 0-26.8288-4.9152-37.4784-14.7456L629.5552 741.376c-1.6384-1.6384-3.2768-3.2768-4.9152-5.12-58.1632 44.4416-129.6384 68.608-203.1616 68.608-184.7296 0-334.848-150.3232-334.848-334.848C86.6304 285.2864 236.9536 135.168 421.6832 135.168s334.848 150.3232 334.848 334.848c0 62.464-16.9984 122.6752-49.5616 175.3088 2.4576 1.6384 4.9152 3.4816 6.9632 5.5296l183.296 170.5984c10.6496 10.0352 16.9984 23.552 17.408 38.2976 0.6144 14.7456-4.7104 28.672-14.7456 39.5264L890.88 909.312c-10.8544 11.6736-25.6 17.6128-40.3456 17.6128zM635.6992 689.7664l6.9632 20.0704c1.4336 4.096 3.6864 7.5776 6.7584 10.6496l183.296 170.5984c10.6496 9.8304 27.2384 9.216 37.0688-1.2288l9.216-10.0352c4.7104-5.12 7.168-11.6736 6.9632-18.8416-0.2048-6.9632-3.2768-13.5168-8.192-18.2272L694.272 671.9488c-3.2768-3.072-7.3728-5.3248-11.8784-6.3488l-20.6848-4.7104 12.0832-17.6128c35.2256-51.2 53.8624-111.2064 53.8624-173.4656 0-168.7552-137.216-305.9712-305.9712-305.9712S115.712 301.056 115.712 469.8112s137.216 305.9712 305.9712 305.9712c72.4992 0 142.7456-25.8048 197.8368-72.704l16.1792-13.312z m-214.016 38.5024c-142.336 0-258.2528-115.712-258.2528-258.2528s115.712-258.2528 258.2528-258.2528c142.336 0 258.2528 115.712 258.2528 258.2528s-115.9168 258.2528-258.2528 258.2528z m0-487.424C295.3216 240.8448 192.512 343.6544 192.512 470.016s102.8096 229.1712 229.1712 229.1712 229.1712-102.8096 229.1712-229.1712-102.8096-229.1712-229.1712-229.1712z" fill="#493B4E" /></svg>
            </button>
            
        </div>
    )
}
export default Search