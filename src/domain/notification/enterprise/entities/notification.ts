import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Optional } from '@/core/types/optional'

export interface NotificationProps {
  recipientId: UniqueEntityId
  title: string
  content: string
  readAt?: Date
  createdAt: Date
}

export class Notification extends Entity<NotificationProps> {
  public get recipientId() {
    return this.props.recipientId
  }

  public get title() {
    return this.props.title
  }

  public get content() {
    return this.props.content
  }

  public get readAt() {
    return this.props.readAt
  }

  public get createdAt() {
    return this.props.createdAt
  }

  read() {
    this.props.readAt = new Date()
  }

  static create(
    props: Optional<NotificationProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    return new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
