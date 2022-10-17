const mysql = require('mysql');

const conexion = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"A1e3i5o7u9%",
    database:"ejercicio_tecnico"
});

conexion.connect(err =>{
    if(err) throw err
    console.log('Conectado a la DB')
})

const obtenerUrlId = (req)=>{
    const {url} = req;

    let param = url.split("?")[1];
    let idKey = param.split("=")[0];
    let IdValue = param.split("=")[1];

    return {
        idKey: IdValue
    }
}


const consultarArticulo = (resquest,callback)=>{

    try {
        console.log(resquest.body)
        const {id} = resquest.body;
        let storeProcedure = `CALL consultarArticulo(${id})`
        conexion.query(storeProcedure, true, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
    
            
            callback(results[0] ?? { response: 'no_data'} )
    
          });
    } catch (error) {
        throw error
    }
}

const agregarArticulo = (resquest,callback)=> {
    try {
        console.log(resquest.body)
        const data = Object.values(resquest.body).map(v=> `'${v}'`).join(',');

        let storeProcedure = `CALL insertarArticulo(${data})`
        conexion.query(storeProcedure, true, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
            callback({ response: 'insertado'} )
    
          });
    } catch (error) {
        throw error
    }
}

const actualizarArticulo = (resquest,callback)=>{


    const data = Object.values(resquest.body).map(v=> `'${v}'`).join(',');
    let storeProcedure = `CALL actualizarArticulo(${data})`
    conexion.query(storeProcedure, true, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        
        callback({ response: 'actualizado'} )

      });
}

const eliminarArticulo = (resquest,callback)=>{


    const {id} = resquest.body
    let storeProcedure = `CALL eliminarArticulo(${id})`
    conexion.query(storeProcedure, true, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        
        callback({ response: 'eliminado'} )

      });
}

const consultarDepartamentos = (resquest,callback)=>{

    try {
        console.log(resquest.body)
        const {id} = resquest.body;
        let storeProcedure = `CALL ConsultarDepartamentos`
        conexion.query(storeProcedure, true, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
    
            
            callback(results[0] ?? { response: 'no_data'} )
    
          });
    } catch (error) {
        throw error
    }
}

const consultarDepartamentoSku = (resquest,callback)=>{

    try {
        console.log(resquest.body)
        const {id} = resquest.body;
        let storeProcedure = `CALL consultarDepartamentoSku(${id})`
        conexion.query(storeProcedure, true, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
    
            
            callback(results[0] ?? { response: 'no_data'} )
    
          });
    } catch (error) {
        throw error
    }
}


const consultarClases = (resquest,callback)=>{

    try {
        console.log(resquest.body)
        const {id} = resquest.body;
        let storeProcedure = `CALL consultarClases(${id})`
        conexion.query(storeProcedure, true, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
    
            
            callback(results[0] ?? { response: 'no_data'} )
    
          });
    } catch (error) {
        throw error
    }
}

const consultarClaseSku = (resquest,callback)=>{

    try {
        console.log(resquest.body)
        const {idSku} = resquest.body;
        let storeProcedure = `CALL consultarClaseSku(${idSku})`
        conexion.query(storeProcedure, true, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
    
            console.log(results[0])
            callback(results[0] ?? { response: 'no_data'} )
    
          });
    } catch (error) {
        throw error
    }
}

const consultarFamilias = (resquest,callback)=>{

    try {
        console.log(resquest.body)
        const {idDepartamento,idClase} = resquest.body;
        let storeProcedure = `CALL consultarFamilias(${idDepartamento},${idClase})`
        conexion.query(storeProcedure, true, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
    
            
            callback(results[0] ?? { response: 'no_data'} )
    
          });
    } catch (error) {
        throw error
    }
}

const consultarFamiliaSku = (resquest,callback)=>{

    try {
        console.log(resquest.body)
        const {idSku} = resquest.body;
        let storeProcedure = `CALL consultarFamiliaSku(${idSku})`
        conexion.query(storeProcedure, true, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
    
            console.log(results[0])
            callback(results[0] ?? { response: 'no_data'} )
    
          });
    } catch (error) {
        throw error
    }
}


module.exports = {
    consultarArticulo,
    agregarArticulo,
    actualizarArticulo,
    eliminarArticulo,
    consultarDepartamentos,
    consultarDepartamentoSku,
    consultarClases,
    consultarClaseSku,
    consultarFamilias,
    consultarFamiliaSku
}