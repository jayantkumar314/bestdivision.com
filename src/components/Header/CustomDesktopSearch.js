import axios, { axiosAjax } from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { Link, withRouter } from 'react-router-dom'
import QueryString from 'query-string'
// import './CustomDesktopSearch.css'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'html-react-parser'

// const urlParams = new URLSearchParams((typeof window !== 'undefined') && window.location.search)
const initialParams = {
    q: '',
    start: 0
}

const initialSearchState = [];

function CustomDesktopSearch(props) {
    let urlParams = QueryString.parse(props?.location?.search)
    const initialFormState = {
        searchQuery: urlParams.q,
        searhedResult: ""
    }
    const initialSettings = {
        maxShownResults: 5, //Show no more than this many results
        generated: {
            lock: false,
            original: "",
            shown: 0,
            selected: -1,
            results: []
        }
    };
    const [suggestions, setSuggestions] = useState([])
    const inputRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('')
    const [selectedValue, setSelectedValue] = useState('')
    const [settings, setSettings] = useState(initialSettings)
    const [formState, updateFormState] = useState(initialFormState);
    const [searchState, updateSearchState] = useState(initialSearchState);

    const header = useRef(null);
    const mobileSearch = useRef(null)
    const [params, setParams] = useState(initialParams)
    const [blogs, setBlogs] = useState([])
    const [blogsSearch, setBlogsSearch] = useState([])
    const [totalBlogs, setTotalBlogs] = useState([])
    const [q, setQ] = useState(urlParams.q)
    const [error, setError] = useState(false)
    let source = axios.CancelToken.source()
    const [initialMount, setInitialMount] = useState(true)
    // useEffect(() => {
        //     let query = searchParams.get('query') ? searchParams.get('query').split('+').join(' ') : ''
    //     setSelectedValue(query)
    //     setValue(query)
    // }, [url])
    useEffect(() => {
        setSelectedValue(value.split(' ').join('+'))
    }, [value])
    
    useEffect(() => {
        updateFormState(() => ({
            ...formState,
            searchQuery: urlParams.q
        }));
        setQ(urlParams.q)
        setSuggestions([])
        setInitialMount(true)
    }, [props?.location?.search])

    useEffect(() => {
        // debugger
        //window.scrollTo(0, 0)
        if(initialMount) {
            setInitialMount(false)
        } else {
            getSuggestions()
            return () => source.cancel()
        }
    }, [params, formState.searchQuery])
    // }, [q, params, formState.searchQuery])
    function onChange(e) {
        if (e.target.name === 'searchQuery' || e.target.name === 'q') {
            updateFormState(() => ({
                ...formState,
                searchQuery: e.target.value
            }));
        }
        console.log(formState);
    }

    async function getSuggestions() {
        setLoading(true)
        // setError(false)
        let response = await axios({
            method: 'post',
            // url: `blogs?search=${encodeURIComponent(q).replace(/%20/g, "+")}`,
            url: `search?q=${formState.searchQuery}`,
            // url: `search?q=${value.split(' ').join('+')}`,
            cancelToken: source.token
            // params: params
            // suggestions: {
            // 	"user": {
            // 		"cognitoId": attributes.sub,
            // 		"firstName": attributes.name,
            // 		"lastName": "lastName9",
            // 		"email": attributes.email,
            // 		"phone": attributes.phone_number
            // 	}
            // }
        }).then((response) => {
            // setBlogsSearch(() => {
            //     return [...new Set([...response?.data?.data])]
            // })

            // setTotalBlogs(response.data.total_blogs)
            // useEffect(() => {
            //     setBlogs([])
            // }, [query])
            setSuggestions(response.data.data)
            setSettings({ ...settings, generated: { ...settings.generated, original: value, results: response.data.data } })
        }).catch((error) => {
            if (axios.isCancel(error)) {
                return
            }
            // setError(true)
        }).finally(() => {
            setLoading(false)
        });
        return () => source.cancel()
    }
    function handleChange(e) {
        setValue(e.target.value)
    }

    function handleKeyUp(e) {
        setLoading(true);
        const currentValue = e.target.value;
        if (currentValue === '') {
            setSuggestions([])
        }
        if (e.keyCode === 38) { //up
            // settings.generated.selected = Math.max(
            //     -1,
            //     settings.generated.selected - 1
            // );//take 1 but make sure it doesn't go below -1 (none selected)

            // ShowSelected(); //Show the selection highlight and put text into the searchbar
            // break;
        } else if (e.keyCode === 40) {
            // settings.generated.selected =
            //         Math.min(
            //             settings.generated.shown - 1,
            //             settings.generated.selected + 1
            //         );//add 1 but make sure it doesn't go above the suggestion count

            //     ShowSelected(); //Show the selection highlight and put text into the searchbar
            //     break;
        } else {
            if (currentValue !== value) { //If it isn't up or down and the string is different then generate a new bunch of suggestions
                let query = currentValue;
                // setValue(query)
                // updateFormState(() => ({
                //     ...formState,
                //     searchQuery: e.target.value
                // }));
                setSettings({ ...settings, generated: { ...settings.generated, original: currentValue, results: [] } })
                let result = []
                // let suggestions = axios.get('https://suggestqueries.google.com/complete/search');

                // $(".dropdown").html(html); //set html of dropdown to what was generated
            }
        }
        setLoading(false);
    }

    // function ShowSelected() {
    //     $("#searchbox").val( //Make the search bar show the selected text
    //         settings.generated.results[Math.max(0, settings.generated.selected)]
    //     );
    //     $(`.dropdown>.result`).removeClass("selected"); //remove selected effect from all
    //     $(`.dropdown>.result:nth-child(${settings.generated.selected + 1})`).addClass("selected"); //add selected effect to one
    // }

    // $(document).on("click", ".dropdown>.result", function () { //On suggestion click
    //     $("#searchbox").val($(this).attr("plain"));
    //     ShowResults($(this).attr("plain"));
    // });

    // function ShowResults(query) { //This will generate ssuggestions based on a query
    //     if (settings.generated.lock) return; //Don't pass if locked
    //     settings.generated.lock = true; //lock
    //     $.ajax({
    //         url: `//suggestqueries.google.com/complete/search`, //Caution: this is not the official API but it is easy, this may break
    //         suggestions: {
    //             client: "firefox", //odd behaviour with other clients
    //             ds: "yt",
    //             q: escape(query.replace(/ /g, '+'))
    //         },
    //         suggestionsType: "jsonp", //JSONP
    //         Method: "GET",
    //         success: function (suggestions) {
    //             var result = suggestions[1]; //Just get the array of results
    //             const regex = new RegExp(query, "i"); //Create a regex pattern of the query case insensitive
    //             const subst = `<b>${query}</b>`; //Replace the query with a bold query
    //             var html = ""; //blank html which will be appended
    //             var offset = 0; //offset if results are skipped
    //             settings.generated.results = []; //results that are listed
    //             for (
    //                 var i = 0;
    //                 i < Math.min(settings.maxShownResults, result.length) + offset;
    //                 i++
    //             ) { //loop maxShownResults or less if there are less results available
    //                 //for some reason there are many results which are the same word twice - this just ignores them
    //                 if (
    //                     result[i].toLowerCase().split(" ")[0] ==
    //                     result[i].toLowerCase().split(" ")[1] &&
    //                     result[i].toLowerCase().split(" ").length == 2
    //                 ) {
    //                     offset++; //allow for skipping one
    //                 } else {
    //                     settings.generated.results[settings.generated.results.length] = result[i]; //add result to list
    //                     html +=
    //                         `<div class="result" plain="${result[i]}">` +
    //                         result[i].replace(regex, subst) +
    //                         `</div>`; //html for a suggestion
    //                 }
    //             }
    //             settings.generated.shown = settings.generated.results.length //number of selections
    //             settings.generated.selected = -1; //reset selected
    //             $(".dropdown").html(html); //set html of dropdown to what was generated
    //         }
    //     });
    //     settings.generated.lock = false; //unlock
    // }

    // console.clear();

    return (
        <div class="inputContainer">
            <form>
                {/* <input type="hidden" onChange={onChange} name="searchQuery" value={formState.searchQuery} className="form-control search-icon" id="searchQuery" placeholder="Enter your city" required /> */}
                <div>
                    <input onChange={onChange} name="searchQuery" ref={inputRef} defaultValue={formState.searchQuery?.split('+').join(' ')} value={formState.searchQuery?.split('+').join(' ')} autoComplete="off" onKeyUp={handleKeyUp} type="text" placeholder="Search" id="searchbox" />
                </div>
                {/* <input onChange={handleChange} name="searchQuery" ref={inputRef} defaultValue={selectedValue} key={loading}  autoComplete="off" onKeyUp={handleKeyUp} type="text" placeholder="Search" id="searchbox" /> */}
            </form>
            {suggestions.length > 0 &&
                <div class="searchDropdown">
                    {settings.generated.results.length > 0 && settings.generated.results.slice(0, 10).map((item) => {
                        // <div class="result" plain="${result[i]}">` +
                        //     result[i].replace(regex, subst) +
                        //     `</div>
                        let query = value;
                        const regex = new RegExp(query, "i"); //Create a regex pattern of the query case insensitive
                        const subst = `<b>${query}</b>`; //Replace the query with a bold query
                        var html = ""; //blank html which will be appended
                        var offset = 0; //offset if results are skipped
                        // settings.generated.results = []; //results that are listed
                        // for (let i = 0; i < Math.min(settings.maxShownResults, suggestions.length) + offset; i++) { //loop maxShownResults or less if there are less results available
                        for (let i = 0; i < 1; i++) { //loop maxShownResults or less if there are less results available
                            //for some reason there are many results which are the same word twice - this just ignores them
                            // debugger
                            let a0 = item.title?.toLowerCase().split(" ")[0]
                            let a1 = item.title?.toLowerCase().split(" ")[1]
                            let al = item.title?.toLowerCase().split(" ").length
                            if (a0 == a1 && al == 2) {
                                offset++; //allow for skipping one
                            }
                        }
                        return <Link to={`/search?q=${item?.title?.split(' ').join('+')}`}><div data-key={item.title} className="item" data-plain={item?.title}>{ReactHtmlParser(item?.title?.replace(regex, subst))}</div></Link>
                    })}
                </div>
            }
        </div>
    )
}

// export default withRouter(CustomDesktopSearch)
export default CustomDesktopSearch
