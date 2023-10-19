// requiring packages
const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname +'/date.js')
// app  (handles requests) object
const app = express()

// to use body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// will set the app's view engine to ejs (configuration settings)

app.set('view engine', 'ejs')

// same as 
// app.use('view engine', 'ejs')

const items = ['Buy Food', 'Cook Food', 'Eat Food']
const workList = []
app.get('/', function (req, res) {


    const day = date.getDay()
    
    res.render('list', {listName:"Normal", listTitle:day, items:items})
})

app.post('/', function (req, res){
    
    const item = req.body.newItem
    if(req.body.listName == 'Work'){
        workList.push(item)
        res.redirect('/work')
    }else{

        items.push(item)
        res.redirect('/')
    }

})

app.get('/work', function(req, res){

    res.render('list',{listName:"Work", listTitle:'Work List', items:workList})


})


app.listen(3000, function () {
    console.log('Server is listening on port 3000')
})











// app.set(name, data) stores a named property on the app object that can be retrieved later with app.get(name).
// Some property names for app.set() have predetermined effects that are described in the Express doc
// and work like configuration options.

// app.use() registers a middleware callback that will be part of the request handler chain for incoming http requests.
// Depending upon the arguments, the middleware will either be called for
// all incoming requests or only for certain requests.