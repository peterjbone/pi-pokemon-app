import rootReducer from "../Reducer/reducer.js"
import { createStore, applyMiddleware, compose } from "redux"
import { thunk } from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"

//* Using devtools 1
export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
)

//* Using devtools 2
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))
// export default store
