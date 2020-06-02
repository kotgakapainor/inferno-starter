import { v4 as uuidv4 } from 'uuid'

export default (Component) => (props) => {

    const id = uuidv4()

    const hdata= JSON.stringify({
        id,
        name: Component.name,
        props
    }, null, 0)

    /* 
    deduplicate props
    props manipulieren, state entfernne und durch globalen state ersetzen
    */
    return (
      <div>
        <script type="application/hydration-marker" data-hdata={hdata}/>
        <Component {...props} data-uid={id}/>
      </div>
    )
  }