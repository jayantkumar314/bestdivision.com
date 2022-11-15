import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react'
import { Link, useHistory } from "react-router-dom";
import axios, { axiosAjax } from 'axios'
import Svg from 'components/Svg'

import Loader from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


import { ReactComponent as LikeIcon } from '../../icons/like.svg';
import { ReactComponent as LikedIcon } from '../../icons/liked.svg';
import { ReactComponent as DislikeIcon } from '../../icons/dislike.svg';
import { ReactComponent as DislikedIcon } from '../../icons/disliked.svg';
import Comments from 'components/Comments'

import Share from 'components/Share'
import Modal from 'components/Modal'

import moment from "moment";

// import './Post.css'

const initialBlogs = [];
const initialParams = {
    "start": 0,
    "per_page": 10
}

function Post({ props, onClickShare, lastBlogElementRef }) {
    const [liked, setLiked] = useState(props.reaction_id == 1)
    const [disliked, setDisliked] = useState(props.reaction_id == 2)
    const [likesCount, setLikesCount] = useState(props.likes_count)
    const [dislikesCount, setDislikesCount] = useState(props.dislikes_count)
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

    async function onClickLikeButton(e) {
        let postId = e.currentTarget.getAttribute('data-post');
        let data = {
            blog_id: postId
        }
        if (liked) {
            data.reaction_id = 0;
        } else {
            data.reaction_id = 1;
        }
        let likesCount = e.currentTarget.getAttribute('data-likes');
        let isPosted = await postReaction(data);
        if(isPosted) {

            if (disliked) {
                decreaseDislikes(postId);
                increaseLikes(postId);
            }
            if (liked) {
                decreaseLikes(postId);
            } else {
                increaseLikes(postId);
            }
            setLiked(!liked);
            setDisliked(false);
        } else {
            alert('Sorry you are not logged in ')
        }

    }
    async function onClickDislikeButton(e) {
        let postId = e.currentTarget.getAttribute('data-post');
        let data = {
            blog_id: postId
        }
        if (disliked) {
            data.reaction_id = 0;
        } else {
            data.reaction_id = 2;
        }
        let isPosted = await postReaction(data);
        if (isPosted) {
            if (liked) {
                decreaseLikes(postId);
                increaseDislikes(postId);
            }
            if (disliked) {
                decreaseDislikes(postId);
            } else {
                increaseDislikes(postId);
            }
            setDisliked(!disliked);
            setLiked(false);
        } else {
            alert('Sorry not logged in dislike button')
        }

    }
    // function onClickShare(e) {
    //     e.persist();
    //     setModalOpen(true)
    // }
    async function getBlogComments(){
        setCommentLoading(true)
        let response = await axios({
            method: 'get',
            // url: `comments/${window.location.pathname.split('/')[2]}`,
            url: `blogs/${props.id}/comments`,
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
            if(response.data.data) {
                return true
            } else {
                return false
            }
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
                    blog_id: props.id,
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
    return (
        <div key={props.id} ref={lastBlogElementRef} className="body">
            {
                modalOpen &&
                <Modal setModalOpen={setModalOpen} modalClassName='share_modal' children={<Share />} />
            }
            <div className="panel panel-default panel-post">
                <div className="panel-heading">
                    <div className="media">
                        <div className="media-left">
                            <a href="#">
                                <img width="42" height="42" src={`${props.avatar ? `${process.env.REACT_APP_ASSETS_URL}/uploads/${props.avatar}` : ''}`} />
                            </a>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">
                                <Link to={`/profile/${props.user_slug}`}>{props.display_name}</Link>
                                <div className="user_slug">@{props.user_name}</div>
                            </h4>
                            {/* <div className="dates_info"> <span className="dates_info_bold">Published On</span> - <span className="dates_info_date">{moment.unix(props.date_created).format("MMMM Do YYYY, h:mma")}20 September 2020</span>  <span className="dates_info_bold">Last Updated</span> - <span className="dates_info_date">20 September 2020</span>
                            </div> */}
                            <div className="dates_info"> <span className="dates_info_bold">Published On</span> - <span className="dates_info_date">{moment(props.date_created).format("Do MMMM YYYY")}</span>  <span className="dates_info_bold">Last Updated</span> - <span className="dates_info_date">{moment(props.date_modified).format("Do MMMM YYYY")}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="post">
                        <div className="post-heading">
                            <h2 className="post-title"><Link to={`/templates/${props.slug}`}>{props.title}</Link></h2>
                            <p>{props.short_description}</p>
                            <p></p>
                        </div>
                        <div className="post-content">
                            <img src={`${props.image}`} className="img-responsive" />
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <div className="panelFooter_row panelFooter_rowOne">
                        <div href="#">
                            {props.comments_count} &nbsp;Comments
                        </div>
                        &nbsp;&nbsp;
                        <div href="#">
                            {props.shares_count}&nbsp;Shares
                        </div>
                    </div>
                    <div className="panelFooter_row panelFooter_rowTwo" >
                        {/* <div style="display:flex;"> */}
                        <div className="panelFooter_row_row" >
                            <div className="like_post" data-post="46" data-like="like">
                                <div onClick={onClickLikeButton} className="like_post" data-likes={props.likes_count} data-post={props.id}>
                                    {liked ? <LikedIcon /> : <LikeIcon />}
                                </div>
                            </div>
                            {/* <div>{likesCount}&nbsp;Likes</div> */}
                            <div>{likesCount}&nbsp;Likes</div>
                            &nbsp;&nbsp;
                            <div onClick={onClickDislikeButton} className="dislike_post" data-dislikes={props.id} data-post={props.id}>
                                {disliked ? <DislikedIcon /> : <DislikeIcon />}
                            </div>
                            <div>{dislikesCount}&nbsp;Dislikes</div>
                        </div>
                        <div className="panelFooter_row_row">
                            <div className="comment_div" onClick={onClickOpenCommentBox}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                    <title>comment-o</title>
                                    <path d="M14 6c-6.5 0-12 3.656-12 8 0 2.328 1.563 4.547 4.266 6.078l1.359 0.781-0.422 1.5c-0.297 1.109-0.688 1.969-1.094 2.688 1.578-0.656 3.016-1.547 4.297-2.672l0.672-0.594 0.891 0.094c0.672 0.078 1.359 0.125 2.031 0.125 6.5 0 12-3.656 12-8s-5.5-8-12-8zM28 14c0 5.531-6.266 10-14 10-0.766 0-1.531-0.047-2.266-0.125-2.047 1.813-4.484 3.094-7.187 3.781-0.562 0.156-1.172 0.266-1.781 0.344h-0.078c-0.313 0-0.594-0.25-0.672-0.594v-0.016c-0.078-0.391 0.187-0.625 0.422-0.906 0.984-1.109 2.109-2.047 2.844-4.656-3.219-1.828-5.281-4.656-5.281-7.828 0-5.531 6.266-10 14-10v0c7.734 0 14 4.469 14 10z"></path>
                                </svg>
                                <span>&nbsp;Comment</span>
                            </div>
                        </div>
                        <div className="panelFooter_row_row" >
                            <a onClick={onClickShare} className="share_button" data-toggle="modal" data-target="#sharepost" data-url="https://www.bestdivision.com/blog/how-to-make-simple-rest-api-in-codeignter" data-title="How to make simple REST API in Codeignter.">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                    <title>mail-forward</title>
                                    <path d="M28 10c0 0.266-0.109 0.516-0.297 0.703l-8 8c-0.187 0.187-0.438 0.297-0.703 0.297-0.547 0-1-0.453-1-1v-4h-3.5c-6.734 0-11.156 1.297-11.156 8.75 0 0.641 0.031 1.281 0.078 1.922 0.016 0.25 0.078 0.531 0.078 0.781 0 0.297-0.187 0.547-0.5 0.547-0.219 0-0.328-0.109-0.438-0.266-0.234-0.328-0.406-0.828-0.578-1.188-0.891-2-1.984-4.859-1.984-7.047 0-1.75 0.172-3.547 0.828-5.203 2.172-5.391 8.547-6.297 13.672-6.297h3.5v-4c0-0.547 0.453-1 1-1 0.266 0 0.516 0.109 0.703 0.297l8 8c0.187 0.187 0.297 0.438 0.297 0.703z"></path>
                                </svg> <span>Share</span>
                            </a>
                        </div>
                    </div>
                    {openCommentBox &&
                        // <div className="form-group">
                        //     <div className="input-group">
                        //         <input type="textaria" className="form-control" placeholder="Type a comment" />
                        //     </div>
                        // </div>
                        <div className="panelFooter_row panelFooter_rowFour form-group" >
                            <div className="input-group">
                                <textarea data-type="comment" className="form-control" onKeyDown={handleKeyDown} />
                            </div>
                        </div>
                    }
                    <div className="panelFooter_row panelFooter_rowThree " >
                        {comments && comments.length > 0 &&
                            comments.map((item) => {
                                return (<Comments props={item} handleKeyDown={handleKeyDown} commentReplyArea={commentReplyArea} updateComments />);
                            })
                        }
                        {
                            commentLoading &&
                            <div className="loader_container" >
                                <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post