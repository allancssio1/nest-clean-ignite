export abstract class ValueObject<Props> {
  protected props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-unknown
  equals(vo: ValueObject<unknown>) {
    if (vo === null || vo === undefined) return false

    if (vo.props === undefined) return false

    return JSON.stringify(vo.props) === JSON.stringify(this.props)
  }
}
