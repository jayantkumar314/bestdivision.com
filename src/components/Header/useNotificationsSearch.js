import React, { useState, useEffect } from 'react'
import axios from 'axios'

function useBlogSearch(params) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setNotifications([])
    }, [params.q, params.order_by])

    let source = axios.cancelToken.source();
    async function getNotifications(attributes){
        setLoading(true)
        setError(false)
        let response = await axios({
            method: 'get',
            url: `notifications`,
            params: params,
            cancelToken: source.token
        }).then((response) => {
            if(response.data.data) {
                setNotifications(prevNotifications => {
                    // return [...new Set([...prevNotifications, ...response.data.data.map(b => b.title)])]
                    return [...new Set([...prevNotifications, ...response.data.data])]
                })
            }
            setHasMore(response.data.data.length > 0)
            setLoading(false)
            
            // updateNotifications(() => (response.data.data))
            // localStorage.setItem("notifications", JSON.stringify(response.data.data))

        }).catch((error) => {
            if (axios.isCancel(error)) {
                return
            }
            setError(true)
            // setMode('offline')
            // let notifications = localStorage.getItem("notifications")
            // updateNotifications(() => (JSON.parse(notifications)))

        }).finally(() => {
        });
        return () => source.cancel()
    }
    useEffect(() => {
        getNotifications();
        return () => source.cancel()
    }, [params])
    
    return { loading, error, notifications, hasMore }
}

export default useBlogSearch
