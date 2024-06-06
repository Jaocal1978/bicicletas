import express from 'express';

//Importamos rutas
import { router as bicicletas } from './routes/bicicletas.js';

const app = express();

app.use(express.json());
app.use("/bicicletas", bicicletas);

app.listen(3000, () =>
{
    console.log("App en puerto 3000")
})