import { useStaticRendering } from 'inferno-mobx'
import { toJS } from 'mobx'
import State from '../../stores/state'
import context from '../../config/context'

useStaticRendering(true)

const stateClone = JSON.stringify(toJS(new State({})))

/**
 * Middleware for creating the context
 * @param ctx
 * @param next
 */
export default async(ctx, next) => {
  
  // Create state for SSR
  const state = JSON.parse(stateClone)

  ctx.context = context(state)

  await next()
}