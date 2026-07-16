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

export function isEmailValido(email: string | undefined | null): boolean {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

export function isInteiroPositivo(valor: number | undefined | null): boolean {
  return typeof valor === 'number' && Number.isInteger(valor) && valor > 0;
}

export function isInteiroNaoNegativo(valor: number | undefined | null): boolean {
  return typeof valor === 'number' && Number.isInteger(valor) && valor >= 0;
}

export function isAnoValido(ano: number | undefined | null): boolean {
  const anoAtual = new Date().getFullYear();
  return typeof ano === 'number' && Number.isInteger(ano) && ano > 0 && ano <= anoAtual;
}
