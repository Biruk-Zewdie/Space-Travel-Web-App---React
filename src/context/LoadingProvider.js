import React, {useState, useCallback} from "react";
import LoadingContext from "./LoadingContext";

//responsible for providing the loading state and loading control functions to its children and grand Children components.

const LoadingProvider = ({children}) => {
  
    const [isLoading, setIsLoading] = useState (false);

    /* enableLoading function using the useCallback hook. When called, this function sets the isLoading state to true. 
    The useCallback hook is used to memoize the function to prevent unnecessary re-renders. */

    const enableLoading = useCallback(() =>{
        setIsLoading (true)
    }, [])

   /*  Similarly, this line defines the disableLoading function using the useCallback hook. 
   When called, this function sets the isLoading state to false. */

    const disableLoading = useCallback(() => {
        setIsLoading (false) 
    },[])

   /* LoadingContext.Provider component is used to wrap the children & grand children components. 
   The value provided by the context includes isLoading, enableLoading, and disableLoading, 
   allowing consuming components to access these values. */

    return (
        <LoadingContext.Provider value={{isLoading, enableLoading, disableLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingProvider;