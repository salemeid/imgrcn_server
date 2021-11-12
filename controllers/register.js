const handleRegister = (req,res,db,bcrypt) => {
    const {email, name, password} = req.body
    if(!email || !name || !password) {
        return res.status(400).json("incorrect form submition")
    }
    var hash = bcrypt.hashSync(password);
    db.transaction(trx =>{
        trx.insert({
            email: email,
            hash: hash
        })
        .into('login')
        .returning('email')
        .then(logInEmail=>{
            return trx('users')
            .returning('*')
            .insert({
                email: logInEmail[0],
                name: name,
                joined: new Date()
            }) 
            .then(user=> {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })

    .catch(err=>res.status(400).json('unable to register'));
}

export default {
    handleRegister
} 