import { UniqueEntityId } from './uniqueEntityId'

export abstract class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  protected constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId()
    this.props = props
  }

  get id() {
    return this._id
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-unknown
  equals(entity: Entity<unknown>) {
    if (entity === this) return true

    if (entity.id === this._id) return true

    return false
  }
}
