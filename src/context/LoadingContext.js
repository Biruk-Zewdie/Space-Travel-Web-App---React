import {createContext} from 'react'

const initialState = {
    isLoading: false, 
    enableLoading: function () {},
    disableLoading: function () {}
}
// creates a new context called LoadingContext and export it. 
// the initial value of the loading context is initialState defined above.
//enables us to easily use isLoading, enableLoading and disableLoading elements in every components.

const LoadingContext = createContext (initialState)

export default LoadingContext;


