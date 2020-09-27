import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//import * as uuid from 'uuid/v1' decrepted
//import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {

    //private jogadores: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name)

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}    

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {

        const { email } = criarJogadorDto;

        //const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado){
            //await this.atualizar(jogadorEncontrado, criarJogadorDto)
            await this.atualizar(criarJogadorDto)
        } else {
            //this.logger.log(`criaJogadorDto: ${criarJogadorDto}`)
            await this.criar(criarJogadorDto);
        }

    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
        //return await this.jogadores;
    }

    async consultarJogadorPorEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com email ${email} não encontrado`)
        }
        
        return jogadorEncontrado;
    }    
    
    async deletarJogador(email: string): Promise<any> {
        return await this.jogadorModel.remove({email}).exec();
    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        
        const jogadorCriado = new this.jogadorModel(criarJogadorDto);
        return await jogadorCriado.save();
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {        
        return await this.jogadorModel.findOneAndUpdate(
            { email: criarJogadorDto.email },
            { $set: criarJogadorDto }
        ).exec();
    }    

    /*    
    async consultarJogadorPorEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com email ${email} não encontrado`)
        }
        
        return jogadorEncontrado;
    }   

    async deletarJogador(email: string): Promise<void> {
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com email ${email} não encontrado`)
        }

        this.jogadores = this.jogadores.filter(jogador => jogador.email !== email)
    }

    private criar(criarJogadorDto: CriarJogadorDto): void {
        
        const jogadorCriado = new this.jogadorModel(criarJogadorDto);
        jogadorCriado.save();

        const { nome, telefoneCelular, email } = criarJogadorDto
        const jogador: Jogador = {
            //_id: uuid(), decrepted
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'
        }
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador);
    } 

    private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void {
        const { nome } = criarJogadorDto

        jogadorEncontrado.nome = nome;
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogadorEncontrado)}`)
        //this.jogadores.push(jogadorEncontrado);
    }
    */
}
