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
        retorno.msg = `Não tem pelo menos ${ minLength } caracteres`;
        return retorno
    }

    // Regex que testa se string é apenas texto
    if (!(/^[\p{L} ]+$/u.test(texto))) {
        retorno.msg = 'Texto aceita apenas letras e espaço';
        return retorno
    }

    retorno.ok = true;
    return retorno
}

export function isTituloValido(valor: string | undefined | null, minLength = 2): retornoValidacao {
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
        retorno.msg = `Não tem pelo menos ${ minLength } caracteres`;
        return retorno
    }

    if (!(/^[\p{L}\d ]+$/u.test(texto))) {
        retorno.msg = 'Texto aceita apenas letras e espaço';
        return retorno
    }

    retorno.ok = true;
    return retorno
}

export function isAnoValido(ano: number | undefined | null): retornoValidacao {
    const anoAtual = new Date().getFullYear();
    if (typeof ano === 'number' && Number.isInteger(ano) && ano <= anoAtual) {
        return {
            ok: true,
            msg: undefined
        }
    } else {
        return {
            ok: false,
            msg: 'Ano inválido'
        }
    }
}

export function isInteiroNaoNegativo(valor: number | undefined | null): retornoValidacao {
    if (typeof valor === 'number' && Number.isInteger(valor) && valor >= 0) {
        return {
            ok: true,
            msg: undefined
        }
    } else {
        return {
            ok: false,
            msg: 'Numero inválido, entre um numero inteiro não negativo.'
        }
    }
}


export function isEmailValido(email: string | undefined | null): boolean {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

export function isInteiroPositivo(valor: number | undefined | null): boolean {
    return typeof valor === 'number' && Number.isInteger(valor) && valor > 0;
}
