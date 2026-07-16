type retornoValidacao = {
    ok: boolean,
    msg: string | undefined
}

export function isTextoValido(valor: string | undefined | null, minLength = 2): retornoValidacao {
    let retorno: retornoValidacao = {
        ok: false,
        msg: undefined
    }

    if (typeof valor !== 'string') {
        retorno.msg = 'Não é uma string';
        return retorno
    }

    const texto = valor.trim();
    if (texto.length < minLength) {
        retorno.msg = `Não tem pelo menos ${minLength} caracteres`;
        return retorno
    }


    // Regex que testa se string é apenas texto
    if(!(/^[\p{L} ]+$/u.test(texto))) {
        retorno.msg = 'Texto aceita apenas letras e espaço';
        return retorno
    }

    retorno.ok = true;
    return retorno
}