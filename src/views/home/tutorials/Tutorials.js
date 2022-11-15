import React, { Fragment, useLayoutEffect, useState, useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
// import './Tutorials.css'
import axios, { axiosAjax } from '../../axios'
import FocusTrap from 'focus-trap-react'


import Post from 'components/Post'
import Svg from 'components/Svg'

import Loader from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Modal from 'components/Modal'
import useBlogSearch from './useBlogSearch'

const initialParams = {
    q: '',
    start: 0
}

function Tutorials() {
    const [mode, setMode] = useState('online')
    const [dropdown, setDropdown] = useState(false)
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isTutorialOpen, setIsTutorialOpen] = useState(false);
    const [isExampleOpen, setIsExampleOpen] = useState(false);
    const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);

    const tutorialsLeftNav = useRef(null);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 500;

    const onClickOutside = e => {
        if (tutorialsLeftNav && tutorialsLeftNav.current.contains(e.target)) return;
        setIsLeftNavOpen(false);
    };

    useEffect(() => {
        if(isMobile) {
            if (isLeftNavOpen) {
                document.querySelector('html').classList.add('scroll-lock');
            } else {
                document.querySelector('html')?.classList?.remove('scroll-lock');
            }
        }
    }, [isLeftNavOpen])
    
    useLayoutEffect(() => {
        if (!isMobile) {
            setIsLeftNavOpen(true);
        }
    }, [])

    const [params, setParams] = useState(initialParams)
    // const [pageNumber, setPageNumber] = useState(1)
    const { loading, error, blogs, hasMore } = useBlogSearch(params)

    const observer = useRef()


    const lastBlogElementRef = useCallback(node => {
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
    return (
        <>
            {isLeftNavOpen && isMobile && ReactDOM.createPortal(
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
                                                <a href="#">HTML</a>
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
                                                        {blogs && blogs.length > 0 &&
                                                            blogs.map((blog, index) => {
                                                                if (blogs.length === index + 1) {
                                                                    return (
                                                                        <li className="css-scope navInternalLink">
                                                                            <Link to={`/tutorials/html/${blog.slug}`} title={blog.title} className="css-scope waves-effect" >HTML - {blog.title}</Link>
                                                                        </li>);
                                                                } else {
                                                                    return (
                                                                        <li className="css-scope navInternalLink">
                                                                            <Link to={`/tutorials/html/${blog.slug}`} title={blog.title} className="css-scope waves-effect" >HTML - {blog.title}</Link>
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
                                                        {blogs && blogs.length > 0 &&
                                                            blogs.map((blog, index) => {
                                                                if (blogs.length === index + 1) {
                                                                    return (
                                                                        <li className="css-scope navInternalLink">
                                                                            <Link to={`/tutorials/html/${blog.slug}`} title={blog.title} className="css-scope waves-effect" >HTML - {blog.title}</Link>
                                                                        </li>);
                                                                } else {
                                                                    return (
                                                                        <li className="css-scope navInternalLink">
                                                                            <Link to={`/tutorials/html/${blog.slug}`} title={blog.title} className="css-scope waves-effect" >HTML - {blog.title}</Link>
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

                                        </ul>
                                        {/* <div class="sidenav-bg mask-strong" style="width: 240px;"></div> */}
                                        <div class="sidenav-bg mask-strong" ></div>
                                    </div>            </div>
                            }
                            <div id="" class={isLeftNavOpen ? `col-xs-12 col-sm-12 col-md-8 col-lg-8` : `col-xs-12 col-sm-12 col-md-8 col-lg-10` }>
                                <div class="post-heading text-center">
                                    {/* <h1 class="post-title" style="margin-top:3rem;">Introduction</h1> */}
                                    <h1 class="post-title" >Introduction</h1>
                                </div>
                                <div class="previous_next_container-top">
                                    <a class="btn btn-light" type="button" disabled="">&lt;&lt; Previous</a>
                                    <div id="toggle_codeFullScreen" class="css-scope">
                                        <div class="css-scope header_icon waves-effect">
                                            <div class="css-scope header_btn">
                                                <div class="css-scope icon">
                                                    {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon_svg" style="pointer-events:none;display:block;width:100%;height:100%;" viewBox="0 0 24 24"><title>apps</title><path d="M15.984 20.016v-4.031h4.031v4.031h-4.031zM15.984 14.016v-4.031h4.031v4.031h-4.031zM9.984 8.016v-4.031h4.031v4.031h-4.031zM15.984 3.984h4.031v4.031h-4.031v-4.031zM9.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 20.016v-4.031h4.031v4.031h-4.031zM9.984 20.016v-4.031h4.031v4.031h-4.031zM3.984 8.016v-4.031h4.031v4.031h-4.031z"></path></svg> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a title="Simple Html Page" href="https://www.bestdivision.com/tutorial/html/how-to-backup-your-sql-database-automatically-using-cron-jobs" class="btn btn-danger float-right">Next &gt;&gt;</a>
                                </div>
                                <div id="single_blog_body" class="card">
                                    {!isLeftNavOpen &&
                                        <div class="css-scope header_item  header_itemStartTutorials">
                                            <i class='arrow right_arrow'></i>
                                            <div onClick={() => setIsLeftNavOpen(true)} id="menu" class="css-scope header_icon waves-effect">
                                                <div class="css-scope header_btn">
                                                    <div id="header_menuIcon" class="css-scope icon">
                                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon_svg" viewBox="0 0 24 24"><title>menu</title><path d="M3 6h18v2.016h-18v-2.016zM3 12.984v-1.969h18v1.969h-18zM3 18v-2.016h18v2.016h-18z"></path></svg></div></div></div><div class="css-scope header_logo">
                                            </div>
                                            <a href="#">HTML</a>
                                        </div>
                                    }
                                    <div class="body">
                                        <div class="panel panel-default panel-post">

                                            <div class="panel-body">
                                                <div class="post">
                                                    <div class="post-heading">
                                                        <p></p><p>
                                                        </p></div>
                                                    <div class="post-content">

                                                        <h1>HTML Introduction :-</h1><ol><li>HTML stands for <strong>H</strong>yper <strong>T</strong>ext <strong>M</strong>arkup <strong>L</strong>anguage.</li><li>HTML is a simple markup language used to create hypertext documents that are <strong>platform independent</strong>.</li><li>HTML is used to <strong>build Web Pages.</strong></li><li>HTML is the <strong>skeleton of any Web Page</strong>.</li></ol><h3>Simple HTML Page</h3><pre class="code-badge-pre"><div class="code-badge">
                                                            <div class="code-badge-language">html</div>
                                                            <div title="Copy to clipboard">
                                                                <i class="fa fa-copy code-badge-copy-icon" aria-hidden="true"></i>
                                                            </div>
                                                        </div><code class="language-html hljs xml"><span class="hljs-meta"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">head</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">title</span></span></span><span class="hljs-tag">&gt;</span></span>Page Title<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">title</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">head</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h1</span></span></span><span class="hljs-tag">&gt;</span></span>My First Heading<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h1</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag">&gt;</span></span>My first paragraph.<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span></code></pre><h3>Understanding the above points with example : -&nbsp;</h3><h4>Q1 : - &nbsp;Why does Hyper Text Markup Language Means ?</h4><ol><li><strong>Hyper Text :- &nbsp;</strong>Hyper Text means the text which links to another page.</li><li><strong>Markup Language :- &nbsp;</strong>Markup Language means the Language which is used to structure the content ( &nbsp;e.g. text, images, videos, etc. ) of any page.</li></ol><p>So, when we are actually writing the code as in the following example , we are doing Markup. Thus, its <strong>Markup Language.</strong></p><p>&nbsp;</p><p>Lets understand this with an example.&nbsp;</p><p>Create two files:- a) home.html and b) profile.html</p><p><strong>home.html</strong></p><pre class="code-badge-pre"><div class="code-badge">
                                                                    <div class="code-badge-language">html</div>
                                                                    <div title="Copy to clipboard">
                                                                        <i class="fa fa-copy code-badge-copy-icon" aria-hidden="true"></i>
                                                                    </div>
                                                                </div><code class="language-html hljs xml"><span class="hljs-meta"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">head</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">title</span></span></span><span class="hljs-tag">&gt;</span></span>I am Home Page<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">title</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">head</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h1</span></span></span><span class="hljs-tag">&gt;</span></span>I am home Page Heading<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h1</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag">&gt;</span></span>My first paragraph.<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span></code></pre><p>&nbsp;</p><p><strong>profile.html</strong></p><pre class="code-badge-pre"><div class="code-badge">
                                                                    <div class="code-badge-language">html</div>
                                                                    <div title="Copy to clipboard">
                                                                        <i class="fa fa-copy code-badge-copy-icon" aria-hidden="true"></i>
                                                                    </div>
                                                                </div><code class="language-html hljs xml"><span class="hljs-meta"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">head</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">title</span></span></span><span class="hljs-tag">&gt;</span></span>I am Profile Page<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">title</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">head</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h1</span></span></span><span class="hljs-tag">&gt;</span></span>I am Profile Page Heading<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h1</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag">&gt;</span></span>My first paragraph.<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span></code></pre><p>&nbsp;</p><p>So what we have done so far is made two page : - 1 ) home.html and 2) profile.html . So our marking up is done.</p><p>Now next part is understanding Hyper Text.</p><p>Now the text which allows us to connect say home.html to profile.html or vice-versa will be called hypertext. Lets understand with the same above example.</p><p>&nbsp;</p><p><strong>home.html</strong></p><pre class="code-badge-pre"><div class="code-badge">
                                                                    <div class="code-badge-language">html</div>
                                                                    <div title="Copy to clipboard">
                                                                        <i class="fa fa-copy code-badge-copy-icon" aria-hidden="true"></i>
                                                                    </div>
                                                                </div><code class="language-html hljs xml"><span class="hljs-meta"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">head</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">title</span></span></span><span class="hljs-tag">&gt;</span></span>I am Home Page<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">title</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">head</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h1</span></span></span><span class="hljs-tag">&gt;</span></span>I am home Page Heading<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h1</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag">&gt;</span></span>My first paragraph.<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag">&gt;</span></span>

                                                                <span class="hljs-comment"><span class="hljs-comment">&lt;!-- Hyper Text --&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">a</span></span></span><span class="hljs-tag"> </span><span class="hljs-attr"><span class="hljs-tag"><span class="hljs-attr">href</span></span></span><span class="hljs-tag">=</span><span class="hljs-string"><span class="hljs-tag"><span class="hljs-string">"profile.html"</span></span></span><span class="hljs-tag"> &gt;</span></span>I am Hyper Text. I will take you to profile.html page<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">a</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span></code></pre><p>&nbsp;</p><p><strong>profile.html</strong></p><pre class="code-badge-pre"><div class="code-badge">
                                                                    <div class="code-badge-language">html</div>
                                                                    <div title="Copy to clipboard">
                                                                        <i class="fa fa-copy code-badge-copy-icon" aria-hidden="true"></i>
                                                                    </div>
                                                                </div><code class="language-html hljs xml"><span class="hljs-meta"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">head</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">title</span></span></span><span class="hljs-tag">&gt;</span></span>I am Profile Page<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">title</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">head</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h1</span></span></span><span class="hljs-tag">&gt;</span></span>I am Profile Page Heading<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h1</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag">&gt;</span></span>My first paragraph.<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag">&gt;</span></span>

                                                                <span class="hljs-comment"><span class="hljs-comment">&lt;!-- Hyper Text --&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">a</span></span></span><span class="hljs-tag"> </span><span class="hljs-attr"><span class="hljs-tag"><span class="hljs-attr">href</span></span></span><span class="hljs-tag">=</span><span class="hljs-string"><span class="hljs-tag"><span class="hljs-string">"home.html"</span></span></span><span class="hljs-tag"> &gt;</span></span>I am also a Hyper Text. I will take you back to home.html page<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">a</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>
                                                                <span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span></code></pre><p>&nbsp;</p><h4>Q2) What does Platform Independent mean and How HTML is Platform Independent?</h4><p><strong>Ans: - Platform Independent :- &nbsp;</strong>When<strong> </strong>code written for one type of &nbsp;machine say &nbsp;<span >Microsoft Windows,</span> &nbsp;can also run &nbsp;on another types of machines, say&nbsp;<span > Apple macOS, Linux, Android and Apple's iOS, then we can say that the language is platform independent.&nbsp;</span></p><p><span>HTML is platform independent. That is why we are able to view all the web pages &nbsp;on internet on any type of device.</span></p><h2>Doe's:-</h2><ol><li>HTML has various version. We should always use latest version (current version is HTML5).</li><li>Any page created should follow the html structure properly. Though HTML doesn't complains about it by showing error, but we should always follow the structure. Know more…</li><li>Properly Start and Close the tags. (Though all element doesn't require closing tags…E.g:- <i>&lt;input&gt;, &lt;img&gt; , etc…).</i></li></ol>                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                </div>
                                <div class="previous_next_container-bottom">
                                    <a class="btn btn-light" type="button" disabled="">&lt;&lt; Previous</a>
                                    <a title="Simple Html Page" href="https://www.bestdivision.com/tutorial/html/how-to-backup-your-sql-database-automatically-using-cron-jobs" class="btn btn-danger float-right">Next &gt;&gt;</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>        </section>
        </>
    )
}

export default Tutorials
