export function mostrarErro(erro: unknown): void {
    if (erro instanceof Error) {
        console.log(`[ERRO] - ${erro}`);
        return;
    }
    console.log(`[ERRO] - Ocorreu um erro desconhecido`);
}