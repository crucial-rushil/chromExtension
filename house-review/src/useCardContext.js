import { CardContext } from "./CardContext";
import { useContext } from "react";

export const useCardContext = () => {
    const context = useContext(CardContext)

    if(!context)
        {
            throw Error('use context properly')
        }

    return context
}