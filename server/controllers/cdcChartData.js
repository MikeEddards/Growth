module.exports ={
    boyHeight_0_36: async (req, res) => {
        const db = req.app.get('db')
        const boyData = await db.select_0_36_height_boys()
        res.status(200).send(boyData)
    },
    girlHeight_0_36: async (req, res) => {
        const db = req.app.get('db')
        const boyData = await db.select_0_36_height_girls()
        res.status(200).send(boyData)
    }
}