module.exports ={
    boyHeight_0_36: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_0_36_height_boys()
        
        res.status(200).send(data)
    },
    girlHeight_0_36: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_0_36_height_girls()
        res.status(200).send(data)
    },
    boyWeight_0_36: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_0_36_weight_boys()
        res.status(200).send(data)
    },
    girlWeight_0_36: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_0_36_weight_girls()
        res.status(200).send(data)
    },
    boyHead_0_36: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_0_36_head_boys()
        res.status(200).send(data)
    },
    girlHead_0_36: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_0_36_head_girls()
        res.status(200).send(data)
    },
    boyBmi_2_20: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_2_20_bmi_boy()
        res.status(200).send(data)
    },
    girlBmi_2_20: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_2_20_bmi_girls()
        res.status(200).send(data)
    },
    boyHeight_2_20: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_2_20_height_boys()
        res.status(200).send(data)
    },
    girlHeight_2_20: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_2_20_height_girls()
        res.status(200).send(data)
    },
    boyWeight_2_20: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_2_20_weight_boys()
        res.status(200).send(data)
    },
    girlWeight_2_20: async (req, res) => {
        const db = req.app.get('db')
        const data = await db.select_2_20_weight_girls()
        res.status(200).send(data)
    }
}