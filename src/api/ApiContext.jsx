import { createContext } from "react";
export const ApiContext=createContext();
function ApiProvider({children}){
    const BASE_URL="https://restcountries.com/v3.1";
    return(
        <ApiContext.Provider value={BASE_URL}>
            {children}
        </ApiContext.Provider>
    );
}
export default ApiProvider;