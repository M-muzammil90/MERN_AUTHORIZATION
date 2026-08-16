const Admin = async (req,res,next)=>{
    if(req.user && req.user.role === 'Admin'){
        res.status(200).json({message:"AdMIN SUCCESSFULY LOGIN"})
        next()
    }else{
        res.status(400).json({message:"your not login"})
    }
}
export default Admin