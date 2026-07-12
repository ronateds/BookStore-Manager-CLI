export function header(nome: string, msg: string | null = null): void {
    console.clear();
    console.log('='.repeat(50) + '\n' +' '.repeat(5) + `BookStore Manager CLI - ${ nome }\n` + '='.repeat(50) + '\n');
    if(msg) {
        console.log(msg, '\n');
    }
}