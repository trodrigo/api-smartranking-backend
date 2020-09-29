import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { promises } from 'dns';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criaCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
            return await this.categoriasService.criarCategoria(criaCategoriaDto)
    }

    @Put('/:categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(
        @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
        @Param('categoria') categoria: string): Promise<void> {
            await this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDto)
    }

    @Post('/:categoria/jogadores/:idjogador')
    async atribuirCategoriaJogador(
        @Param() params: string[]): Promise<void> {   
        //console.log(`params: ${JSON.stringify(params)}`)     
        await this.categoriasService.atribuirCategoriaJogador(params)
    }

    @Get()
    async consultarCategorias(): Promise<Array<Categoria>> {
        return await this.categoriasService.consultarTodasCategorias();
    }

    @Get('/:categoria')
    async consultarCategoriaPorId(
        @Param('categoria') categoria: string): Promise<Categoria> {
        return await this.categoriasService.consultarCategoriaPorId(categoria);
    }    
}
