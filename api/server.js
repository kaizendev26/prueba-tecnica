
const http = require('http');
const {
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
      } = require('./dbconection.js')

const { bodyParser } = require('./bodyParser.js') 

const CORS_HEADERS = {
    "Access-Control-Allow-Origin":"*", // REQUIRED CORS HEADER
    "Access-Control-Allow-Methods":"GET, POST, DELETE, PUT, PATCH", // REQUIRED CORS HEADER
    "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept" // REQUIRED CORS HEADER
}

const requestClient = (res,head,write)=>{

    const { status, type } = head;

    res.writeHead(status,CORS_HEADERS);
    if(status === 200)
        res.write(JSON.stringify(write));
    if(status == 400)
        res.write(write);

    res.end()
}


const obtenerArticulo = async(req, res)=>{
    try {
        await bodyParser(req)
        consultarArticulo(req,(response)=>{
            requestClient(res,{status:200,type:"application/json"},response)
        })
    } catch (error) {
        console.log(error)
        requestClient(res,{status:400,type:"text/plain"},error)
    }

}

const insertarArticulo = async(req, res)=>{
    try {
        await bodyParser(req)
        agregarArticulo(req,(response)=>{
            requestClient(res,{status:200,type:"application/json"},response)
        })
    } catch (error) {
        requestClient(res,{status:400,type:"text/plain"},error)
    }
}

const cambiarArticulo = async(req, res)=>{
    try {
        await bodyParser(req)
        actualizarArticulo(req,(response)=>{
            requestClient(res,{status:200,type:"application/json"},response)
        })
    } catch (error) {
        requestClient(res,{status:400,type:"text/plain"},error)
    }
}

const removerArticulo = async(req, res)=>{
    try {
        await bodyParser(req)
        eliminarArticulo(req,(response)=>{
            requestClient(res,{status:200,type:"application/json"},response)
        })
    } catch (error) {
        requestClient(res,{status:400,type:"text/plain"},error)
    }
}

const obtenerDepartamentos = async(req, res)=>{
    try {
        await bodyParser(req)
        consultarDepartamentos(req,(response)=>{
            requestClient(res,{status:200,type:"application/json"},response)
        })
    } catch (error) {
        requestClient(res,{status:400,type:"text/plain"},error)
    }

}


const obtenerDepartamentoSku = async(req, res)=>{
    try {
        await bodyParser(req)
        consultarDepartamentoSku(req,(response)=>{
            requestClient(res,{status:200,type:"application/json"},response)
        })
    } catch (error) {
        requestClient(res,{status:400,type:"text/plain"},error)
    }

}


const obtenerClases = async(req, res)=>{
    try {
        await bodyParser(req)
        consultarClases(req,(response)=>{
            requestClient(res,{status:200,type:"application/json"},response)
        })
    } catch (error) {
        requestClient(res,{status:400,type:"text/plain"},error)
    }

}

const obtenerClaseSku = async(req, res)=>{
    try {
        await bodyParser(req)
        consultarClaseSku(req,(response)=>{
            requestClient(res,{status:200,type:"application/json"},response)
        })
    } catch (error) {
        requestClient(res,{status:400,type:"text/plain"},error)
    }

}

const obtenerFamilias = async(req, res)=>{
    try {
        await bodyParser(req)
        consultarFamilias(req,(response)=>{
            requestClient(res,{status:200,type:"application/json"},response)
        })
    } catch (error) {
        requestClient(res,{status:400,type:"text/plain"},error)
    }

}

const obtenerFamiliaSku = async(req, res)=>{
    try {
        await bodyParser(req)
        consultarFamiliaSku(req,(response)=>{
            requestClient(res,{status:200,type:"application/json"},response)
        })
    } catch (error) {
        requestClient(res,{status:400,type:"text/plain"},error)
    }

}


var server = http.createServer(function (req, res) {   

    const {url,method} = req;

    switch(method){
        case 'POST':
            if(url === '/articulo'){
                obtenerArticulo(req, res)
            }
            if(url === '/insertarArticulo'){
                insertarArticulo(req, res)
            }
            if(url === '/actualizarArticulo'){
                cambiarArticulo(req, res)
            }
            if(url === '/eliminarArticulo'){
                removerArticulo(req, res)
            }
            if(url === '/departamentos'){
                obtenerDepartamentos(req, res)
            }
            if(url === '/departamento'){
                obtenerDepartamentoSku(req, res)
            }
            if(url === '/clases'){
                obtenerClases(req, res)
            }
            if(url === '/clase'){
                obtenerClaseSku(req, res)
            }
            if(url === '/familias'){
                obtenerFamilias(req, res)
            }
            if(url === '/familia'){
                obtenerFamiliaSku(req, res)
            }
            break;
        case "OPTIONS":
            res.writeHead(200,CORS_HEADERS);
            res.end();
		break;
        default:
            requestClient(res,{status:400,type:"text/plain"},"404 Not Found")
    }



}); 

server.listen(5000);

console.log('Node.js web server at port 5000 is running..')