import React, { Fragment, useLayoutEffect, useState, useEffect, useRef, useCallback } from 'react'
// import { useHistory, useLocation, withRouter } from 'react-router-dom'

import ReactDOM from 'react-dom'
import { Link, withRouter, useHistory } from 'react-router-dom'

import TutorialSkeleton from './TutorialSkeleton'
// import './Tutorial.css'

import axios, { axiosAjax } from 'axios'
import FocusTrap from 'focus-trap-react'

import styled from 'styled-components'
import hljs from "highlight.js";
import javascript from 'highlight.js/lib/languages/javascript'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'html-react-parser'

import Post from 'components/Post'
import Svg from 'components/Svg'

import Loader from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Modal from 'components/Modal'
import useTutorialLeftNav from './useTutorialLeftNav'

hljs.registerLanguage('javascript', javascript)
const initialParams = {
    q: '',
    start: 0
}

function Tutorial(props) {
    const history = useHistory()
    const [mode, setMode] = useState('online')
    const [dropdown, setDropdown] = useState(false)
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isTutorialOpen, setIsTutorialOpen] = useState(false);
    const [isExampleOpen, setIsExampleOpen] = useState(false);
    const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);

    const tutorialsLeftNav = useRef(null);
    const tutorialBody = useRef(null); 
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 500;

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tutorial, setTutorial] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const [params, setParams] = useState(initialParams)
    // const [pageNumber, setPageNumber] = useState(1)
    const { tutorialLeftNavloading, tutorialLeftNavError, tutorialLeftNav, tutorialLeftNavHasMore } = useTutorialLeftNav(params)

    const onClickOutside = e => {
        if (tutorialsLeftNav && tutorialsLeftNav.current.contains(e.target)) return;
        setIsLeftNavOpen(false);
    };

    useEffect(() => {
        if (isMobile) {
            if (isLeftNavOpen) {
                typeof window !== 'undefined' && document.querySelector('html').classList.add('scroll-lock');
            } else {
                typeof window !== 'undefined' && document.querySelector('html')?.classList?.remove('scroll-lock');
            }
        }
    }, [isLeftNavOpen])

    useEffect(() => {
        updateCodeSyntaxHighlighting();
    }, [tutorial])
    const updateCodeSyntaxHighlighting = () => {
        if (tutorialBody) {
            const nodes = tutorialBody.current.querySelectorAll('pre');
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

    useLayoutEffect(() => {
        if (!isMobile) {
            setIsLeftNavOpen(true);
        }
    }, [])

    useEffect(() => {
        setTutorial([])
    }, [params.q, params.order_by])

    let source = axios.cancelToken.source();
    async function getTutorial(attributes){
        setLoading(true)
        setError(false)
        let url = '';
        if (typeof window !== 'undefined' && window.location.pathname.split('/')[2] && window.location.pathname.split('/')[3]) {
            url = `tutorials/${window.location.pathname.split('/')[2]}/${window.location.pathname.split('/')[3]}`;
        } else if(typeof window !== 'undefined' && window.location.pathname.split('/')[2]){
            url = `tutorials/${window.location.pathname.split('/')[2]}`;
        }
        let response = await axios({
            method: 'get',
            url: url,
            cancelToken: source.token
        }).then((response) => {
            if (response.data.data) {
                setTutorial(response.data.data)
            }
            setHasMore(response.data.data.length > 0)
            setLoading(false)

            // updateTutorials(() => (response.data.data))
            // localStorage.setItem("tutorials", JSON.stringify(response.data.data))

        }).catch((error) => {
            if (axios.isCancel(error)) {
                return
            }
            setError(true)
            // setMode('offline')
            // let tutorials = localStorage.getItem("tutorials")
            // updateTutorials(() => (JSON.parse(tutorials)))

        }).finally(() => {
        });
        return () => source.cancel()
    }
    useEffect(() => {
        getTutorial();
        return () => source.cancel()
    }, [params, history.location])
    
    useEffect(() => {
        getTutorial();
        return () => source.cancel()
    }, [])

    const observer = useRef()


    const lastTutorialElementRef = useCallback(node => {
        if (loading) {
            return
        }
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setParams(() => ({
                    ...params,
                    start: parseInt(params.start) + 10
                }));
            }
        })
        if (node) {
            observer.current.observe(node)
        }
    }, [loading, hasMore])

    function onClickShare(e) {
        e.persist();
        setModalOpen(true)
    }
    function handleSearch(e) {
        setParams(() => ({
            ...params,
            q: e.target.value,
            start: 0
        }));

    }
    function onChangeSortBy(e) {
        setParams(() => ({
            ...params,
            start: 0,
            order_by: e.target.value
        }));
    }
    // useEffect(() => {
    //     if (isBottom) {
    //         getComments();
    //     }
    // }, [isBottom]);
    console.log(tutorial)
    return (
        <>
            {typeof window !== 'undefined' && isLeftNavOpen && isMobile && ReactDOM.createPortal(
                <div onClick={onClickOutside} className={`tent visible`}></div>, document.body)
            }
            <section id="section_content" class="css-scope section_content">
                <section class="content">
                    {/* <nav className="tutorials_leftnav">
                        <ul>
                            <li>
                                <a>Features</a>
                                <li><a>features1</a></li>
                                <li><a>features2</a></li>
                                <li><a>features3</a></li>
                                <li><a>features4</a></li>
                            </li>
                            <li>
                                <a>Features</a>
                                <li><a>features1</a></li>
                                <li><a>features2</a></li>
                                <li><a>features3</a></li>
                                <li><a>features4</a></li>
                            </li>
                            <li><a>Hello</a></li>
                            <li><a>Hello</a></li>
                            <li><a>Hello</a></li>
                            <li><a>Hello</a></li>
                        </ul>
                    </nav> */}



                    {/* <div class="container-fluid" style="padding-left:0;"> */}
                    <div class="container-fluid" >
                        <div class="row clearfix">
                            {/* <div class="col-xs-12 col-sm-12 col-md-8 col-lg-2" style="padding-left: 0px;margin-right: 0px;margin-left: 0px;"> */}
                            {isLeftNavOpen &&
                                <div class="col-xs-12 col-sm-12 col-md-8 col-lg-2" >
                                    {/* <div class="leftnav leftnav_tutorial2" style="transform:translateX(0%); position: initial;width: 100%;transform: translateX(0%);overflow: hidden;padding-bottom: 0;"> */}
                                    <div ref={tutorialsLeftNav} class="leftnav_tutorial2 tutorials_leftnav active" >
                                        <div class="css-scope header_item  header_itemStartTutorials">
                                            <i class='arrow left_arrow'></i>
                                            <div onClick={() => setIsLeftNavOpen(false)} id="menu" class="css-scope header_icon waves-effect">
                                                <div class="css-scope header_btn">
                                                    <div id="header_menuIcon" class="css-scope icon">
                                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon_svg" viewBox="0 0 24 24"><title>menu</title><path d="M3 6h18v2.016h-18v-2.016zM3 12.984v-1.969h18v1.969h-18zM3 18v-2.016h18v2.016h-18z"></path></svg></div></div></div><div class="css-scope header_logo">
                                            <a href="#">{typeof window !== 'undefined' && window.location.pathname.split('/')[2].toUpperCase()}</a>
                                            </div>
                                        </div>
                                        {/* <ul class="custom-scrollbar list-unstyled ps ps--active-y" style="max-height:100vh;padding-bottom:0;margin-bottom:0;"> */}
                                        <ul class="custom-scrollbar list list-unstyled ps ps--active-y">
                                            <li>
                                                <form class="search-form" onkeypress="return event.keyCode != 13;" role="search" method="GET" autocomplete="off">
                                                    <div class="form-group md-form mt-0 d-block waves-light waves-effect waves-light">
                                                        <input id="tutorial_left_sidebar_search" type="text" class="form-control pb-1 pt-2 mb-0" name="tutorial_left_sidebar_search" placeholder="Search" />
                                                        <label for="tutorial_left_sidebar_search" class="sr-only active">Search</label>
                                                    </div>
                                                    <div class="dropdown-wrapper"></div>
                                                </form>
                                            </li>
                                            <li className="css-scope navInternalLink">
                                                <a className="css-scope waves-effect" >Home</a>
                                            </li>
                                            <li onClick={() => setIsTutorialOpen(!isTutorialOpen)} className="css-scope list_group collapsed">
                                                <div className="liGroup_btn" >
                                                    <h4 className="css-scope waves-effect" >Tutorials</h4>
                                                    <i class={isTutorialOpen ? 'arrow up_arrow' : 'arrow down_arrow'}></i>
                                                </div>
                                                {isTutorialOpen &&
                                                    <ul class="collapsible collapsible-accordion" role="menu" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
                                                        {tutorialLeftNav && tutorialLeftNav.length > 0 &&
                                                            tutorialLeftNav.map((item, index) => {
                                                                if (tutorialLeftNav.length === index + 1) {
                                                                    return (
                                                                        <li className="css-scope navInternalLink">
                                                                            <Link to={`/tutorials/${typeof window !== 'undefined' && window.location.pathname.split('/')[2]}/${item.slug}`} title={item.title} className="css-scope waves-effect" >{typeof window !== 'undefined' && `${window.location.pathname.split('/')[2].charAt(0).toUpperCase()}${window.location.pathname.split('/')[2].slice(1)}` } - {item.title}</Link>
                                                                        </li>);
                                                                } else {
                                                                    return (
                                                                        <li className="css-scope navInternalLink">
                                                                            <Link to={`/tutorials/${typeof window !== 'undefined' && window.location.pathname.split('/')[2]}/${item.slug}`} title={item.title} className="css-scope waves-effect" >{typeof window !== 'undefined' && `${window.location.pathname.split('/')[2].charAt(0).toUpperCase()}${window.location.pathname.split('/')[2].slice(1)}`} - {item.title}</Link>
                                                                        </li>);
                                                                }
                                                            })
                                                        }
                                                        {/* <li id="menu-item-88068" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-88068" style="background:#ffefd5;padding-top: 0.5rem; padding-bottom: 0.5rem;"><h5 style="padding-left:20px;margin-bottom:0">HTML Tutorial</h5></li> */}
                                                        {/* <li id="menu-item-88068" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-88068" ><h5>HTML Tutorial</h5></li> */}
                                                        <li role="separator" class="divider"></li>
                                                        {/* <li id="menu-item-88068" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-88068" ><h5>Tutorial</h5></li> */}

                                                    </ul>
                                                }
                                            </li>
                                            <li onClick={() => setIsExampleOpen(!isExampleOpen)} className="css-scope list_group collapsed">
                                                <div className="liGroup_btn" >
                                                    <h4 className="css-scope waves-effect" >Examples</h4>
                                                    <i class={isExampleOpen ? 'arrow up_arrow' : 'arrow down_arrow'}></i>
                                                </div>
                                                {isExampleOpen &&
                                                    <ul class="collapsible collapsible-accordion" role="menu" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
                                                        {/* {tutorials && tutorials.length > 0 &&
                                                            tutorials.map((tutorial, index) => {
                                                                if (tutorials.length === index + 1) {
                                                                    return (
                                                                        <li className="css-scope navInternalLink">
                                                                            <Link to={`/tutorials/html/${tutorial.slug}`} title={tutorial.title} className="css-scope waves-effect" >HTML - {tutorial.title}</Link>
                                                                        </li>);
                                                                } else {
                                                                    return (
                                                                        <li className="css-scope navInternalLink">
                                                                            <Link to={`/tutorials/html/${tutorial.slug}`} title={tutorial.title} className="css-scope waves-effect" >HTML - {tutorial.title}</Link>
                                                                        </li>);
                                                                }
                                                            })
                                                        } */}
                                                        {/* <li id="menu-item-88068" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-88068" style="background:#ffefd5;padding-top: 0.5rem; padding-bottom: 0.5rem;"><h5 style="padding-left:20px;margin-bottom:0">HTML Tutorial</h5></li> */}
                                                        {/* <li id="menu-item-88068" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-88068" ><h5>HTML Tutorial</h5></li> */}
                                                        <li role="separator" class="divider"></li>
                                                        {/* <li id="menu-item-88068" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-88068" ><h5>Tutorial</h5></li> */}

                                                    </ul>
                                                }
                                            </li>

                                        </ul>
                                        {/* <div class="sidenav-bg mask-strong" style="width: 240px;"></div> */}
                                        <div class="sidenav-bg mask-strong" ></div>
                                    </div>            </div>
                            }
                            <div id="" class={isLeftNavOpen ? `col-xs-12 col-sm-12 col-md-8 col-lg-8` : `col-xs-12 col-sm-12 col-md-8 col-lg-10`}>
                                <div class="post-heading text-center">
                                    {/* <h1 class="post-title" style="margin-top:3rem;">Introduction</h1> */}
                                    <h1 class="post-title" >{tutorial.title}</h1>
                                </div>
                                <div class="previous_next_container-top">
                                    <Link to={`/tutorials/${typeof window !== 'undefined' && window.location.pathname.split('/')[2]}/${tutorial.previous_tutorial}`} class="btn btn-light" type="button" disabled="">Previous</Link>
                                    <div id="toggle_codeFullScreen" class="css-scope">
                                        <div class="css-scope header_icon waves-effect">
                                            <div class="css-scope header_btn">
                                                <div class="css-scope icon">
                                                    {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon_svg" style="pointer-events:none;display:block;width:100%;height:100%;" viewBox="0 0 24 24"><title>apps</title><path d="M15.984 20.016v-4.031h4.031v4.031h-4.031zM15.984 14.016v-4.031h4.031v4.031h-4.031zM9.984 8.016v-4.031h4.031v4.031h-4.031zM15.984 3.984h4.031v4.031h-4.031v-4.031zM9.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 20.016v-4.031h4.031v4.031h-4.031zM9.984 20.016v-4.031h4.031v4.031h-4.031zM3.984 8.016v-4.031h4.031v4.031h-4.031z"></path></svg> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={`/tutorials/${typeof window !== 'undefined' && window.location.pathname.split('/')[2]}/${tutorial.next_tutorial}`} title="Simple Html Page" >Next</Link>
                                </div>
                                <div id="single_tutorial_body" class="card">
                                    {!isLeftNavOpen &&
                                        <div class="css-scope header_item  header_itemStartTutorials">
                                            <i class='arrow right_arrow'></i>
                                            <div onClick={() => setIsLeftNavOpen(true)} id="menu" class="css-scope header_icon waves-effect">
                                                <div class="css-scope header_btn">
                                                    <div id="header_menuIcon" class="css-scope icon">
                                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon_svg" viewBox="0 0 24 24"><title>menu</title><path d="M3 6h18v2.016h-18v-2.016zM3 12.984v-1.969h18v1.969h-18zM3 18v-2.016h18v2.016h-18z"></path></svg></div></div></div><div class="css-scope header_logo">
                                            </div>
                                        <a href="#">{typeof window !== 'undefined' && window.location.pathname.split('/')[2]}</a>
                                        </div>
                                    }
                                    <div class="body">
                                        <div class="panel panel-default panel-post">

                                            <div class="panel-body">
                                                <div class="post">
                                                    <div class="post-heading">
                                                        <p></p><p>
                                                        </p></div>
                                                    <div ref={tutorialBody} class="post-content">
                                                        {tutorial && tutorial.body ?
                                                            ReactHtmlParser(tutorial.body) :
                                                            <TutorialSkeleton />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                </div>
                                <div class="previous_next_container-bottom">
                                    <Link class="btn btn-light" to={`/tutorials/${typeof window !== 'undefined' && window.location.pathname.split('/')[2]}/${tutorial.previous_tutorial}`} title="Simple Html Page" >Previous</Link>
                                    <Link class="btn btn-danger float-right" to={`/tutorials/${typeof window !== 'undefined' && window.location.pathname.split('/')[2]}/${tutorial.next_tutorial}`} title="Simple Html Page" >Next</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>        </section>
        </>
    )
}

export default withRouter(Tutorial)
