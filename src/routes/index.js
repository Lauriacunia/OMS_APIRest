const express = require('express');
const router = express.Router();

const Country = require('../models/country');
const Infected = require('../models/infected');


/* ～●～●～●～●～●～●～●～●～●～●～ 
         Infected Routes
   ～●～●～●～●～●～●～●～●～●～●～ 
*/

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
        if(!infected) return res.status(404).send({message: `El registro buscado no existe en nuestra base de datos`})
        res.status(200).send({ infected })
    })
})


router.get('/infected/name/:first_name', (req,res) => {

    const nameInfected = req.params.first_name

    Infected.find({first_name: nameInfected}, (err, infected) => {
        if(err) return res.status(500).send({message: `Error al buscar el registro, Nombre: ${nameInfected}`})
        if(!infected) return res.status(404).send({message: `El registro buscado:  Nombre: ${nameInfected} no existe en nuestra base de datos`})
        res.status(200).send({ infected })
    })
})


router.get('/infected/lastname/:last_name', (req,res) => {
    const lastnameInfected = req.params.last_name

    Infected.find({last_name: lastnameInfected}, (err, infected) => {
        if(err) return res.status(500).send({message: `Error al buscar el registro, nombre: ${lastnameInfected}`})
        if(!infected) return res.status(404).send({message: `El registro buscado:  nombre: ${lastnameInfected} no existen en nuestra base de datos`})
        res.status(200).send({ infected })
    })
})


router.get('/infected/fullname/:firstname/:last_name', (req,res) => {
    const nameInfected = req.params.first_name
    const lastnameInfected = req.params.last_name

    Infected.find({$or:[{first_name: nameInfected},{last_name: lastnameInfected}]}, (err, infected) => {
        if(err) return res.status(500).send({message: `Error al buscar el registro, Nombre: ${nameInfected} , Apellido:${lastnameInfected}`})
        if(!infected) return res.status(404).send({message: `El registro buscado,  Nombre:  ${nameInfected} Apellido: ${lastnameInfected} no existe en nuestra base de datos`})
        res.status(200).send({ infected })       
    })
})

router.get('/infected/age/lte/:age', (req,res) => {

    const limitAgeInfected = req.params.age

    Infected.find({age:{$lte:limitAgeInfected}}, (err, infected) => {
        if(err) return res.status(500).send({message: `Error al buscar los registros, Edad menor o igual a: ${limitAgeInfected}`})
        if(!infected) return res.status(404).send({message: `Los registros buscados:  Edad menor o igual a: ${limitAgeInfected} no existen en nuestra base de datos`})
        res.status(200).send({ infected })
    })
})

router.get('/infected/age/gt/:age', (req,res) => {

    const limitAgeInfected = req.params.age

    Infected.find({age:{$gt:limitAgeInfected}}, (err, infected) => {
        if(err) return res.status(500).send({message: `Error al buscar los registros, Edad mayor a: ${limitAgeInfected}`})
        if(!infected) return res.status(404).send({message: `Los registros buscados:  Edad mayor a: ${limitAgeInfected} no existen en nuestra base de datos`})
        res.status(200).send({ infected })
    })
})

router.get('/infected/country/:country', (req,res) => {

    const countryInfected = req.params.country

    Infected.find({country: countryInfected}, (err, infected) => {
        if(err) return res.status(500).send({message: `Error al buscar el registro, País: ${countryInfected}`})
        if(!infected) return res.status(404).send({message: `El registro buscado:  País: ${countryInfected} no existen en nuestra base de datos`})
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
    infected.infect_date = Date.now();
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
            res.status(200).send({message: `El dato ${infected} ha sido borrado de nuestra DB`})
        })       
    })
})

/* ～●～●～●～●～●～●～●～●～●～●～ 
         Country Routes
   ～●～●～●～●～●～●～●～●～●～●～ 
*/

router.get('/countries', (req, res) => { 
    Country.find({}, (err, countries) => {
        if(err) return res.status(500).send({message: `Error al buscar todos los registros`})
        if(!countries) return res.status(404).send({message: 'La informacion solicitada no existe en nuestra base de datos'})
        res.status(200).send({ countries })
    })
})

router.get('/countries/:id', (req, res) => { 
    let countryId = req.params.id
    Country.findById(countryId, (err, country) =>{
        if(err) return res.status(500).send({message: `Error al buscar el registro Id: ${countryId} `})
        if(!country) return res.status(404).send({message: 'El registro buscado no existe en nuestra base de datos'})
        res.status(200).send({ country })
    })
})

router.get('/countries/name/:name', (req,res) => {

    const nameCountry = req.params.name

    Country.find({name: nameCountry}, (err, country) => {
        if(err) return res.status(500).send({message: `Error al buscar el registro, País: ${nameCountry}`})
        if(!country) return res.status(404).send({message: `El registro buscado:  País: ${nameCountry} no existe en nuestra base de datos`})
        res.status(200).send({ country })
    })
})
  
router.post('/countries', (req,res) => {
    let body = req.body
    let country = new Country();

    country.name = body.name
    country.infected = body.infected

    country.save((err, countryStored) => {
        if(err) res.status(500).send({message: `Error al guardar la información en la base de datos: ${err}`})
        res.status(200).send({country: countryStored})
    })
})

router.put('/countries/:id', (req,res) => {
    let id = req.params.id
    let bodyUpdate = req.body

    Country.findByIdAndUpdate(id, bodyUpdate, (err, countryUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar los datos del registro: ${err}`})
        res.status(200).send({ countryUpdated })
    })
})

router.delete('/countries/:id', (req,res) => {
    let countryId = req.params.id
    Country.findById(countryId, (err, country) =>{
        if(err) return res.status(500).send({message: `Error al borrar el registro Id: ${countryId} `})
        country.remove(err => {
            if(err) res.status(500).send({message: `Error al borrar el registro de la base de datos: ${err}`})
            res.status(200).send({message: `El dato: ${country} ha sido borrado de nuestra DB`})
        })       
    })
})


module.exports = router;