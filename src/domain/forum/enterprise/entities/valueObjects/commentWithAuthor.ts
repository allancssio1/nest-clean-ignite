import { ValueObject } from '@/core/entities/value-object'

export interface CommentWithAuthoProps {
  commentId: string
  content: string
  authorId: string
  createdAt: Date
  updatedAt?: Date | null
}

export class CommentWithAutho extends ValueObject<CommentWithAuthoProps> {
  get commentId() {
    return this.props.commentId
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: CommentWithAuthoProps) {
    return new CommentWithAutho(props)
  }
}
