const express = require('express')


const app = express()
const port = process.env.PORT || 3001
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World con Node.js!')
}
)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}
)
 