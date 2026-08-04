import { CommandHandler } from '@nestjs/cqrs';
import { UpdateListaCommand } from './update-lista.command';

@CommandHandler(UpdateListaCommand)
export class UpdateListaHandler {}
