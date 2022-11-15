import React from 'react'
// import {FacebookShareButton} from "react-share";
// import './Share.css'
import HelmetMetaData from 'components/core/HelmetMetaData'

import { ReactComponent as WhatsappIcon } from '../../icons/social/whatsapp.svg';
import { ReactComponent as FacebookIcon } from '../../icons/social/facebook.svg';
import { ReactComponent as TwitterIcon } from '../../icons/social/twitter.svg';
import { ReactComponent as TumblrIcon } from '../../icons/social/tumblr.svg';
import { ReactComponent as RedditIcon } from '../../icons/social/reddit.svg';
import { ReactComponent as LinkedinIcon } from '../../icons/social/linkedin.svg';
import { ReactComponent as YahooIcon } from '../../icons/social/yahoo.svg';
import { ReactComponent as GmailIcon } from '../../icons/social/gmail.svg';
import { ReactComponent as CopyIcon } from '../../icons/social/copy.svg';

function Share({ props }) {
    function shareOnLinkedIn() {
        typeof window !== 'undefined' && window.open(`http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(props.blog_url)}&title=${props.title}`, '', '_blank, width=500, height=500, resizable=yes, scrollbars=yes')
    }
    function shareOnFacebook() {
        typeof window !== 'undefined' && window.open(`http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(props.blog_url)}&title=${props.title}`, '', '_blank, width=500, height=500, resizable=yes, scrollbars=yes')
    }
    function shareOnTwitter() {
        typeof window !== 'undefined' && window.open(`http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(props.blog_url)}&title=${props.title}`, '', '_blank, width=500, height=500, resizable=yes, scrollbars=yes')
    }
    function handleCopy(e) {
        const text = e.currentTarget.dataset.clipboard
        navigator.clipboard.writeText(text)
    }
    return (
        <>
            {/* <HelmetMetaData ogTitle={props.title} description={props.short_description} ogImage={props.image} ogDescription={props.short_description} /> */}
            <div id="button_share">
                {/* <FacebookShareButton 
                    url={"http://www.camperstribe.com"}
                    quote={"CampersTribe - World is yours to explore"}
                    hashtag="#camperstribe"
                    className=''>
                    <FacebookIcon size={36} />
                </FacebookShareButton> */}
                <div className="share_buttons_wrap">
                    <div className="socialShareButtonItem mobile_w">
                        <a id="whatsapp_mobile" data-action="share/whatsapp/share" target="_blank" title="whatsapp" rel="nofollow" href={`whatsapp://send?text=${props.blog_url}`}>
                            <div className="socialItem">
                                <div className="socialItem_icon">
                                    <WhatsappIcon />
                                </div>
                            </div>
                        </a>
                        <div className="socialsharename">whatsapp</div>
                    </div>
                    <div className="socialShareButtonItem xl_w">
                        <a id="whatsapp_web" target="_blank" title="whatsapp" rel="nofollow" href={`https://web.whatsapp.com/send?text=${props.blog_url}`}>
                            <div className="socialItem">
                                <div className="socialItem_icon">
                                    <WhatsappIcon />
                                </div>
                            </div>
                        </a>
                        <div className="socialsharename">whatsapp</div>
                    </div>
                    <div className="socialShareButtonItem">
                        <a id="facebook" target="_blank" title="facebook" rel="nofollow" href={`http://www.facebook.com/sharer.php?u=${props.blog_url}&quote=${props.title}&hashtag=%23camperstribe`}>
                            <div className="socialItem">
                                <div className="socialItem_icon">
                                    <FacebookIcon />
                                </div>
                            </div>
                        </a>
                        <div className="socialsharename">facebook</div>
                    </div>
                    <div className="socialShareButtonItem">
                        <a id="twitter" target="_blank" title="twitter" rel="nofollow" href={`https://twitter.com/share?url=${props.blog_url}`}>
                            {/* // <a id="twitter" target="_blank" title="twitter" rel="nofollow" href={`https://twitter.com/share?url=api-in-codeignter&amp;amp;text=Simple%20Share%20Buttons&amp;amp;hashtags=simplesharebuttons"> */}
                            <div className="socialItem">
                                <div className="socialItem_icon">
                                    <TwitterIcon />
                                </div>
                            </div>
                        </a>
                        <div className="socialsharename">twitter</div>
                    </div>
                    {/*  <!--<div className="socialShareButtonItem">-->
                        <!--    <a id="pinterest" href='javascript:void((function()%7Bvar%20e=document.createElement('-->
                        <!--        script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());'-->
                        <!--        title="pinterest" rel="nofollow">-->
                        <!--        <div className="socialItem">-->
                        <!--            <div className="socialItem_icon"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"-->
                        <!--                    width="40" height="40" viewBox="0 0 192 192" style=" fill:#000000;">-->
                        <!--                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1"-->
                        <!--                        stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"-->
                        <!--                        stroke-dasharray="" stroke-dashoffset="0" font-family="none"-->
                        <!--                        font-weight="none" font-size="none" text-anchor="none"-->
                        <!--                        style="mix-blend-mode: normal">-->
                        <!--                        <path d="M0,192v-192h192v192z" fill="none"></path>-->
                        <!--                        <g id="Layer_1">-->
                        <!--                            <circle cx="24" cy="24" transform="scale(4,4)" r="20"-->
                        <!--                                fill="#d32f2f"></circle>-->
                        <!--                            <path-->
                                <!--                                d="M78.248,108c0,-13.316 -2.248,-17.928 -2.248,-23.152c0,-11.876 8.524,-12.848 12.128,-12.848c5.136,0 11.872,3.484 11.872,10c0,9.484 -8,10.684 -8,10.684c0,0 0,3.316 0,9.156c0,6.16 1.488,14.16 12.492,14.16c17.656,0 19.508,-24.608 19.508,-31.348c0,-9.316 -5.96,-28.652 -27.148,-28.652c-28.26,0 -32.852,25.252 -32.852,32c0,2.888 0.528,8.488 1.076,10.668c8.424,2.08 6.46,9.5 4.176,11.58c-3.316,3.064 -17.252,3.66 -17.252,-24.948c0,-27.248 24.288,-41.3 45.608,-41.3c20.288,0 42.392,14.008 42.392,40.984c0,24.072 -17.308,43.028 -35.488,43.028c-10.912,0 -16.7,-8.992 -16.7,-8.992c0,16.98 -13.832,41.312 -15.812,44.98c0,0 6.248,-31.416 6.248,-56z"-->
                        <!--                                fill="#ffffff"></path>-->
                        <!--                        </g>-->
                        <!--                    </g>-->
                        <!--                </svg></div>-->
            <!--        </div>-- >
                        < !--    </a > -->
                        < !--    < div className="socialsharename" > pinterest</div > -->
                        < !--</div > --> */}

                    <div className="socialShareButtonItem">
                        <a id="tumblr" target="_blank" rel="nofollow" href={`http://www.tumblr.com/share/link?url=${props.blog_url}`}>
                            <div className="socialItem">
                                <div className="socialItem_icon">
                                    <TumblrIcon />
                                </div>
                            </div>
                        </a>
                        <div className="socialsharename">tumblr</div>
                    </div>
                    {/* <!----> */}
                    <div className="socialShareButtonItem">
                        <a id="reddit" href={`http://reddit.com/submit?url=${props.blog_url}&title=${props.title}`} target="_blank" rel="nofollow">
                            {/* <a id="reddit" href={`http://reddit.com/submit?url=nter&amp;amp;title=How to make simple REST API in Codeignter." target="_blank" rel="nofollow"> */}
                            <div className="socialItem">
                                <div className="socialItem_icon">
                                    <RedditIcon />
                                </div>
                            </div>
                        </a>
                        <div className="socialsharename">reddit</div>
                    </div>
                    {/* <!----> */}
                    {/* < !----> */}
                    <div className="socialShareButtonItem">
                        <a id="linkedin" title="linkedin" rel="nofollow" onClick={shareOnLinkedIn}>
                            <div className="socialItem">
                                <div className="socialItem_icon">
                                    <LinkedinIcon />
                                </div>
                            </div>
                        </a>
                        <div className="socialsharename">linkedin</div>
                    </div>

                    <div className="socialShareButtonItem">
                        <a id="yahoo" title="yahoo" rel="nofollow" href={`mailto:?Subject=${props.title}&Body=${props.title} ${props.blog_url}`}>
                            <div className="socialItem">
                                <div className="socialItem_icon">
                                    <YahooIcon />
                                </div>
                            </div>
                        </a>
                        <div className="socialsharename">yahoo</div>
                    </div>
                    {/* <!----> */}
                    {/* < !----> */}
                    <div className="socialShareButtonItem">
                        <a id="gmail" title="gmail" rel="nofollow" href={`mailto:?Subject=${props.title}&Body=${props.title} ${props.blog_url}`}>
                            <div className="socialItem">
                                <div data-tooltip="Hi,)" className="socialItem_icon">
                                    <GmailIcon />
                                </div>
                            </div>
                        </a>
                        <div className="socialsharename">gmail</div>
                    </div>
                    <div className="socialShareButtonItem">
                        <div className="socialItem">
                            {/* <input id="copy_url" type="text" style="display: none;" value="https://www.bestdivision.com/blog/how-to-make-simple-rest-api-in-codeignter"/> */}
                            {/* <input id="copy_url" type="hidden" value={props.blog_url} /> */}
                            <div className="tooltip" >
                                <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
                            </div>
                            <div data-tooltip="Hi, I'm a tooltip. Pretty easy uh ? ;)" id="Copy" onClick={handleCopy} className="socialItem_icon copyUrl" data-clipboard={props.blog_url}>
                                <CopyIcon />
                            </div>
                        </div>
                        <div className="socialsharename">Copy</div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Share
