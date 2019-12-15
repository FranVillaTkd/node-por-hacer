const fs = require('fs');

let listadoPorHacer = [];

const crear= (descripcion) =>{

    let porHacer ={
        descripcion,
        completado : false
    }

    cargarDb();

    listadoPorHacer.push(porHacer);
    guardarDb();
    return porHacer;
}
const cargarDb = ()=>{
    try {
        listadoPorHacer = require("../DB/data.json");
    } catch (error) {
        listadoPorHacer = [];
    }
}

let guardarDb = () => {

    let data = JSON.stringify(listadoPorHacer);
    
    
    fs.writeFile(`DB/data.json`,data,err=>{
        if (err){
            throw new Error(err);
        }else{
            console.log(`Tarea Guardada Exitosamente`);
        }
    });

}

const getListado = ()=>{
    cargarDb();
    return listadoPorHacer;
}

const actualizar = (descripcion,completado = true) =>{

    cargarDb();

    let index = listadoPorHacer.findIndex(tarea =>{
        return tarea.descripcion === descripcion;
    })

    if(index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDb();
        return true;
    }else
    {
        return false;
    }

}

const borrar = (descripcion) =>{

    cargarDb()
    let borrado;
    let index = listadoPorHacer.findIndex(tarea =>{
        return tarea.descripcion === descripcion;
    })

    if(index >= 0){
        borrado = listadoPorHacer.splice(index,1);
        guardarDb();
        return borrado;
    }else
    {
        return borrado;
    }


}

module.exports = {
    crear,
    guardarDb,
    getListado,
    actualizar,
    borrar
}