const crypto = require('crypto')

const SECRET_KEY = 'wjiol_8776#'

function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')

}


function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)

}

console.log('21ad503afd15c95d82adaf3ab84d6890'.length);

console.log(genPassword('123'));
