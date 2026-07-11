export function header(nome: string): void {
    console.clear();
    console.log('='.repeat(45) + '\n' +' '.repeat(5) + `BookStore Manager CLI - ${ nome }\n` + '='.repeat(45) + '\n');
}