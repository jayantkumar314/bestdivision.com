import React, { useEffect, useState, useRef } from 'react'
import CategoriesSkeleton from './CategoriesSkeleton'
import { useHistory, useLocation } from 'react-router-dom'
import Loader from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Modal from 'components/Modal'

import Comments from 'components/Comments'
import Pills from 'components/Pills/Pills'

import hljs from "highlight.js";
// import './Categories.css'
// import './static/demo/styles/railscasts.css'
import javascript from 'highlight.js/lib/languages/javascript'


import axios, { axiosAjax } from 'axios'
//import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'

hljs.registerLanguage('javascript', javascript)
const initialFormState = {
    group: {},
    searchQuery: "",
    searhedResult: "",
    comment: ""
}

const initialParams = {
    "start": 0,
    "per_page": 10
}

function Categories() {
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const history = useHistory()
    const [formState, updateFormState] = useState(initialFormState);


    const blogBody = useRef(null);
    const [blog, updateBlog] = useState({});
    const [liked, setLiked] = useState(blog.reaction_id == 1)
    const [disliked, setDisliked] = useState(blog.reaction_id == 2)
    const [likesCount, setLikesCount] = useState(blog.likes_count)
    const [dislikesCount, setDislikesCount] = useState(blog.dislikes_count)
    const [openCommentBox, setOpenCommentBox] = useState(false)
    const [comment, updateComment] = useState('');
    const commentArea = useRef(null);
    const commentReplyArea = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [comments, updateComments] = useState([]);
    const [isBottom, setIsBottom] = useState(false);
    const [params, updateParams] = useState(initialParams)
    const [commentLoading, setCommentLoading] = useState(false)


    function decreaseDislikes(postId) {
        setDislikesCount(parseInt(dislikesCount) - 1)
    }
    function increaseDislikes(postId) {
        setDislikesCount(parseInt(dislikesCount) + 1)
    }
    function increaseLikes(postId) {
        setLikesCount(parseInt(likesCount) + 1)
    }
    function decreaseLikes(postId) {
        setLikesCount(parseInt(likesCount) - 1)
    }

    // useEffect(() => {
    //     if (props.reaction_id == 1) {
    //         setLiked(true);
    //     } 
    //     if (props.reaction_id == 2) {
    //         setDisliked(true);
    //     }
    // }, [])

    function onClickLikeButton(e) {
        let postId = e.currentTarget.getAttribute('data-post');
        let data = {
            blog_id: postId
        }
        let likesCount = e.currentTarget.getAttribute('data-likes');
        if (disliked) {
            decreaseDislikes(postId);
            increaseLikes(postId);
        }
        if (liked) {
            decreaseLikes(postId);
            data.reaction_id = 0;
        } else {
            increaseLikes(postId);
            data.reaction_id = 1;
        }
        setLiked(!liked);
        setDisliked(false);
        postReaction(data);
    }
    function onClickDislikeButton(e) {
        let postId = e.currentTarget.getAttribute('data-post');
        let data = {
            blog_id: postId
        }
        if (liked) {
            decreaseLikes(postId);
            increaseDislikes(postId);
        }
        if (disliked) {
            decreaseDislikes(postId);
            data.reaction_id = 0;
        } else {
            data.reaction_id = 2;
            increaseDislikes(postId);
        }
        setDisliked(!disliked);
        setLiked(false);

        postReaction(data);
    }
    function onClickShare(e) {
        e.persist();
        setModalOpen(true)
    }

    async function getBlog(){
        let response = await axios({
            method: 'get',
            url: `blogs/${typeof window !== 'undefined' && window.location.pathname.split('/')[2]}`,
            params: {
                // "limit": "2",
                // "offset": 1
            }
        }).then((response) => {
            updateBlog(() => (response.data.data))
        }).catch((error) => {
        }).finally(() => {
            setLoading(true);
        });
    }
    // const getComments = async () => {
    //     setCommentLoading(true)
    //     let response = await axios({
    //         method: 'get',
    //         // url: `comments/${window.location.pathname.split('/')[2]}`,
    //         url: `comments`,
    //         params: params
    //     }).then((response) => {
    //         updateComments(() => (
    //             [...comments, ...response.data.data]
    //         ))
    //         setIsBottom(false);
    //         updateParams(() => ({
    //             ...params,
    //             start: params.start + params.per_page,
    //         }));
    //     })
    //         .catch((error) => {
    //         })
    //         .finally(() => {
    //             setCommentLoading(false)
    //         });
    // }
    async function getBlogComments(){
        setCommentLoading(true)
        let response = await axios({
            method: 'get',
            // url: `comments/${window.location.pathname.split('/')[2]}`,
            url: `blogs/${blog.id}/comments`,
            params: params
        }).then((response) => {
            updateComments(() => (
                [...comments, ...response.data.data]
            ))
            setIsBottom(false);
            updateParams(() => ({
                ...params,
                start: params.start + params.per_page,
            }));
        })
            .catch((error) => {
            })
            .finally(() => {
                setCommentLoading(false)
            });
    }
    function onClickOpenCommentBox(e) {
        e.persist();
        setOpenCommentBox(true)
        getBlogComments();
    }
    async function postComment(data){
        let response = await axios({
            method: 'post',
            url: `comments`,
            params: {
                // "limit": "2",
                // "offset": 1
            },
            data: data
        }).then((response) => {
            //updateComment(() => ({ ...comment, comment }));
            //updateBlogs(() => (response.data.data))
            //localStorage.setItem("blogs", JSON.stringify(response.data.data))
        }).catch((error) => {
            //setMode('offline')
            //let blogs = localStorage.getItem("blogs")
            //updateBlogs(() => (JSON.parse(blogs)))

        }).finally(() => {
        });
    }
    async function postReaction(data){
        let response = await axios({
            method: 'post',
            url: `reactions`,
            params: {
                // "limit": "2",
                // "offset": 1
            },
            data: data
        }).then((response) => {
            //updateComment(() => ({ ...comment, comment }));
            //updateBlogs(() => (response.data.data))
            //localStorage.setItem("blogs", JSON.stringify(response.data.data))
        }).catch((error) => {
            //setMode('offline')
            //let blogs = localStorage.getItem("blogs")
            //updateBlogs(() => (JSON.parse(blogs)))

        }).finally(() => {
        });
    }

    function handleKeyDown(e) {
        let keyPressed = e.keyCode;
        if (keyPressed === 13) {
            let commentText = e.target.value;
            let commentId = e.target.dataset.id;
            if (commentId) {
                let comment = {
                    comment_id: commentId,
                    text: commentText
                }
                postComment(comment);
                // updateComments(() => (
                //     [comment, ...comments]
                // ))
            } else if (commentArea) {
                let comment = {
                    blog_id: blog.id,
                    text: commentText
                }
                postComment(comment);
                updateComments(() => (
                    [comment, ...comments]
                ))
            }
            e.target.value = ""
        }
        e.target.style.height = 'inherit';
        const computed = typeof window !== 'undefined' && window.getComputedStyle(e.target);
        // Calculate the height
        const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + e.target.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        e.target.style.height = `${height}px`;
    }
    useEffect(() => {
        if (isBottom) {
            getBlogComments();
        }
    }, [isBottom]);

    useEffect(() => {
        getBlog();
        getBlogComments();
    }, [])

    const scrollTop = (typeof window !== 'undefined' && document.documentElement && document.documentElement.scrollTop) || typeof window !== 'undefined' && document.body.scrollTop;
    const scrollHeight = (typeof window !== 'undefined' && document.documentElement && document.documentElement.scrollHeight) || typeof window !== 'undefined' && document.body.scrollHeight;

    function handleDocumentScroll() {
        const scrollTop = (typeof window !== 'undefined' && document.documentElement
            && document.documentElement.scrollTop)
            || typeof window !== 'undefined' && document.body.scrollTop;
        const scrollHeight = (typeof window !== 'undefined' && document.documentElement
            && document.documentElement.scrollHeight)
            || typeof window !== 'undefined' && document.body.scrollHeight;
        if (scrollTop + typeof window !== 'undefined' && window.innerHeight + 50 >= scrollHeight) {
            setIsBottom(true);
        }
    }
    useEffect(() => {
        if (scrollTop + typeof window !== 'undefined' && window.innerHeight + 50 >= scrollHeight) {
            setIsBottom(true);
        }
        typeof window !== 'undefined' && window.addEventListener('scroll', handleDocumentScroll);
        return () => typeof window !== 'undefined' && window.removeEventListener('scroll', handleDocumentScroll);
    }, [])

    const onClick = e => {
        debugger;
    }
    useEffect(() => {
        updateCodeSyntaxHighlighting();
    }, [blog])
    const updateCodeSyntaxHighlighting = () => {
        if (blogBody) {
            const nodes = blogBody.current.querySelectorAll('pre');
            nodes.forEach((node) => {
                hljs.highlightBlock(node);
            });
            let options = {
                contentSelector: 'body',
                loadDelay: 0,
                copyIconClass: "fa fa-copy",
                checkIconClass: "fa fa-check text-success"
            };
            // blogBody.highlightJsBadge(options);
        }
    };
    function onChange(e) {
        e.persist();
        // if (e.target.name === 'searchQuery') {
        // 	updateFormState(() => ({
        // 		...formState,
        // 		searchQuery: e.target.value
        // 	}));
        // } else {
        updateFormState(() => ({
            ...formState,
            comment: e.target.value
        }));
        // }
        // console.log(formState);
    }
    function onKeyUpComment(e) {
        // boolean altKey
        // number charCode
        // boolean ctrlKey
        // boolean getModifierState(key)
        // string key
        // number keyCode
        // string locale
        // number location
        // boolean metaKey
        // boolean repeat
        // boolean shiftKey
        // number which
        let keyPressed = e.keyCode;
        if (keyPressed === '13') {
            let commentText = formState.comment;
            let comment = {
                key: comment,
                text: commentText
            }
            updateComments(() => ({ ...comments, comment }));
        }
    }
    return (
        <section id="section_content" className="css-scope section_content" >
            <div id="blogBody" ref={blogBody}  >
                <div className="content_items">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Library</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Data</li>
                        </ol>
                    </nav>
                </div>
                <div className="content_items content_items-top">
                    <div className="bd_blog_top_wrapper hero">
                        <div className="container">
                            <h1 className="post-title text-center">Categories</h1>
                            <h2>A</h2>
                            <div className="pills tag hero_tag">
                                <Pills />
                            </div>
                            <h2>B</h2>
                            <div className="pills tag hero_tag">
                                <Pills />
                            </div>
                            <h2>C</h2>
                            <div className="pills tag hero_tag">
                                <Pills />
                            </div>
                            <h2>D</h2>
                            <div className="pills tag hero_tag">
                                <Pills />
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Categories
