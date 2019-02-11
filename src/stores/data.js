import {
    action,
    runInAction,
    observable,
    computed
} from 'mobx'
import request from '../../core/request'


/**
 * @class Data
 */
export default class Data {

    constructor(state) {
        this.state = state
    }

}