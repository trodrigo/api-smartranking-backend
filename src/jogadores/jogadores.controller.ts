import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    @Post()
    async CriarAtualizarJogador(
        @Body() criarJogadorDto: CriarJogadorDto) {
        const { email } = criarJogadorDto
        return JSON.stringify(`{
            "email": ${email}
        }`)
        /*return JSON.stringify({
            "nome": "Tarcio"
        })*/
    }
}
