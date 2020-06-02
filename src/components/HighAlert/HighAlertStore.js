import { observable, action, computed, reaction} from 'mobx'


export default class SliderStore {

    constructor(props) {
        this.props = props
        
    }

    @observable currentCount = 0

    @action
    incrementCount(){
        this.currentCount++
    }
}

