import React, { Fragment, useState, useEffect } from 'react'
import axios, { axiosAjax } from 'axios'

import moment from "moment";
import Moment from "react-moment";

import Modal from 'components/Modal'

import { ReactComponent as LikeIcon } from '../../icons/like.svg';
import { ReactComponent as LikedIcon } from '../../icons/liked.svg';
import { ReactComponent as DislikeIcon } from '../../icons/dislike.svg';
import { ReactComponent as DislikedIcon } from '../../icons/disliked.svg';

function Comment({ commentType, props, updatePublicCommentReplyDisplay }) {
    const [liked, setLiked] = useState(props.reaction_id == 1)
    const [disliked, setDisliked] = useState(props.reaction_id == 2)
    const [likesCount, setLikesCount] = useState(props.likes_count)
    const [dislikesCount, setDislikesCount] = useState(props.dislikes_count)
    const [modalOpen, setModalOpen] = useState(false);

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

    function decreaseDislikes(commentId) {
        setDislikesCount(parseInt(dislikesCount) - 1)
    }
    function increaseDislikes(commentId) {
        setDislikesCount(parseInt(dislikesCount) + 1)
    }
    function increaseLikes(commentId) {
        setLikesCount(parseInt(likesCount) + 1)
    }
    function decreaseLikes(commentId) {
        setLikesCount(parseInt(likesCount) - 1)
    }

    function onClickLikeButton(e) {
        let commentId = e.currentTarget.getAttribute('data-comment_id');
        let data = {};
        if (commentType === 'comment_reply') {
            data.comment_reply_id = commentId
        } else {
            data.comment_id = commentId
        }
        let likesCount = e.currentTarget.getAttribute('data-likes');
        if (disliked) {
            decreaseDislikes(commentId);
            increaseLikes(commentId);
        }
        if (liked) {
            decreaseLikes(commentId);
            data.reaction_id = 0;
        } else {
            increaseLikes(commentId);
            data.reaction_id = 1;
        }
        setLiked(!liked);
        setDisliked(false);
        postReaction(data);
    }
    function onClickDislikeButton(e) {
        let commentId = e.currentTarget.getAttribute('data-comment_id');
        let data = {};
        if (commentType === 'comment_reply') {
            data.comment_reply_id = commentId
        } else {
            data.comment_id = commentId
        }
        debugger;
        if (liked) {
            decreaseLikes(commentId);
            increaseDislikes(commentId);
        }
        if (disliked) {
            decreaseDislikes(commentId);
            data.reaction_id = 0;
        } else {
            data.reaction_id = 2;
            increaseDislikes(commentId);
        }
        setDisliked(!disliked);
        setLiked(false);

        postReaction(data);
    }
    function onClickPublicReply(e) {
        updatePublicCommentReplyDisplay(() => (''))
    }
    let hello = MediaDeviceInfo.deviceId;
    let hellol = window.navigator;
    let hellolk = window.gaData;
    let hellolk5 = window.dataLayer;


    return (
        <>
            <div className="pull-right delete-comment" onClick="PT_DeleteComment(3);">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
            <div className="pull-right pin-comment" onClick="PT_PinComment(3,true);">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-paperclip" id="pin-comment"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg> */}
            </div>
            <div className="panel-post user-name" >
                <div className="user-heading">
                    <div className="media">
                        <div className="media-left">
                            <a href="#">
                                <img width="42" height="42" src={`${process.env.REACT_APP_ASSETS_URL}/uploads/avatar/${props.avatar}`} alt={props.user_name} />
                            </a>
                        </div>
                        <div className="media-body">
                            <div className="media-heading">
                                <h4><a href={`/profile/${props.user_slug}`}>{props.display_name}</a></h4>
                                <span className="times_in_ago">{MediaDeviceInfo.deviceId}</span>
                                {/* <span className="times_in_ago">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span> */}
                                <span className="times_in_ago">{moment.utc(props.date_created).local().format('YYYY-MM-DD HH:mm')}</span>
                                {/* <span className="times_in_ago">{props.date_created}</span> */}
                                {/* <span className="times_in_ago">{moment.utc(props.date_created).fromNow()}</span> */}
                                {/* {moment.fn.fromNowOrNow = function (a) {
                                    if (Math.abs(moment().diff(this)) < 1000) { 
                                        return 'just now';
                                    }
                                    return this.fromNow(a);
                                }} */}
                                {/* <span className="times_in_ago">{moment.utc(props.date_created).fromNow(true)}</span> */}
                                <span className="times_in_ago">
                                    <Moment interval={1000} fromNow>
                                        {moment.utc(props.date_created)}
                                    </Moment>
                                </span>
                            </div>

                            <div className="user-comment">
                                <p className="comment-text">{props.text}</p>
                                <div className="width-100 div-vote-comment">
                                    <span className="div-vote-comment-btn">
                                        <div className="panelFooter_row_row" >
                                            <div className="like_post">
                                                <div onClick={onClickLikeButton} data-comment_id={props.id} data-like="like" className="like_post" data-likes={props.likes_count} data-post={props.id}>
                                                    {liked ? <LikedIcon /> : <LikeIcon />}
                                                </div>
                                            </div>
                                            <div>{likesCount}&nbsp;Likes</div>&nbsp;&nbsp;
                                            <div onClick={onClickDislikeButton} data-comment_id={props.id} className="dislike_post" data-dislikes={props.id} data-post={props.id}>
                                                {disliked ? <DislikedIcon /> : <DislikeIcon />}
                                            </div>
                                            {/* <div>{dislikesCount}&nbsp;Dislikes</div> */}
                                            <div>{dislikesCount}&nbsp;</div>
                                            <span onClick={onClickPublicReply} >&nbsp;REPLY</span>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment
