
module.exports = {

    weight_0_36: async (req, res) => {
        const list =  req.body
        const db = req.app.get('db')
        const mapList =  list.map((item, i) => {
          let insert = db.insert_weight_0_36({
                Sex: item.Sex,
                Agemos: item.Agemos,
                L: item.L,
                M: item.M,
                S: item.S,
                p3: item.P3,
                p5: item.P5,
                p10: item.P10,
                p25: item.P25,
                p50: item.P50,
                p75: item.P75,
                p90: item.P90,
                p95: item.P95,
                p97: item.P97
            })
           console.log(insert)
          
        })

        res.sendStatus(200)
    },
    bmi_2_20: async (req, res) => {
        const list =  req.body
        const db = req.app.get('db')
        const mapList =  list.map((item, i) => {
          let insert = db.insert_bmi_2_20({
                Sex: item.Sex,
                Agemos: item.Agemos,
                L: item.L,
                M: item.M,
                S: item.S,
                p3: item.P3,
                p5: item.P5,
                p10: item.P10,
                p25: item.P25,
                p50: item.P50,
                p75: item.P75,
                p90: item.P90,
                p95: item.P95,
                p97: item.P97
            })
           console.log(insert)
          
        })

        res.sendStatus(200)
    },
    head_size: async (req, res) => {
        const list =  req.body
        const db = req.app.get('db')
        const mapList =  list.map((item, i) => {
          let insert = db.insert_head_size({
                Sex: item.Sex,
                Agemos: item.Agemos,
                L: item.L,
                M: item.M,
                S: item.S,
                p3: item.P3,
                p5: item.P5,
                p10: item.P10,
                p25: item.P25,
                p50: item.P50,
                p75: item.P75,
                p90: item.P90,
                p95: item.P95,
                p97: item.P97
            })
           console.log(insert)
          
        })

        res.sendStatus(200)
    },
    height_0_36: async (req, res) => {
        const list =  req.body
        const db = req.app.get('db')
        const mapList =  list.map((item, i) => {
          let insert = db.insert_height_0_36({
                Sex: item.Sex,
                Agemos: item.Agemos,
                L: item.L,
                M: item.M,
                S: item.S,
                p3: item.P3,
                p5: item.P5,
                p10: item.P10,
                p25: item.P25,
                p50: item.P50,
                p75: item.P75,
                p90: item.P90,
                p95: item.P95,
                p97: item.P97
            })
           console.log(insert)
          
        })

        res.sendStatus(200)
    },
    height_2_20: async (req, res) => {
        const list =  req.body
        const db = req.app.get('db')
        const mapList =  list.map((item, i) => {
          let insert = db.insert_height_2_20({
                Sex: item.Sex,
                Agemos: item.Agemos,
                L: item.L,
                M: item.M,
                S: item.S,
                p3: item.P3,
                p5: item.P5,
                p10: item.P10,
                p25: item.P25,
                p50: item.P50,
                p75: item.P75,
                p90: item.P90,
                p95: item.P95,
                p97: item.P97
            })
           console.log(insert)
          
        })

        res.sendStatus(200)
    },
    weight_2_20: async (req, res) => {
        const list =  req.body
        const db = req.app.get('db')
        const mapList =  list.map((item, i) => {
          let insert = db.insert_weight_2_20({
                Sex: item.Sex,
                Agemos: item.Agemos,
                L: item.L,
                M: item.M,
                S: item.S,
                p3: item.P3,
                p5: item.P5,
                p10: item.P10,
                p25: item.P25,
                p50: item.P50,
                p75: item.P75,
                p90: item.P90,
                p95: item.P95,
                p97: item.P97
            })
           console.log(insert)
          
        })

        res.sendStatus(200)
    }
    
}