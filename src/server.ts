import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';

class Server{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    public config(){
        const corsOptions = {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            preflightContinue: false,
            optionsSuccessStatus: 204
        }
        //db
        const MONGO_URI = 'mongodb://localhost/restapits';
        mongoose.set('useFindAndModify', false);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        }).then(db => console.log('DB connected!'));
        //Setting
        this.app.set('port', process.env.PORT || 3000);
        //middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors(corsOptions));
        this.app.use(fileUpload())
    }

    public routes(): void{
        const router: express.Router = express.Router();

        this.app.use('/', indexRoutes);
        // this.app.use('/api/products' + productRoutes);
        this.app.use('/api/products', productRoutes);
        this.app.use('/api/categories' , categoryRoutes);
    }

    public start(){
        this.app.listen(this.app.get('port'), () =>{
            console.info('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();