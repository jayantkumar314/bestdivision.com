import React, { useState, useEffect } from 'react'
import axios from 'axios'

function useTutorialLeftNav(params) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tutorialLeftNav, setTutorialLeftNav] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setTutorialLeftNav([])
    }, [params.q, params.order_by])

    let source = axios.cancelToken.source();
    async function getTutorialLeftNav(attributes){
        setLoading(true)
        setError(false)
        let response = await axios({
            method: 'get',
            url: `tutorials/html/side_menu`,
            params: params,
            cancelToken: source.token
        }).then((response) => {
            if(response.data.data) {
                setTutorialLeftNav(prevItems => {
                    // return [...new Set([...prevBlogs, ...response.data.data.map(b => b.title)])]
                    return [...new Set([...prevItems, ...response.data.data])]
                })
            }
            setHasMore(response.data.data.length > 0)
            setLoading(false)
            
            // updateBlogs(() => (response.data.data))
            // localStorage.setItem("tutorialLeftNav", JSON.stringify(response.data.data))

        }).catch((error) => {
            if (axios.isCancel(error)) {
                return
            }
            setError(true)
            // setMode('offline')
            // let tutorialLeftNav = localStorage.getItem("tutorialLeftNav")
            // updateBlogs(() => (JSON.parse(tutorialLeftNav)))

        }).finally(() => {
        });
        return () => source.cancel()
    }
    useEffect(() => {
        getTutorialLeftNav();
        return () => source.cancel()
    }, [params])
    
    return { loading, error, tutorialLeftNav, hasMore }
}

export default useTutorialLeftNav