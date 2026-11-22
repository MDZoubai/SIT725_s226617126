var express = require("express")
var app = express()

app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const cardList = [
    {
        title: "Kitten 2",
        image: "images/user-image.jpeg",
        link: "About Kitten 2",
        description: "Demo description about kitten 2",
    },
    {
        title: "Kitten 3",
        image: "images/livedemo.jpeg",
        link: "About Kitten 3",
        description: "Demo description about kitten 3",
    },
]

app.get("/api/cards", (req, res) => {
    res.json({ statusCode: 200, data: cardList, message: "Success" })
})

app.post("/api/cards", (req, res) => {
    const { title, image, link, description } = req.body
    if (!title || !image || !link || !description) {
        return res.status(400).json({ statusCode: 400, message: "All card fields are required" })
    }
    const newCard = { title, image, link, description }
    cardList.push(newCard)
    res.json({ statusCode: 200, data: newCard, message: "Card added" })
})

var port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("App listening to: " + port)
})