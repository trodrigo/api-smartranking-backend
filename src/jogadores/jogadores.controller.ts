import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { watch } from 'fs';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) {}

    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto: CriarJogadorDto) {
        /*const { email } = criarJogadorDto
        return JSON.stringify(`{
            "email": ${email}
        }`)*/
        /*return JSON.stringify({
            "nome": "Tarcio"
        })*/
        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
    }

    @Get()
    async consultarJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador>{

        if (email) {
            return await this.jogadoresService.consultarJogadorPorEmail(email);
        } else{
            return await this.jogadoresService.consultarTodosJogadores();
        }        
    }

    @Delete()
    async deletarJogador(@Query('email') email: string): Promise<void> {
        this.jogadoresService.deletarJogador(email)
    }
}
