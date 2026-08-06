import { CommandBus, QueryBus } from '@nestjs/cqrs';

//@Controller('seguidores')
export class SeguidorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
}
