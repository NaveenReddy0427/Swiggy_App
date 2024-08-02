import express from "express"

const app = express()

const PORT = 4001

app.use('/home', (req, res)=>{
    res.send('<h1>welcome to the swiggy app</h1>')
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})