const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res) => {
        const {username, password, email, first_name, last_name} = req.body
        const db = req.app.get('db')
        const {session} = req
        const findUser = await db.check_username({username})
        if(findUser[0]) return res.status(409).send('Username already exists')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const createdUser = await db.register_user({
            username,
            password: hash,
            email,
            first_name,
            last_name
        })
        session.user = {id: createdUser[0].login_id, username: createdUser[0].username}
        res.status(200).send(session.user)
    },
    login: async (req,res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const {session} = req
        const findUser = await db.check_username({username})
        if(!findUser[0]) return res.status(409).send('Username does not exists')
        const auth = bcrypt.compareSync(password, findUser[0].password)
        if(auth){
            session.user = {
                id: findUser[0].id,
                username: findUser[0].username
            }
            res.status(200).send(session.user)
        }else{
            return res.status(401).send('Wrong username or password')
        }
    }




}