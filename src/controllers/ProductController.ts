// import base64Img from 'base64-img'
const base64Img = require('base64-img')

export default class ProductController{
    async saveImageFile(image:any){
        await base64Img.img(image, './server/public', Date.now(), (err:any, filePath:string) => {
            const pathArr = filePath.split('/')
            const fileName = pathArr[pathArr.length -1]

            return fileName
        })
    }
}