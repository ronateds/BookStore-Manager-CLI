export function isTextoValido(valor: string | undefined | null, minLength = 2): boolean {
    return typeof valor === 'string' && valor.trim().length >= minLength;
}