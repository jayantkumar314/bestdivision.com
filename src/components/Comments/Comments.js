import React, { Fragment, useState, useEffect, useRef } from 'react'
// import './comments.css'
import Comment from './Comment'
import Loader from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import axios, { axiosAjax } from 'axios'
const initialCommentReplies = []
const initialParams = {
    "start": 0,
    "per_page": 10
}

function Comments({ props, handleKeyDown, commentReplyArea }) {
    const [publicCommentReplyDisplay, updatePublicCommentReplyDisplay] = useState('hide');
    const [commentReplies, updateCommentReplies] = useState(initialCommentReplies);
    const [commentIdForReplies, updateCommentIdForReplies] = useState('');
    const [isBottom, setIsBottom] = useState(false);
    const [params, updateParams] = useState(initialParams)
    const [commentReplyLoading, setCommentReplyLoading] = useState(false)
    
    useEffect(() => {
        if (isBottom) {
            getCommentReplies(commentIdForReplies);
        }
    }, [isBottom]);

    function onClickPublicCancelReply(e) {
        updatePublicCommentReplyDisplay(() => ('hide'))
    }
    function showReplies(e) {
        let id = e.target.dataset.id
        updateCommentIdForReplies(() => (id))
        getCommentReplies(id);
    }
    async function getCommentReplies(id){
        setCommentReplyLoading(true)
        let response = await axios({
            method: 'get',
            // url: `comments/${window.location.pathname.split('/')[2]}`,
            url: `comments/${id}/replies`,
            params:params
        }).then((response) => {
            updateCommentReplies(() => (
                [ ...commentReplies, ...response.data.data]
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
                setCommentReplyLoading(false)
            });
    }
    function handleScroll(e) {
        const scrollTop = e.target.scrollTop
        const clientHeight = e.target.clientHeight
        const scrollHeight = e.target.scrollHeight
        if (scrollTop + clientHeight + 50 >= scrollHeight) {
            setIsBottom(true);
        }
    }
    return (
        <div className="main-comment" data-id={props.id} id={`comment-${props.id}`}>
            <div className="main-comment-data-sp">
                <Comment props={props} updatePublicCommentReplyDisplay={updatePublicCommentReplyDisplay} />
            </div>
            <div onScroll={handleScroll} className="pt-comment-replies user-comment" data-id={props.id}>
                <div class={`pt-comment-item-reply-form ${publicCommentReplyDisplay}`} id="comm-reply-3" data-reply-id="5">
                    <div className="panelFooter_row panelFooter_rowFour form-group" >
                        <div className="input-group">
                            <textarea data-type="comment-reply" data-id={props.id} className="form-control" onKeyDown={handleKeyDown} />
                        </div>
                    </div>
                    {/* <input type="text" className="form-control" placeholder="Write a comment and press ENTER" onkeydown="PT_RVReply(this.value,'3',event,'58');" /> */}
                    <button onClick={onClickPublicCancelReply} className="btn btn-primary">Cancel</button>
                    <button className="btn btn-secondary">Reply</button>
                </div>
                <div className="comment_replies_button" data-id={props.id} onClick={showReplies} >View {props.reply_count} Replies</div>
                <div className="pt-comment-item-replies-list" id="pt-comment-replies-cont-3">
                    <div className="main-comment-reply" data-id="5" id="reply-5">
                        {commentReplies && commentReplies.length > 0 &&
                            commentReplies.map((item) => {
                                return (<Comment commentType="comment_reply" props={item} />)
                            })
                        }
                        {commentReplyLoading && 
                            <div className="loader_container" >
                                <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000} />
                            </div>
                        }
                    </div>
                </div>
                {/* <div className="pt-comment-item-reply-form" id="comm-reply-3" data-reply-id="5">
                    <input type="text" className="form-control" placeholder="Write a comment and press ENTER" onkeydown="PT_RVReply(this.value,'3',event,'58');" />
                </div> */}

            </div>
            <div className="clear"></div>
        </div>
    )
}

export default Comments
