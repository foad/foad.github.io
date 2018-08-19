import { createStore } from 'redux'

import reducer from './reducers/reducer'
import { initialState } from './reducers/initial-state'

export const store = createStore(reducer, initialState)