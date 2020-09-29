import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { JogadoresService } from '../jogadores/jogadores.service'

@Injectable()
export class CategoriasService {

    constructor (
        @InjectModel('Categoria') 
            private readonly categoriaModel: Model<Categoria>,
            private readonly jogadoresService: JogadoresService) {}

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {

        const { categoria } = criarCategoriaDto;

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

        if (categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} já cadastrada`);
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
        return await categoriaCriada.save();
    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada`);
        }        

        await this.categoriaModel.findOneAndUpdate({categoria}, {$set: atualizarCategoriaDto}).exec();
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void> {
        const categoria = params['categoria'];
        const idJogador = params['idjogador'];

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();                
        const jogadorCategoriaCadastrado = await this.categoriaModel.find({categoria}).where('jogadores').in(idJogador).exec();
        await this.jogadoresService.consultarJogadorPoId(idJogador);

        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada`);
        }         
        
        if (jogadorCategoriaCadastrado.length > 0) {
            throw new BadRequestException(`Jogador ${idJogador} já cadastrado na categoria ${categoria}`);
        }          

        categoriaEncontrada.jogadores.push(idJogador);
        await this.categoriaModel.findOneAndUpdate({categoria}, {$set: categoriaEncontrada}).exec();
    }

    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaModel.find().populate('jogadores').exec();
    }

    async consultarCategoriaPorId(categoria: string): Promise<Categoria> {
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).populate('jogadores').exec();

        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada`)
        }

        return await categoriaEncontrada;
    }
}
