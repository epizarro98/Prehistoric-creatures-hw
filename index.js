const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const dinosaurs = require('./controllers/dinosaurs')
const prehistoric_creatures = require('./controllers/prehistoric_creatures')


app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))
app.use('/dinosaurs', dinosaurs)
app.use('/prehistoric_creatures', prehistoric_creatures)


//----PREHISTORIC INDEX ROUTE ----//
app.get('/prehistoric_creatures', function(req, res) {
    
    let creatures =fs.readFileSync('./prehistoric_creatures.json') 
    let creaturesData = JSON.parse(creatures)
    let typeFilter = req.query.typeFilter
    if(typeFilter) { 
        creaturesData = creaturesData.filter((creatures)=>{
            return creatures.type.toLowerCase() === typeFilter.toLowerCase()
        })
    }
    res.render('prehistoric_creatures/index', {creatures: creaturesData})
})

// ----> DINO INDEX ROUTE <------
// app.get('/dinosaurs', (req, res)=>{
//     // take the text from dinosaurs.json and store it in a variable
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs) // convert the string to an array
    
//     // handle a query string if there is one
//     let nameFilter = req.query.nameFilter
//     if(nameFilter){ // reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore case)
//         dinoData = dinoData.filter(dino=>{
//             return dino.name.toLowerCase() === nameFilter.toLowerCase()
//         })
//     }
//     res.render('index', {dinosaurs: dinoData})
// })

// // //DINO NEW ROUTE
// // app.get('/dinosaurs/new', (req, res)=>{
    // //     res.render('dinosaurs/new')
    // // })
    
    //DINO SHOW ROUTE
    // app.get('/dinosaurs/:idx', (req, res)=>{
    //         let dinosaurs = fs.readFileSync('./dinosaurs.json')
    //         let dinoData = JSON.parse(dinosaurs)
        
    //         //get array index from url parameter
    //         let dinoIndex = req.params.idx
        
    //         console.log(dinoData[dinoIndex])
    //         res.render('dinosaurs/show', {dino: dinoData[dinoIndex], dinoId: dinoIndex})
    //     })

    // //DINO POST ROUTE
    // app.post('/dinosaurs', (req, res)=>{
//         let dinosaurs = fs.readFileSync('./dinosaurs.json')
//         let dinoData = JSON.parse(dinosaurs)
//         dinoData.push(req.body)//push the new dino to the party
//         fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
//         //redirect to thr GET dinosaurs route (index)
//         res.redirect('/dinosaurs')
//     })



//PC NEW ROUTE
// app.get('/prehistoric_creatures/new', (req, res)=>{
//         res.render('prehistoric_creatures/new')
//     })
    
    //PC SHOW ROUTE                
    // app.get('/prehistoric_creatures/:idx', (req, res)=>{
    //     let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    //     let prehistoricData = JSON.parse(prehistoric_creatures)
    //     let prehistoricIndex = req.params.idx
    //     console.log(prehistoricData[prehistoricIndex])
    //     res.render('prehistoric_creatures/show', {creature: prehistoricData[prehistoricIndex], creaturesId: prehistoricIndex})
    //         })
    //         //PC POST ROUTE
    //         app.post('/prehistoric_creatures', (req, res)=>{
    //                 let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    //                 let prehistoricData = JSON.parse(prehistoric_creatures)
    //                 prehistoricData.push(req.body) // push the new dino to the array
    //                 //save the new dinoData array to the dinosaurs.json file
    //                 // JSON.stringfy  does the opposite of JSON.parse
    //                 fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
    //                 //redirect to the GET /dinosaurs route (index)
    //                 res.redirect('/prehistoric_creatures')
    //                 console.log(req.body)
    //             })
            

            
            app.listen(8000, ()=> {
                console.log ('Youre listening')
            })