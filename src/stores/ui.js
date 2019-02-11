import {
    action,
    runInAction,
    reaction,
    intercept,
    observable,
    computed
} from 'mobx'

/**
 * @class ui
 */
export default class Ui {

    constructor(state) {
        this.state = state.ui
    }

}