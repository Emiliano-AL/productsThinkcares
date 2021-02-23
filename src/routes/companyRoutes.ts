import { Request, Response, Router } from 'express';
import Company from '../models/Company'

class CompanyRoutes{
    router: Router

    constructor(){
        this.router = Router()
        this.routes()
    }

    public async create(req:Request, res:Response): Promise<any>{
        console.log(req.body);
        const newCategory = new Company(req.body);
        await newCategory.save();
        res.json({status: res.status, data: newCategory});
    }

    public async getAll(req:Request, res:Response): Promise<any>{
        const companies = await Company.find();
        res.json(companies);
    }

    public async get(req:Request, res:Response): Promise<any>{
        console.log('in get', req.params.id);
        const companies = await Company.find({ _id: req.params.id });
        res.json(companies);
    }

    public async update(req:Request, res:Response): Promise<any>{
        const { id } = req.params;
        const company = await Company.findOneAndUpdate({id}, req.body);
        res.json({status: res.status, data: company});
    }

    public async remove(req:Request, res:Response): Promise<any>{
        await Company.findOneAndRemove({ _id: req.params.id });
        res.json({ response: 'deleted Successfully' });
    }

    public async search(req:Request, res:Response):Promise<any>{
        const companies = await Company.find({name: { $regex: '.*' + req.params.term + '.*' } });
        console.info(companies);
        res.json(companies);
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

const companies = new CompanyRoutes()
companies.routes()

export default companies.router