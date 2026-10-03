import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

export async function perguntar(pergunta: string): Promise<string> {
    return rl.question(pergunta);
}

export function fecharInput(): void {
    rl.close();

}