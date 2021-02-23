import { Request, Response, Router } from 'express';
import  CategoryContrller from "../controllers/CategoryContrller";
import  ProductController from "../controllers/ProductController";
import Product from '../models/Product';
import { UploadedFile } from 'express-fileupload';
// import UploadedFile from 'express-fileupload'

class ProductRoutes{
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public async create(req:Request, res:Response): Promise<any>{
        if(req.files){
            let myFile  = req.files.image as UploadedFile
            let nameToSave = myFile.name.split('.')
            let nameFile = `${nameToSave[0]}_${Date.now()}.${nameToSave[1]}`
            myFile.mv('public/' + nameFile)
        
            // const catCtrl = new CategoryContrller()
            const { title, sku, description, category } = req.body;
            // const cat = await catCtrl.getCategorieOrCreateByName(category)
            // const catgoryId = cat._id
            let image = nameFile
            const newProducto = new Product({title, sku, description, image});
            await newProducto.save();
            res.json({status: res.status, data: newProducto});
        }
    }

    public async getAll(req:Request, res:Response): Promise<any>{
        const products = await Product.find();
        res.json(products);
    }

    public async get(req:Request, res:Response): Promise<any>{
        const products = await Product.find({ _id: { $regex: req.params.id } });
        res.json(products);
    }

    public async update(req:Request, res:Response): Promise<any>{
        const { id } = req.params;
        const product = await Product.findOneAndUpdate({id}, req.body);
        res.json({status: res.status, data: product});
    }

    public async remove(req:Request, res:Response): Promise<any>{
        await Product.findOneAndRemove({ _id: req.params.id });
        res.json({ response: 'deleted Successfully' });
    }

    routes(){
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.get);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.remove);
    }
}
const products = new ProductRoutes();
products.routes();

export default products.router;