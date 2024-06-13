import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

export interface CommentProps {
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}
/**
 * Comment<> => utilizando um generic do typescript
 * Porps o props da classe que extende esta será passado
 * extendendo a iterface desta classe, para então ser usado no props do Entity<props>11
 * */

export abstract class Comment<
  Props extends CommentProps,
> extends AggregateRoot<Props> {
  public get content(): string {
    return this.props.content
  }

  public get authorId() {
    return this.props.authorId
  }

  public set content(content: string) {
    this.props.content = content
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
