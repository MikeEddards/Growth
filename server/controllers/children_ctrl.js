module.exports = {

    addChild: async (req,res) => {
        const {sex, first_name, last_name} = req.body
        const db = req.app.get('db')
        const {session} = req
        console.log(req.body)
        const createChild = await db.add_child({
            parent_id: session.user.id,
            sex,
            first_name,
            last_name
        })
        res.status(200).send(createChild)

    },
    addChildData: async (req, res) => {
        const {child_id, age, height, weight, head_size, image} = req.body
        const {session} = req
        const db = req.app.get('db')
        console.log(session.user.id)
        const childData = await db.new_child_data({
            parent_id: session.user.id,
            child_id,
            age, 
            height, 
            weight, 
            head_size, 
            image
        })
        res.status(200).send(childData)
    },
    getChildren: async (req, res) => {
        const db = req.app.get('db')
        const {session} = req
        if(session.user){
            const children = await db.get_children({
                parent_id: session.user.id
            })
            return res.status(200).send(children)
        }else{
            return res.status(401).send('Please Log Back In')
        }
    },
    getChildData: async (req, res) => {
        const db = req.app.get('db')
        const {session} = req
        const childId = +req.params.id
        if(session.user){
            const data = await db.get_child_data({
                child_id: childId,
                parent_id: session.user.id
            })
            return res.status(200).send(data[0])
        }else{
            return res.status(401).send('Please Log Back In')
        }
    },
    getAllchildrenData: async (req, res) => {
        const db = req.app.get('db')
        const {session} = req
        if(session.user){
            const data = await db.all_children_data({
                parent_id: session.user.id
            })
            return res.status(200).send(data)
        }else {
            return res.status(401).send('Please Log Back In')
        }
    }



}