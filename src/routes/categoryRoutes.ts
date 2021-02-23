import { Request, Response, Router } from 'express';
import Category from '../models/Category'

class CategoryRoutes{
    router: Router

    constructor(){
        this.router = Router()
        this.routes()
    }

    public async create(req:Request, res:Response): Promise<any>{
        console.log(req.body);
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.json({status: res.status, data: newCategory});
    }

    public async getAll(req:Request, res:Response): Promise<any>{
        const categories = await Category.find();
        res.json(categories);
    }

    public async get(req:Request, res:Response): Promise<any>{
        console.log('in get', req.params.id);
        const categories = await Category.find({ _id: req.params.id });
        res.json(categories);
    }

    public async update(req:Request, res:Response): Promise<any>{
        const { id } = req.params;
        const category = await Category.findOneAndUpdate({id}, req.body);
        res.json({status: res.status, data: category});
    }

    public async remove(req:Request, res:Response): Promise<any>{
        await Category.findOneAndRemove({ _id: req.params.id });
        res.json({ response: 'deleted Successfully' });
    }

    public async search(req:Request, res:Response):Promise<any>{
        const categories = await Category.find({name: { $regex: '.*' + req.params.term + '.*' } });
        console.info(categories);
        res.json(categories);
    }

    routes(){
        this.router.get('/', this.getAll)
        this.router.get('/search/:term', this.search)
        this.router.get('/:id', this.get)
        this.router.post('/', this.create)
        this.router.put('/:id', this.update)
        this.router.delete('/:id', this.remove)
        this.router.delete('/:id', this.remove)
    }
}

const categories = new CategoryRoutes()
categories.routes()

export default categories.router