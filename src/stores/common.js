import { action, runInAction} from 'mobx'

export default class Common {

    constructor(state) {
        this.state = state
    }

    @action setTitle(slug) {
        if(slug != this.state.seoTitle){
            runInAction(() =>{
                this.state.seoTitle = slug
            })
        }
    }
    
    @action setDescription(slug) {
        if(slug != this.state.seoDescription){
            this.state.seoDescription = slug
        }
    }
}
