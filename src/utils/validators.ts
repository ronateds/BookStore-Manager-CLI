export function isTextoValido(valor: string | undefined | null, minLength = 2): boolean {
    return typeof valor === 'string' && valor.trim().length >= minLength;
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
