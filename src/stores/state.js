import { extendObservable, observable, set } from 'mobx'


/**
 * This is our state, we update it
 * using the methods from other stores
 */
export default class State {
  constructor(state) {
    //init state obj
    extendObservable(this, {
      seoTitle: '(Inferno Starter',
      seoDescription: '',
    })

    //set current state
    set(this, state)
  }
}


