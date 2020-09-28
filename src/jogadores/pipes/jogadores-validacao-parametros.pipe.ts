import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

export class JogadoresValidacaoParametrosPipe implements PipeTransform {
    transform ( value: any, metadata: ArgumentMetadata) {
        console.log(`value: ${value} metadata: {metadata.type}`);

        if (!value) {
            throw new BadRequestException(
                `O valor do parametro${metadata.data} deve ser informado`)
        }
        
        return value
    }
}