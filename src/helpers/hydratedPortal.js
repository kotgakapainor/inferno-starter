import { createPortal } from 'inferno'


export default function hydratedPortal(Component, marker){
    //remove ssred component tree
    if(marker && marker.nextElementSibling) marker.nextElementSibling.remove()
    const target = marker.parentElement
    return createPortal(Component, target)
}