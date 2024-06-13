import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './Comment'
import { QuestionCommentCreatedEvent } from '../events/question-comment-created-event'

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    const isNewQestionComment = !id

    if (isNewQestionComment)
      questionComment.addDomainEvent(
        new QuestionCommentCreatedEvent(questionComment),
      )

    return questionComment
  }
}
