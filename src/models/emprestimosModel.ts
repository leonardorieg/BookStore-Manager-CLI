export interface Emprestimo {
    id_emprestimo: number;
    id_livro: number;
    titulo_livro: string;
    id_cliente: number;
    nome_cliente: string;
    id_status: string | null;
    emprestado_em: Date;
    devolvido_em: Date | null;
}