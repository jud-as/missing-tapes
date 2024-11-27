import express from "express"

const app = express()

const users = []

app.post('/usuario', (request, response) => {
    console.log(Request)
    response.send('Ok POST')
})