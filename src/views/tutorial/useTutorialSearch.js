import React, { useState, useEffect } from 'react'
import axios from '../../axios'

function useTutorialSearch(params) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tutorial, setTutorial] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setTutorial([])
    }, [params.q, params.order_by])

    let source = axios.cancelToken.source();
    async function getTutorial(attributes){
        setLoading(true)
        setError(false)
        let response = await axios({
            method: 'get',
            url: `tutorials/html/how-to-backup-your-sql-database-automatically-using-cron-jobs`,
            cancelToken: source.token
        }).then((response) => {
            if(response.data.data) {
                setTutorial(response.data.data)
            }
            setHasMore(response.data.data.length > 0)
            setLoading(false)
            
            // updateTutorials(() => (response.data.data))
            // localStorage.setItem("tutorials", JSON.stringify(response.data.data))

        }).catch((error) => {
            if (axios.isCancel(error)) {
                return
            }
            setError(true)
            // setMode('offline')
            // let tutorials = localStorage.getItem("tutorials")
            // updateTutorials(() => (JSON.parse(tutorials)))

        }).finally(() => {
        });
        return () => source.cancel()
    }
    useEffect(() => {
        getTutorial();
        return () => source.cancel()
    }, [params])
    
    return { loading, error, tutorial, hasMore }
}

export default useTutorialSearch
