import Common from '../stores/common'
import Data from '../stores/data'
import UI from '../stores/ui'

export default (state) => {
  return {
    state,
    store: {
      common: new Common(state),
      data: new Data(state),
      ui: new UI(state)
    }
  }
}