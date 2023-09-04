const mysql = require('mysql');
let { check_arguments, empty_result } = require('./validations');

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

connection.connect();

const getFoto = (request, response) => {

    try{

        const { nombre, a_paterno, a_materno, fecha_nacimiento } = request.query;
    
        if (check_arguments( nombre, a_paterno, a_materno, fecha_nacimiento )){
            
            connection.query(`CALL GetPersonPhoto(?, ?, ?, ?)`,[nombre, a_paterno, a_materno, fecha_nacimiento],
                (error, results) => {
                    
                    if (empty_result(results)) {
                        response.status(400).json({ message: "Registro no encontrado"});
                    } else {

                        const jsonResults = JSON.parse(JSON.stringify(results[0]));
                        const imagen = Buffer.from(jsonResults[0].IMAGEN).toString('base64');
    
                        if (jsonResults[0] && jsonResults[0].IMAGEN) {
                            jsonResults[0].IMAGEN =`data:image/jpeg;base64,${imagen}`;
                        }
    
                        response.status(200).json(jsonResults);
                    }
                    
                }
            ); 
        }else {
            response.status(400).json({
                message: "Faltan parámetros requeridos"
            });
        }
    
    } catch ( error ) {
        response.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
  getFoto
};
