'use strict';

const encrypt = textToEnc => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).slice(-2);

    const enc = textToEnc.split('')
        .map(textToChars)
        .map(byteHex)
        .join('');
    return enc;
}

const decrypt = encoded => {
    const dec = encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(charCode => String.fromCharCode(charCode))
        .join('');
    return dec;
}

module.exports = {
    encrypt,
    decrypt
}