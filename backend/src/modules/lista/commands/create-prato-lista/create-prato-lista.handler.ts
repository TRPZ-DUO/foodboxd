import { CommandHandler } from '@nestjs/cqrs';
import { CreatePratoListaCommand } from './create-prato-lista.command';

@CommandHandler(CreatePratoListaCommand)
export class CreatePratoListaHandler {}
