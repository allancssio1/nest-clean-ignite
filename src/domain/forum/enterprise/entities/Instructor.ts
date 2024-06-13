import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  get name() {
    return this.props.name
  }

  static create(props: InstructorProps, id?: UniqueEntityId) {
    const student = new Instructor(props, id)
    return student
  }
}
