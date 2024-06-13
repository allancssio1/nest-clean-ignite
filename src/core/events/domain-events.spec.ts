import { describe, expect, it, vi } from 'vitest'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { UniqueEntityId } from '../entities/uniqueEntityId'
import { AggregateRoot } from '../entities/aggregate-root'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  // eslint-disable-next-line no-use-before-define
  private aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const spy = vi.fn()

    // Subscriber cadastrado (ouvindo evento de "resposta criada")
    DomainEvents.register(spy, CustomAggregateCreated.name)

    // Estou criando uma resposta, porem sem salvar no bando
    const aggregate = CustomAggregate.create()

    // Estou assegurando que o evento foi criado proém não foi disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Estou salvando a reposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber ouve o evento e faz o que precisa ser feito com o evento
    expect(spy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
