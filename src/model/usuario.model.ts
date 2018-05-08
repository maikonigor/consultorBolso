import {Model} from '../model/model'

export class Usuario extends Model {
    codigo: number;
    nome: string;
    email: string;
    avatar: string;

    public getNome():string{
        return this.nome;
    }

}