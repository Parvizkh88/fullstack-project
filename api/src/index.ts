import express, { Application, Request, Response,  } from 'express';
import morgan from 'morgan';

import dev from './config';
import connectDatabase from './config/db';
// third party packages here
// import cors from 'cors';

// import bodyParser from 'body-parser';
// import {connectDB} from './config/db';

const app: Application = express();


// app.use(cors());
app.use(morgan('dev'));
// app.use(bodyParser.json());

const PORT = dev.app.serverPort;

app.get('/', (req: Request, res: Response) => { 
    res.status(200).send('api is running fine'); 
});

// app.use((err:Error, req:Request, res:Response,next:NextFunction)=>{
//   res.status(500).json({message:err.message});
  
// })

app.listen(PORT, async() => {
    console.log(`server is running at http://localhost:${PORT}`);
    await connectDatabase();
 }); 