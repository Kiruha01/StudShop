import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            const r = await callback(...args)
            setIsLoading(false)
            return r
        } catch (e) {
            setError(e.message);
            setIsLoading(false)
            return e.response
        }
    }

    return [fetching, isLoading, error]
}