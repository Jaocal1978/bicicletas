import { Router } from "express";
import * as db from '../db/index.js';
import fs from "node:fs";
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.get("/", async (req, res) =>
{
    try 
    {
        const text = "SELECT * FROM bicicletas";
        const result = await db.query(text);

        res.json({ biciletas : result.rows })
    } 
    catch (error) {
        console.error(error);
        res.send(error);
    }
})

router.post("/", async (req, res) =>
{
    const { marca, modelo, precio } = req.body;

    if(marca && modelo && precio)
    {
        //solicitud correcta
        try 
        {
            const text = "INSERT INTO bicicletas(id, marca, modelo, precio) VALUES($1, $2, $3, $4) RETURNING *";
            const values = [uuidv4().slice(30), marca, modelo, Number(precio)];
            const result = await db.query(text, values);
            res.status(201).json({ status : 201, message:'Bicicleta creada con exito', bicicleta: result.rows });
        
        } 
        catch (error) 
        {
            console.error(error);
            res.send(error);
            res.status(500).json({ status:500 , message:'Error Interno Servidor' })
        }
    }
    else
    {
        //bad request
        res.status(400).json({ message:'bad request', status: '400', error: "Faltan parametros en el body"});
    }

    
})

router.put("/", async (req, res) =>
{
    const {id, marca, modelo, precio } = req.body;

    if(id && marca && modelo && precio)
    {
        //solicitud correcta
        try 
        {
            const text = "UPDATE bicicletas SET marca = $2, modelo = $3, precio = $4 WHERE id = $1 RETURNING *";
            const values = [id, marca, modelo, Number(precio)];
            const result = await db.query(text, values);
            res.status(202).json({ status : 201, message:'Bicicleta actualizada con exito', bicicleta: result.rows });
        } 
        catch (error) 
        {
            console.error(error);
            res.send(error);
            res.status(500).json({ status:500 , message:'Error Interno Servidor' })
        }
    }
    else
    {
        //bad request
        res.status(400).json({ message:'bad request', status: '400', error: "Faltan parametros en el body"});
    }
})

//http://localhost:3000/bicicletas?id=ea4217
router.delete("/", async (req, res) =>
{
    const { id } = req.query;

    if(id)
    {
        try 
        {
            const text = "DELETE FROM bicicletas WHERE id = $1";
            const values = [id];
            const result = await db.query(text, values);
            res.status(200).json({ status : 200, message:'Bicicleta eliminada con exito', bicicleta: result.rows });

            res.json({ bicicletas : result.rows })
        } 
        catch (error) {
            console.error(error);
            res.send(error);
        }
    }
    else
    {
        //bad request
        res.status(400).json({ message:'bad request', status: '400', error: "Faltan parametros en el body"});
    }
})

export { router };