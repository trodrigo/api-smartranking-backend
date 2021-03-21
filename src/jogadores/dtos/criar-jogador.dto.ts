import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriarJogadorDto {

    @ApiProperty()
    @IsNotEmpty()
    readonly telefoneCelular: string;
    
    @ApiProperty()
    @IsEmail()
    readonly email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    readonly nome: string;
}