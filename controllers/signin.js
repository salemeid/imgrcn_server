const handleSignin = (req,res,db,bcrypt) =>{
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json("incorrect form submition")
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(async data=>{
           const isValid = bcrypt.compareSync(password, data[0].hash)    
            if (isValid) {
               try {
                    const user = await db.select('*').from('users')
                        .where('email', '=', email);
                    res.json(user[0]);
                } catch (err) {
                    return res.status(400).json('unable to get user lah!');
                }
            } else {
                res.status(400).json('wrong credintial1!')    
            }
            
        })
        .catch(err=> res.status(400).json('wrong credential'));
}

export default {
    handleSignin
}