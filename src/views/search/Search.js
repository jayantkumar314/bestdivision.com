import React, { useEffect, useState } from 'react'
// import './Search.css'
import axios, { axiosAjax } from 'axios'

import styled from 'styled-components'

import Header from 'components/Header'
// import  Asidfrom 'components/'
// import  from 'components/'
// import  from 'components/'
// import AsideSection from './sections/AsideSection'
// import FooterSection from './sections/FooterSection'
// import HeaderSection from './sections/HeaderSection'
import LeftNav from 'components/LeftNav/LeftNav.js'
import Footer from 'components/Footer'
import Pagination from 'components/Pagination'
//import useBlogSearch from './useBlogSearch'

import Loader from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import SearchSkeleton from './SearchSkeleton'
import SearchSkeletonJk from './SearchSkeletonJk'
import Skeleton from 'components/Skeleton'

const initialParams = {
    q: '',
    start: 0
}

const Search = () => {
    const urlParams = new URLSearchParams(typeof window !== 'undefined' && window.location.search)
    const [blogs, setBlogs] = useState([])
    const [totalBlogs, setTotalBlogs] = useState(0)
    const [q, setQ] = useState(urlParams.get('q'))
    const [params, setParams] = useState(initialParams)
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(10)

    //const { loading, error, blogs, hasMore } = useBlogSearch(query, pageNumber)

    async function getBlogs(attributes){
        setLoading(true)
        let response = await axios({
            method: 'get',
            // url: `blogs?search=${encodeURIComponent(q).replace(/%20/g, "+")}`,
            url: `blogs?search=${q}`,
            params: params
            // data: {
            // 	"user": {
            // 		"cognitoId": attributes.sub,
            // 		"firstName": attributes.name,
            // 		"lastName": "lastName9",
            // 		"email": attributes.email,
            // 		"phone": attributes.phone_number
            // 	}
            // }
        }).then((response) => {
            setBlogs(prevBlogs => {
                return [...new Set([...prevBlogs, ...response.data.data])]
            })

            setTotalBlogs(response.data.total_blogs)
            // useEffect(() => {
            //     setBlogs([])
            // }, [query])
        }).catch((error) => {
            debugger;
        }).finally(() => {
            setLoading(false)
        });
    }
    useEffect(() => {
        let text = urlParams.get('q')
        setQ(text);
    }, [urlParams.get('q')])

    useEffect(() => {
        //window.scrollTo(0, 0)
        setBlogs([])
        getBlogs();
    }, [q, params])
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        setParams(() => ({
            ...params,
            start: parseInt(pageNumber) * 10
        }));
    }

    const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 40px 0px;
    
`

    const TextWrapper = styled.div`
    
`

    const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

    const Name = styled.div`
  width: 300px;
  height: 20px;
  color: #8A99C0;
`;

    const Username = styled.div`
  width: 300px;
  height: 20px;
  margin-top: 5px;
  color: #a5a5a5;
`;

    const Email = styled.div`
  width: 300px;
  height: 20px;
  margin-top: 5px;
  color: #a5a5a5;
