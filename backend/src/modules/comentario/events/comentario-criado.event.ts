export class ComentarioCriadoEvent {
  constructor(
    public readonly comentarioId: string,
    public readonly usuarioId: string,
  ) {}
}
