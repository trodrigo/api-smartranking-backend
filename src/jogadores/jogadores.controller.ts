import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { watch } from 'fs';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe'

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto) {
        return await this.jogadoresService.criarJogador(criarJogadorDto)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {

        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto)
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[] | Jogador>{
        return await this.jogadoresService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadoresPorId(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<Jogador>{
        return await this.jogadoresService.consultarJogadorPoId(_id);
    }    

    @Get('/email')
    async consultarJogadoresPorEmail(@Query('email', JogadoresValidacaoParametrosPipe) email: string): Promise<Jogador[] | Jogador>{
        return await this.jogadoresService.consultarJogadorPorEmail(email);
    }    

    @Delete('/:_id')
    async deletarJogador(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<any> {
        return this.jogadoresService.deletarJogador(_id)
    }
}
