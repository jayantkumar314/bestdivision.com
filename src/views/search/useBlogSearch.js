import React, { useState, useEffect } from 'react'
import axios from '../../axios'

function useBlogSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setBlogs([])
    }, [query])

    let source = axios.cancelToken.source();
    async function getBlogs(attributes){
        setLoading(true)
        setError(false)

        let response = await axios({
            method: 'get',
            url: `blogs`,
            params: { 
                q: query, 
                start: (pageNumber-1) * 10,
                // per_page: "2",
                // "offset": 1
            },
            cancelToken: source.token
        }).then((response) => {
            if(response.data.data) {
                setBlogs(prevBlogs => {
                    // return [...new Set([...prevBlogs, ...response.data.data.map(b => b.title)])]
                    return [...new Set([...prevBlogs, ...response.data.data])]
                })
            }
            setHasMore(response.data.data.length > 0)
            setLoading(false)
            
            // updateBlogs(() => (response.data.data))
            // localStorage.setItem("blogs", JSON.stringify(response.data.data))

        }).catch((error) => {
            if (axios.isCancel(error)) {
                return
            }
            setError(true)
            // setMode('offline')
            // let blogs = localStorage.getItem("blogs")
            // updateBlogs(() => (JSON.parse(blogs)))

        }).finally(() => {
        });
        return () => source.cancel()
    }
    useEffect(() => {
        getBlogs();
        return () => source.cancel()
    }, [query, pageNumber])
    
    return { loading, error, blogs, hasMore }
}

export default useBlogSearch
