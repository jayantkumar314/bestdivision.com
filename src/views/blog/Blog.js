import React, { useEffect, useState, useRef } from 'react'
import BlogSkeleton from './BlogSkeleton'
import { useHistory, useLocation, Link } from 'react-router-dom'
import Moment from 'react-moment'
import Loader from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Modal from 'components/Modal'

import Comments from 'components/Comments'
import HelmetMetaData from 'components/core/HelmetMetaData'

import hljs from "highlight.js";
import 'highlightjs-badge'
// import './Blog.css'
// import './static/demo/styles/railscasts.css'
// import javascript from 'highlight.js/lib/languages/javascript'

import axios, { axiosAjax } from 'axios'
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'html-react-parser'

// hljs.registerLanguage('javascript', javascript)
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

function Blog(props) {
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const history = useHistory()
    const [formState, updateFormState] = useState(initialFormState);
    const [blogs, updateBlogs] = useState([]);
    const [mode, setMode] = useState('online')

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

    async function getBlog() {
        let response = await axios({
            method: 'get',
            url: `blogs/${window.location.pathname.split('/')[2]}`,
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
    async function getBlogs(attributes){
        let response = await axios({
            method: 'get',
            url: `blogs`,
            params: {
                // "limit": "2",
                // "offset": 1
            }
        }).then((response) => {
            updateBlogs(() => (response.data.data))
            localStorage.setItem("blogs", JSON.stringify(response.data.data))
        })
            .catch((error) => {
                setMode('offline')
                let blogs = localStorage.getItem("blogs")
                updateBlogs(() => (JSON.parse(blogs)))

            })
            .finally(() => {
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
    async function getBlogComments() {
        setCommentLoading(true)
        let response = await axios({
            method: 'get',
            // url: `comments/${window.location.pathname.split('/')[2]}`,
            url: `blogs/${blog.id}/comments`,
            params: params
        }).then((response) => {
            if (response.data.data.length > 0) {
                updateComments(() => (
                    [...comments, ...response.data.data]
                ))
                setIsBottom(false);
                updateParams(() => ({
                    ...params,
                    start: params.start + params.per_page,
                }));
            }
        }).catch((error) => {
        }).finally(() => {
            setCommentLoading(false)
        });
    }
    function onClickOpenCommentBox(e) {
        e.persist();
        setOpenCommentBox(true)
        getBlogComments();
    }
    async function postComment(data) {
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
    async function postReaction(data) {
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
        const computed = window.getComputedStyle(e.target);
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

    // useEffect(() => {
    //     getBlogComments();
    // }, [])
    
    const scrollTop = (typeof document !== 'undefined' && document.documentElement && document.documentElement.scrollTop) || typeof document !== 'undefined' && document.body.scrollTop;
    const scrollHeight = (typeof document !== 'undefined' && document.documentElement && document.documentElement.scrollHeight) || typeof document !== 'undefined' && document.body.scrollHeight;

    function handleDocumentScroll() {
        const scrollTop = (typeof document !== 'undefined' && document.documentElement
            && document.documentElement.scrollTop)
            || document.body.scrollTop;
        const scrollHeight = (typeof document !== 'undefined' && document.documentElement
            && document.documentElement.scrollHeight)
            || document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
            setIsBottom(true);
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
                setIsBottom(true);
            }
            window.addEventListener('scroll', handleDocumentScroll);
            return () => window.removeEventListener('scroll', handleDocumentScroll);
        }
    }, [])
    useEffect(() => {
        getBlog();
        getBlogs();
        getBlogComments();
    }, [props.location.pathname])

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
                // templateSelector: '#CodeBadgeTemplate',
                contentSelector: 'body',
                loadDelay: 0,
                copyIconClass: "fas fa-copy",
                copyIconContent: "",
                onBeforeCodeCopied: null,
                checkIconClass: "fas fa-check text-success"
            };
            // console.log(highlightJsBadge);
            // debugger
            window.highlightJsBadge(options);
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
            {/* <div id="CodeBadgeTemplate" style="display:none">
                <div class="code-badge">
                    <div class="code-badge-language">{{language}}</div>
                    <div title="Copy to clipboard">
                        <i class="{{copyIconClass}} code-badge-copy-icon"></i>
                    </div>
                </div>
            </div> */}
            <HelmetMetaData title={blog.title} description={blog.short_description} image={blog.image} description={blog.short_description} keywords={blog.keywords} />
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
                            <div className="pills tag hero_tag">
                                {/* <?php
                                $temp['pills'] = $tags;
                                $this->load->view('common/snippets/pills', $temp); 
                            ?> */}
                            </div>
                            <h1 className="post-title text-center">{blog.title}</h1>
                            <div id="comments_count" className="mt-3" style={{ fontSize: '1.5rem' }}>
                                <div>Comments: {blog.comments_count}</div>
                                <div style={{ paddingLeft: '1rem' }}>Likes: {blog.likes_count}</div>
                                <div style={{ paddingLeft: '1rem' }}>Shares: {blog.shares_count}</div>
                            </div>
                        </div>
                        {/* <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 3510.8 349.9" xml:space="preserve"><style type="text/css">.st0{opacity:0.35;fill:#f5f5f5;}.st1{fill:#f5f5f5;}</style><path className="st0" d="M1538.6,349.9c-8.5-5.8-17-11.5-25.4-17.2c-201.1-134-443.1-203.1-683.1-195.3	c-227.5,7.5-446.5,85.8-635.3,212.4H1538.6z"></path><path className="st1" d="M3510.8,204.2c-20.4-11.2-41.6-21.2-62.2-29.5c-82.7-33.3-189.3-48.1-283.7-29.4
                    c-145.5,29-226.9,126.3-365.6,165.7c-122,34.6-266.8,18.4-392.2-11.3c-243.9-57.8-476.4-125.1-746.4-111c-148,7.7-291,38.8-421.4,82
                    c-134.5,44.6-293.8,106.7-448.7,58.3c-131.8-41.3-200.4-132.1-322.4-182c-91.2-37.3-207.8-50.7-315.1-36.3
                    C98,118.1,45.7,132.9,0,153.3v197.2h3510.8V204.2z"></path><path className="st0" d="M3510.8,282.8c-117.5-97.4-255.6-201.2-413.4-176.4c-111.4,17.5-184.7,114-282.7,161
                    c-127.3,61-227.1-16.9-341-69.3c-153.7-70.6-343.6-51.4-480.7,48.6c-42.4,31-83,70-125.2,103.2h1643V282.8z"></path><path className="st0" d="M3510.8,161.9c-21.6-2.7-43-3.1-62.3-1.6c-73,5.5-142.2,33.4-209.5,62.3c-67.3,28.9-134.9,59.4-207.2,70.9
                    c-241.2,38.3-440.7-133.6-663.5-189c-201.9-50.2-415.8-6.8-611.8,62.6c-199.5,70.6-405.5,169.7-612.9,127.5
                    c-146-29.7-268.2-125.9-403.1-189.1C501.4-6.7,247.5-4.2,0,50.1v299.8h3510.8V161.9z"></path></svg> */}
                    </div>
                </div>
                <div id="jk_after_overlay_container" className="content_items">
                    <div className="container-fluid">
                        <div className="row  clearfix">
                            <div className="col-lg-2 col-md-2"></div>
                            {/* <div className=""> */}
                            <div id="aniimated-thumbnials" className="list-unstyled col-lg-8 col-md-12">
                                {/* <?php  //echo $snippet_all_blog_actions_top; ?> */}
                                <div id="single_blog_body">
                                    <div className="body">
                                        <div className="panel panel-default panel-post">
                                            <div className="panel-heading">
                                                <div className="media">
                                                    <div className="media-left">
                                                        <a href="#">
                                                            <img width="42" height="42" src={`${process.env.REACT_APP_ASSETS_URL}/uploads/avatar/jayantkumar314.jpg`} />
                                                            {/* <img width="42" height="42" src="<?=base_url('assets/uploads/avatar/')?><?=(isset($author->avatar) && $author->avatar) ? $author->avatar : 'avatar-male.jpeg'?>" /> */}
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <h4 className="media-heading">
                                                            <a href={`${process.env.REACT_APP_BASE_URL}/profile/${blog.user_slug}`}>{blog.display_name}</a>
                                                            <span className="user_slug"> @{blog.user_name}</span>
                                                        </h4>
                                                        <div className="dates_info">
                                                            <span className="dates_info_bold"><b> Published On</b></span> - <span className="dates_info_date"><Moment format="DD MMM YYYY" >{blog.date_created}</Moment></span>
                                                            <span className="dates_info_bold"><b> Last Updated</b></span> - <span className="dates_info_date"><Moment format="DD MMM YYYY" >{blog.date_updated}</Moment></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="panel-body" style="background: #edecec;"> */}
                                            <div className="panel-body" >
                                                <div className="post-heading">
                                                    {/* <!--<h1 className="post-title"><a href="<?php echo base_url('blogs/').$blog->slug; ?>"><?</a></h1>--> */}
                                                    {/* <!--<h1 className="post-title"><a href="<?php echo base_url('blogs/').$blog->id.'/'.$blog->slug; ?>"><?</a></h1>--> */}
                                                    {/* <p><?<p> */}
                                                </div>
                                                {/* <div className="post" style="display:flex;justify-content:center;"> */}
                                                <div className="post">
                                                    {blog && blog.body ?
                                                        // <SyntaxHighlighter language="javascript" style={dark}>{blog.body}</SyntaxHighlighter>
                                                        // <SyntaxHighlighter language="javascript" style={dark}>
                                                        ReactHtmlParser(blog.body)
                                                        // </SyntaxHighlighter>
                                                        // ReactHtmlParser(blog.body) 
                                                        :
                                                        <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000} />
                                                    }
                                                    {/* <div id="hellobua" className="post-content" style="max-width:800px;background:#fff;width:100%;"> */}
                                                    <div id="hellobua" className="post-content">
                                                        {/* <!--<img src="<?php echo base_url(); ?>assets/images/profile-post-image.jpg" className="img-responsive" />--> */}
                                                        {/* <SyntaxHighlighter language={language ?? null} style={syntaxHighlighter.style}>
                                                        {blog.body ?? null}
                                                    </SyntaxHighlighter> */}
                                                        {/* {ReactHtmlParser(blog.body)} */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="panel-footer" style="clear:both"> */}
                                            <div className="panel-footer">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            {/* <i data-post_id="<?php echo $blog->id; ?>" className="jk-like material-icons">thumb_up</i> */}
                                                            <span>{blog.likes_count} Likes</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="material-icons">comment</i>
                                                            <span>{blog.comments_count} Comments</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="material-icons">share</i>
                                                            <span>Share</span>
                                                        </a>
                                                    </li>
                                                </ul>

                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input onKeyUp={onKeyUpComment} onChange={onChange} type="text" name="comment" value={formState.comment} className="form-control" placeholder="Type a comment" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}

                            <div id="jk_accordion_card" className="col-xs-12 col-sm-12 col-md-2 col-lg-2 card" style={{maxHeight: "500px", overflowY: "scroll", overflowX:"hidden"}}>
                            <h5 style={{textAlign:"center"}}>Similar Blogs</h5>
                                {blogs && blogs.length > 0 &&
                                    blogs.map((item) => (
                                        <li class="list-group-item">
                                        <Link key={item.id} to={`/${item.slug}`} style={{borderBottom: "1px"}}>{item.title}</Link>
                                        </li>
                                    ))
                                }
                                </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="comments-content content pt_shadow pt_video_comments">
                        <div className="comments-header">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> 0 Comments
                            {/* <span className="dropdown sort-comments-dropdown pull-right"> */}
                            <span className="sort-comments-dropdown pull-right">
                                <span className="dropdown-toggle pointer" type="button" data-toggle="dropdown">
                                    <i className="material-icons">sort</i> Sort By
                                </span>
                                <ul className="dropdown-menu">
                                    <li className="sort-comments" id="1">
                                        <a href="javascript:void(0);">Top Comments</a>
                                    </li>
                                    <li className="sort-comments" id="2">
                                        <a href="javascript:void(0);">Latest comments</a>
                                    </li>
                                </ul>
                            </span>
                        </div>
                        <div className="w100 pt_blogcomm_combo">
                            {/* <img className="avatar" src="http://localhost/video_subscriber/upload/photos/2020/07/EUEEX6hpLSJvdZKE5CkR_13_a7cab57b1e123942a8ddec335ce8476a_image.png" alt="jayantkumar314 avatar" /> */}
                            <textarea name="comment" className="form-control" id="comment-textarea" placeholder="Write your comment.."></textarea>

                            <button className="btn pull-right btn-main" onClick="PT_PostComment(this)" data-toggle="tooltip" title="Publish">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                        <div className="comment-button">
                            <hr />
                            <div className="user-comments" id="video-pinned-comments">
                                <div id="pinned-comment">

                                </div>
                            </div>
                        </div>
                        <div className="user-comments" id="video-user-comments">
                            {comments && comments.length > 0 ?
                                comments.map((item) => {
                                    return (<Comments props={item} updateComments />);
                                }) :
                                <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000} />
                            }
                            {
                                commentLoading &&
                                <BlogSkeleton />
                            }
                        </div>

                    </div>
                </div>
                <div className="content_items">
                    <div className="pills tags">
                        {/* <?php 
                        $temp['pills'] = $tags;
                        $this->load->view('common/snippets/pills', $temp); 
                    ?> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Blog
