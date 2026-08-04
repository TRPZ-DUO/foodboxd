import { CommandHandler } from '@nestjs/cqrs';
import { DeleteListaCommand } from './delete-lista.command';

@CommandHandler(DeleteListaCommand)
export class DeleteListaHandler {}
