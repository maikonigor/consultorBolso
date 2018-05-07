import {Model} from '../model/model'

export class Usuario extends Model {
    codigo: number;
    nome: string;
    email: string;
    login: string;
    senha: string;
}