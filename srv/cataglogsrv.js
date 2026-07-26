const cds = require('@sap/cds');
const { SELECT, INSERT, UPDATE } = require('@sap/cds/lib/ql/cds-ql');
const {Books} = cds.entities;

module.exports = srv =>{

    const db = cds.db;
    
    //READ
    // srv.on('READ', 'BooksSet', async(req, res)=>{
    //     results=[];
    //     results = await db.run([SELECT.from(Books).where({ID: req.data.ID})]);
    //     return results;
    // });

    //CREATE
    srv.before('CREATE', 'BooksSet', async(req, res)=>{
       if(req.data.price < 0) {
        return req.error('Price can not be negetive');
       }
    });

    //CREATE
    srv.on('CREATE', 'BooksSet', async(req, res)=>{
        results1 = [];
        results1 = await db.run([INSERT.into(Books).entries(req.data)])
        .then((resolve, reject)=>{
            if(resolve){
                return req.data;
            }else{
                return req.error(400, 'Failed to Create');
            }
        })
        .catch(err =>{
            return req.error(500, 'Server down, try again'+err.toString());
        })
        return results1;
    });

    //UPDATE
    srv.on('UPDATE', 'BooksSet', async(req, res)=>{
        results1 = [];
        results1 = await db.run([UPDATE(Books).set(req.data).where({ID: req.data.ID})])
        .then((resolve, reject)=>{
            if(resolve){
                return req.data;
            }else{
                return req.error(400, 'Failed to Update');
            }
        })
        .catch(err =>{
            return req.error(500, 'Server down, try again'+err.toString());
        })
        return results1;
    });

    srv.after('UPDATE', 'BooksSet', (data)=>{
        console.log(`Record Updated: ${data.ID}`);
    });

     //DELETE
    srv.on('DELETE', 'BooksSet', async(req, res)=>{
        results=[];
        results = await db.run([DELETE.from(Books).where({ID: req.data.ID})]);
        return results;
    });

}