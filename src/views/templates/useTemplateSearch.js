import React, { useState, useEffect } from 'react'
import axios from 'axios'

function useTemplateSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [templates, setTemplates] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setTemplates([])
    }, [query])

    let source = axios.cancelToken.source();
    async function getTemplates(attributes){
        setLoading(true)
        setError(false)

        let response = await axios({
            method: 'get',
            url: `templates`,
            params: { 
                q: query, 
                start: (pageNumber-1) * 10,
                // per_page: "2",
                // "offset": 1
            },
            cancelToken: source.token
        }).then((response) => {
            if(response.data.data) {
                setTemplates(prevTemplates => {
                    // return [...new Set([...prevTemplates, ...response.data.data.map(b => b.title)])]
                    return [...new Set([...prevTemplates, ...response.data.data])]
                })
            }
            setHasMore(response.data.data.length > 0)
            setLoading(false)
            
            // updateTemplates(() => (response.data.data))
            // localStorage.setItem("templates", JSON.stringify(response.data.data))

        }).catch((error) => {
            if (axios.isCancel(error)) {
                return
            }
            setError(true)
            // setMode('offline')
            // let templates = localStorage.getItem("templates")
            // updateTemplates(() => (JSON.parse(templates)))

        }).finally(() => {
        });
        return () => source.cancel()
    }
    useEffect(() => {
        getTemplates();
        return () => source.cancel()
    }, [query, pageNumber])
    
    return { loading, error, templates, hasMore }
}

export default useTemplateSearch
