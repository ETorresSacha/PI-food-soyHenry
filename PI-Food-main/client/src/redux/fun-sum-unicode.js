export const sumaUnicode = (string,index)=>{
    let total
    string = string.split('')
    string=string.map(element=>element.charCodeAt())
    total=string.reduce((acum,ind)=>acum+ind,index)
    return total
}