import { useContext } from "react"
import  ApiChallengeContext from "../context/ApiChallengeContext"

const useApiContext = () => {
    return useContext(ApiChallengeContext)
}

export default useApiContext