`;

    const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.31);
`

    return (
        <section id="section_content" className="css-scope section_content">
            <div className="row search_borderBottom">
                <div className="col-12">
                    <ul className="nav jk-line-tab" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="tutorials-tab" data-toggle="tab" href="#tutorials" role="tab" aria-controls="tutorials" aria-selected="true">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <title>search</title>
                                    <path d="M9.516 14.016q1.875 0 3.188-1.313t1.313-3.188-1.313-3.188-3.188-1.313-3.188 1.313-1.313 3.188 1.313 3.188 3.188 1.313zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281q-1.781 1.547-4.219 1.547-2.719 0-4.617-1.875t-1.898-4.594 1.898-4.617 4.617-1.898 4.594 1.898 1.875 4.617q0 0.984-0.469 2.227t-1.078 1.992l0.281 0.281h0.797z"></path>
                                </svg>All</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="tutorials-tab" data-toggle="tab" href="#tutorials" role="tab" aria-controls="tutorials" aria-selected="false">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 28">
                                    <title>newspaper-o</title>
                                    <path d="M16 8h-6v6h6v-6zM18 18v2h-10v-2h10zM18 6v10h-10v-10h10zM28 18v2h-8v-2h8zM28 14v2h-8v-2h8zM28 10v2h-8v-2h8zM28 6v2h-8v-2h8zM4 21v-15h-2v15c0 0.547 0.453 1 1 1s1-0.453 1-1zM30 21v-17h-24v17c0 0.344-0.063 0.688-0.172 1h23.172c0.547 0 1-0.453 1-1zM32 2v19c0 1.656-1.344 3-3 3h-26c-1.656 0-3-1.344-3-3v-17h4v-2h28z"></path>
                                </svg>News</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="blogs-tab" data-toggle="tab" href="#blogs" role="tab" aria-controls="blogs" aria-selected="false">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                    <title>pen</title>
                                    <path d="M31.818 9.122l-8.939-8.939c-0.292-0.292-0.676-0.226-0.855 0.146l-1.199 2.497 8.35 8.35 2.497-1.199c0.372-0.178 0.438-0.563 0.146-0.855z"></path>
                                    <path d="M19.231 4.231l-8.231 0.686c-0.547 0.068-1.002 0.184-1.159 0.899-0 0.001-0 0.001-0.001 0.002-2.232 10.721-9.84 21.183-9.84 21.183l1.793 1.793 8.5-8.5c-0.187-0.392-0.293-0.83-0.293-1.293 0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3c-0.463 0-0.902-0.105-1.293-0.293l-8.5 8.5 1.793 1.793c0 0 10.462-7.608 21.183-9.84 0.001-0 0.001-0 0.002-0.001 0.714-0.157 0.831-0.612 0.898-1.159l0.686-8.231-8.538-8.539z"></path>
                                </svg>Blogs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="tutorials-tab" data-toggle="tab" href="#tutorials" role="tab" aria-controls="tutorials" aria-selected="false">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                    <title>insert-template</title>
                                    <path d="M12 6h4v2h-4zM18 6h4v2h-4zM28 6v8h-6v-2h4v-4h-2v-2zM10 12h4v2h-4zM16 12h4v2h-4zM6 8v4h2v2h-4v-8h6v2zM12 18h4v2h-4zM18 18h4v2h-4zM28 18v8h-6v-2h4v-4h-2v-2zM10 24h4v2h-4zM16 24h4v2h-4zM6 20v4h2v2h-4v-8h6v2zM30 2h-28v28h28v-28zM32 0v0 32h-32v-32h32z"></path>
                                </svg>Tutorials</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row clearfix">
                    <main className="search_main">
                        <div className="box shadow-sm rounded mb-3 jk-share-post">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade active show" id="tutorials" role="tabpanel" aria-labelledby="tutorials-tab">
                                    <div className="container-fluid jk-main-content">
                                        <div className="row clearfix">
                                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                                <div className="wrapper center-block">
                                                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                                        <div className="panel panel-default">
                                                            <div className="panel-heading active" role="tab" id="headingOne">
                                                                <h4 className="panel-title"> <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse_ratings" aria-expanded="true" aria-controls="collapseOne" className=""> <i className="fa fa-angle-down rotate-icon" aria-hidden="true"></i> Ratings </a></h4>
                                                            </div>

                                                            <div id="collapse_ratings" className="panel-collapse in collapse show" role="tabpanel" aria-labelledby="headingOne" >
                                                                <div className="panel-body">
                                                                    <div className="row lead">
                                                                        <div id="hearts" className="starrr"><span className="glyphicon .glyphicon-star-empty glyphicon-star-empty"></span><span className="glyphicon .glyphicon-star-empty glyphicon-star-empty"></span><span className="glyphicon .glyphicon-star-empty glyphicon-star-empty"></span><span className="glyphicon .glyphicon-star-empty glyphicon-star-empty"></span><span className="glyphicon .glyphicon-star-empty glyphicon-star-empty"></span>
                                                                        </div>You gave a rating of <span id="count">0</span> star(s)</div>
                                                                    <div className="row lead">
                                                                        <div id="hearts-existing" className="starrr" data-rating="4"><span className="glyphicon .glyphicon-star-empty glyphicon-star"></span><span className="glyphicon .glyphicon-star-empty glyphicon-star"></span><span className="glyphicon .glyphicon-star-empty glyphicon-star"></span><span className="glyphicon .glyphicon-star-empty glyphicon-star"></span><span className="glyphicon .glyphicon-star-empty glyphicon-star-empty"></span>
                                                                        </div>You gave a rating of <span id="count-existing">4</span> star(s)</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="panel panel-default">
                                                            <div className="panel-heading" role="tab" id="collapse_listing">
                                                                <h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> <i className="fa fa-angle-down rotate-icon" aria-hidden="true"></i> Listing Types </a></h4>
                                                            </div>
                                                            <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="collapse_listing" >
                                                                <div className="panel-body">
                                                                    <form action="" id="listing_type">
                                                                        <input type="checkbox" id="blogs" name="blogs" value="blogs" className="active" />
                                                                        <label htmlFor="blogs">Blogs</label>
                                                                        <br />
                                                                        <input type="checkbox" id="tutorials" name="tutorials" value="tutorials" />
                                                                        <label htmlFor="tutorials">Tutorials</label>
                                                                        <br />
                                                                        <input type="checkbox" id="templates" name="templates" value="templates" />
                                                                        <label htmlFor="templates">Templates</label>
                                                                        <br />
                                                                        <input type="checkbox" id="snippets" name="snippets" value="snippets" />
                                                                        <label htmlFor="snippets">Snippets</label>
                                                                        <br />
                                                                        <input type="checkbox" id="courses" name="courses" value="courses" />
                                                                        <label htmlFor="courses">Courses</label>
                                                                        <br />
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <div className="card jk-card card-img-top">
                                                    <div className="card-body">
                                                        <div id="search_result" className="search_result">
                                                            {blogs && blogs.length > 0 &&
                                                                blogs.map((blog, index) => {
                                                                    if (blogs.length === index + 1) {
                                                                        return (
                                                                            // <Post props={blog} onClickShare={onClickShare} setModalOpen={setModalOpen} lastBlogElementRef={lastBlogElementRef} />
                                                                            <div className="search_container">
                                                                                <h3 className="search_title"> <a href={`blog/${blog.slug}`}>{`${blog.title}`}</a></h3>
                                                                                <div className="search_url"> <a href={`blog/${blog.slug}`}>{`${process.env.REACT_APP_BASE_URL}/blog/${blog.slug}`}</a>
                                                                                </div>
                                                                                <div className="search_description">{`${blog.short_description}`}</div>
                                                                            </div>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <div className="search_container">
                                                                                <h3 className="search_title"> <a href={`blog/${blog.slug}`}>{`${blog.title}`}</a></h3>
                                                                                <div className="search_url"> <a href={`blog/${blog.slug}`}>{`${process.env.REACT_APP_BASE_URL}/blog/${blog.slug}`}</a>
                                                                                </div>
                                                                                <div className="search_description">{`${blog.short_description}`}</div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                })
                                                            }
                                                            {loading &&
                                                                // <div className="loader_container" >
                                                                //     <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000} />
                                                                // </div>
                                                                // <SearchSkeleton/>
                                                                <>
                                                                    <Container>
                                                                        <ImageContainer>
                                                                            <Skeleton borderRadius={25} />
                                                                        </ImageContainer>
                                                                        <TextWrapper>
                                                                            <Name><Skeleton borderRadius={20} /></Name>
                                                                            <Username><Skeleton borderRadius={20} /></Username>
                                                                            <Email><Skeleton borderRadius={20} /></Email>
                                                                        </TextWrapper>
                                                                    </Container>
                                                                    <SearchSkeletonJk />
                                                                </>
                                                                // <Skeleton />
                                                            }

                                                            <div className="search_container">
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <div id="main_content" className="jk-main-content container mt-5 mb-5"></div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="search_container">
                                                                <div className="wrapper center-block">
                                                                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                                                        <div className="panel panel-default">
                                                                            <div className="panel-heading active" role="tab" id="headingOne">
                                                                                <h4 className="panel-title"> <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> <i className="fa fa-angle-down rotate-icon" aria-hidden="true"></i> Collapsible Group Item #1 </a></h4>
                                                                            </div>
                                                                            <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                                                                <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="panel panel-default">
                                                                            <div className="panel-heading" role="tab" id="headingTwo">
                                                                                <h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> <i className="fa fa-angle-down rotate-icon" aria-hidden="true"></i> Collapsible Group Item #2 </a></h4>
                                                                            </div>
                                                                            <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" >
                                                                                <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="panel panel-default">
                                                                            <div className="panel-heading" role="tab" id="headingThree">
                                                                                <h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> <i className="fa fa-angle-down rotate-icon" aria-hidden="true"></i> Collapsible Group Item #3 </a></h4>
                                                                            </div>
                                                                            <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                                                                <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="pagination_container" style="display:flex; justify-content:center; font-size:16px;"> */}
                                                            <div className="pagination_container" >
                                                                {totalBlogs &&
                                                                    <Pagination perPage={perPage} total={totalBlogs} paginate={paginate} />
                                                                }
                                                                {/* <div className="pagination">
                                                                    <ul className="pagination">&nbsp;
																	<li className="page-item"><a className="current page-link">1</a></li>
                                                                        <a onClick={() => firstPage} disabled={!canFirstPage} href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=5" className="page-link" data-ci-pagination-page="2">2</a>
                                                                        <a onClick={() => prevPage} disabled={!canPrevPage} href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=5" className="page-link" data-ci-pagination-page="2">2</a>
                                                                        <a href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=5" className="page-link" data-ci-pagination-page="2">2</a>
                                                                        <a href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=10" className="page-link" data-ci-pagination-page="3">3</a>
                                                                        <a onClick={() => nextPage} disabled={!canNextPage} href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=5" className="page-link" data-ci-pagination-page="2" rel="next">Next</a>
                                                                        <a onClick={() => lastPage} disabled={!canLastPage} href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=45" className="page-link" data-ci-pagination-page="10">Last ›</a>
                                                                    </ul>
                                                                </div>
                                                                <div>
                                                                    Showing Page {blogs.length / 10} of about {totalBlogs} Results
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </section>

    )
}

export default Search
