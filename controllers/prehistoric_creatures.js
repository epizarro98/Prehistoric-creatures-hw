const express = require("express");
const router = express.Router();
const fs = require('fs');


   //PC INDEX ROUTE
router.get('/', function(req, res) {
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

//PC NEW ROUTE
router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/new')
})

//PC SHOW ROUTE                
router.get('/:idx', (req, res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric_creatures)
    let prehistoricIndex = req.params.idx
    console.log(prehistoricData[prehistoricIndex])
    res.render('prehistoric_creatures/show', {creatures: prehistoricData[prehistoricIndex], creaturesId: prehistoricIndex})
})


        //PC POST ROUTE
router.post('/', (req, res)=>{
        let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
        let prehistoricData = JSON.parse(prehistoric_creatures)
        prehistoricData.push(req.body) // push the new dino to the array
        //save the new dinoData array to the dinosaurs.json file
        // JSON.stringfy  does the opposite of JSON.parse
        fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
        //redirect to the GET /dinosaurs route (index)
        res.redirect('/prehistoric_creatures')
})


module.exports = router;