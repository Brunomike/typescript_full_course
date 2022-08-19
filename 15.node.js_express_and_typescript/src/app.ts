import express, { Request, Response, NextFunction } from 'express';

import todoRoutes from './routes/todos';

const port = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});


//npm i --save-dev @types/node nodemon
