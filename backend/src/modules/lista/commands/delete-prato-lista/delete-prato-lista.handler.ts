import { CommandHandler } from '@nestjs/cqrs';
import { DeletePratoListaCommand } from './delete-prato-lista.command';

@CommandHandler(DeletePratoListaCommand)
export class DeletePratolistaHandler {}
