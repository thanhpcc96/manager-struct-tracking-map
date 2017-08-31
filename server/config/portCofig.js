export default ()=>{
    const port= process.env.NODE_ENV === 'production' ? 80 : 3000
    return process.env.PORT || port;
}