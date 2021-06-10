const express = require('express');
const router = express.Router();

const Country = require('../models/country');
const Infected = require('../models/infected');

// Infected Routes

router.get('/infected', (req, res) => { 
    Infected.find({}, (err, infectados) => {
        if(err) return res.status(500).send({message: `Error al buscar todos los registros`})
        if(!infectados) return res.status(404).send({message: 'La informacion solicitada no existe en nuestra base de datos'})
        res.status(200).send({ infectados })
    })
})

router.get('/infected/:id', (req, res) => { 
    let infectedId = req.params.id
    Infected.findById(infectedId, (err, infected) =>{
        if(err) return res.status(500).send({message: `Error al buscar el registro Id: ${infectedId} `})
        if(!infected) return res.status(404).send({message: 'El registro buscado no existe en nuestra base de datos'})
        res.status(200).send({ infected })
    })
})

  
router.post('/infected', (req,res) => {
    let body = req.body
    console.log(body)
    let infected = new Infected();
     console.log(infected)

    infected.first_name = body.first_name
    infected.last_name = body.last_name
    infected.country = body.country
    infected.live = body.live
    infected.age = body.age
    infected.infect_date = body.infect_date
    infected.female = body.female
    
    console.log(infected)

    infected.save((err, infectedStored) => {
        if(err) res.status(500).send({message: `Error al guardar la información en la base de datos: ${err}`})
        res.status(200).send({infected: infectedStored})
    })
})

router.put('/infected/:id', (req,res) => {
    let id = req.params.id
    let bodyUpdate = req.body

    Infected.findByIdAndUpdate(id, bodyUpdate, (err, infectedUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar los datos del registro: ${err}`})
        res.status(200).send({ infectedUpdated })
    })
})

router.delete('/infected/:id', (req,res) => {
    let infectedId = req.params.id
    Infected.findById(infectedId, (err, infected) =>{
        if(err) return res.status(500).send({message: `Error al borrar el registro Id: ${infectedId} `})
        infected.remove(err => {
            if(err) res.status(500).send({message: `Error al borrar el registro de la base de datos: ${err}`})
            res.status(200).send({message: 'El dato ha sido borrado de nuestra DB'})
        })       
    })
})

module.exports = router;