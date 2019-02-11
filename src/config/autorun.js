import { autorun } from 'mobx'

export default function ({state, store}, history) {
    autorun(() => {
        //react to SEO changes
        if (state.seoTitle) {
            document.title = state.seoTitle

            const el = document.querySelector('meta[property="og:title"]')
            if(el){
                el['content'] = state.seoTitle
            }
            const el1 = document.querySelector('meta[name="title"]')
            if(el1){
                el1['content'] = state.seoTitle
            }
        }
        if (state.seoDescription) {

            const el2 =  document.querySelector('meta[name="description"]')
            if(el2){
                el2['content'] = state.seoDescription
            }

            const el3 =  document.querySelector('meta[property="og:description"]')
            if(el3){
                el3['content'] = state.seoDescription
            }
        }  
    })
}
