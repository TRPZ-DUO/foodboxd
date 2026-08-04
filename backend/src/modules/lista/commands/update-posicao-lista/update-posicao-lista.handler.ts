import { CommandHandler } from '@nestjs/cqrs';
import { UpdatePosicaoListaCommand } from './update-posicao-lista.command';

@CommandHandler(UpdatePosicaoListaCommand)
export class UpdatePosicaoListaHandler {}
