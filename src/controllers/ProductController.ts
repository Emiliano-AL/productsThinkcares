// import base64Img from 'base64-img'
// const base64Img = require('base64-img')
import { Request, Response, Router } from 'express';
import Product from '../models/Product';

export class ProductController{
    // async saveImageFile(image:any){
    //     await base64Img.img(image, './server/public', Date.now(), (err:any, filePath:string) => {
    //         const pathArr = filePath.split('/')
    //         const fileName = pathArr[pathArr.length -1]

    //         return fileName
    //     })
    // }
    private constructor() { }
    
    private static instance:ProductController;
    
    public static getInstance(): ProductController {
        if (!ProductController.instance) {
            ProductController.instance = new ProductController();
        }

        return ProductController.instance;
    }
    
    public async create(req:Request, res:Response){
        const { title, sku, description, company } = req.body;
        try{
            const newProducto = new Product({title, sku, description, company});
            await newProducto.save();
            return  { status: res.status, data: newProducto,  err: false };
        }catch(err){
            console.log(err);
            return { err: true, data: err.errmsg };
        }
    }
    
    public async getAll( ): Promise< any >{
        const products = await Product.find().populate('company');
        return products;
    }

    
    public async get(req:Request): Promise<any>{
        const products = await Product.findById(req.params.id).populate('company');
        return products;
    }

    public async update(req:Request,  res:Response): Promise<any>{
        const { id } = req.params;
        try{
            const product = await Product.findOneAndUpdate({_id: id}, req.body);
            return {status: res.status, data: product};
        }catch(err){
            console.log(err);
            return;
        }
    }
    
    public async remove(req:Request): Promise<any>{
        try{
            await Product.findOneAndRemove({ _id: req.params.id });
            return { response: 'deleted Successfully' };
        }catch(err){
            console.log(err);
            return;
        }
    }
}