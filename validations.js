const check_arguments = (nombre, a_paterno, a_materno, fecha_nacimiento, response) => {
    if (!nombre || !a_paterno || !a_materno || !fecha_nacimiento) {
        return false;
    }
    
    return true;
}

const empty_result = (results) => {
    if(results[0].length === 0){
        return true;
    }

    return false;
}

module.exports = {
    check_arguments,
    empty_result
};