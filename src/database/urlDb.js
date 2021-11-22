/*const user = "fgoyec4";
const pass = "fabiaN0889";*/
const database = "db_web32";


module.exports ={// exportando la url de conexión
    db:`mongodb+srv://${process.env.NODE_USER_DB}:${process.env.NODE_PASS_DB}@cluster0.rqvt2.mongodb.net/${database}`//acá se coloca la url de mongo atlas
} 
