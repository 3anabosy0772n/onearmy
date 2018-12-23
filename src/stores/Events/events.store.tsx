import { observable, action } from 'mobx'
import { db } from 'src/utils/firebase'
import { IEvent } from 'src/models/events.models'

export class EventStore {
  // observables are data variables that can be subscribed to and change over time
  @observable
  public allEvents: IEvent[]
  public activeEvent: IEvent | undefined

  @action
  public async getEventsList() {
    const ref = await db.collection('events').get()
    this.allEvents = ref.docs.map(doc => doc.data() as IEvent)
    console.log('events retrieved', this.allEvents)
  }

  public async getEventBySlug(slug: string) {
    const ref = db
      .collection('events')
      .where('slug', '==', slug)
      .limit(1)
    const collection = await ref.get()
    this.activeEvent =
      collection.docs.length > 0
        ? (collection.docs[0].data() as IEvent)
        : undefined
    return this.activeEvent
  }
}
