const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res) => {
        const {username, email, first_name, last_name} = req.body
        const db = req.app.get('db')
        const {session} = req
        const findUser = await db.check_username({username})
        if(findUser[0]) return res.status(409).send('Username already exists')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const createdUser = await db.register_user({
            username,
            password: hash,
            email,
            first_name,
            last_name
        })
        session.user = {id: createdUser[0].id, username: createdUser[0].username}
        res.status(200).send(session.user)
    },
    login: async (req,res) => {
        const db = req.app.get('db')
        const {username} = req.body
        const {session} = req
        const findUser = await db.check_username({username})
        if(!findUser[0]) return res.status(409).send('Username does not exists')
        const auth = bcrypt.compareSync(req.body.password, findUser[0].password)
        if(auth){
            
            session.user = {
                id: findUser[0].id,
                username: findUser[0].username,
                email: findUser[0].email,
                first_name: findUser[0].first_name,
                last_name: findUser[0].last_name,
                image: findUser[0].image
            }
            res.status(200).send(session.user)
        }else{
            return res.status(401).send('Wrong username or password')
        }
    },
    getUserInfo: async (req, res) => {
        const db = req.app.get('db')
        const {session} = req
        if(session.user){
            const user = await db.user_info({id: session.user.id})
            const {
                id,
                username,
                email,
                first_name,
                last_name,
                image
            } = user[0]
            
            return res.status(200).send({
                id,
                username,
                email,
                first_name,
                last_name,
                image
            })
        }
        return res.status(401).send('Please Log In')
    },
    sessionUser: (req, res) => {
        const {session} = req
        if(session.user){
            return res.status(200).send(session.user)
        }else{
            return res.status(401).send('Please Log In')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    updateUser: async(req, res) => {

        const {email, first_name, last_name, image} = req.body
        const {session} = req
        const db = req.app.get('db')
        console.log(session.user.first_name)
        if(session.user){
            const userInfo = await db.update_user({
                id: session.user.id,
                email: email || session.user.email,
                first_name: first_name || session.user.first_name,
                last_name: last_name || session.user.last_name,
                image: image || session.user.image
            })
            return res.status(200).send(userInfo)
        }else{
            return res.status(401).send('Please Log In')
        }
    }
  



}