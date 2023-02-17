const check = (body, constraints) => {
    for(let key in constraints) {
        if(!constraints[key].test(body[key])) {
            return constraints[key].error;
        }
    }
    return '';
}

module.exports = check;
