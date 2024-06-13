import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './Comment'
import { AnswerCommentCreatedEvent } from '../events/answer-comment-created-event'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  public get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    const isNewAnswerComment = !id
    if (isNewAnswerComment) {
      answerComment.addDomainEvent(new AnswerCommentCreatedEvent(answerComment))
    }

    return answerComment
  }
}
