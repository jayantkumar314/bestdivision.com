import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react'
// import './Templates.css'
import axios, { axiosAjax } from 'axios'


import Post from './Post'
import Svg from 'components/Svg'

import Loader from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Header from 'components/Header'
import LeftNav from 'components/LeftNav'
import Footer from 'components/Footer'
import Modal from 'components/Modal'

import useTemplateSearch from './useTemplateSearch'

function Templates() {
    const [mode, setMode] = useState('online')
    const [dropdown, setDropdown] = useState(false)
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const { loading, error, templates, hasMore } = useTemplateSearch(query, pageNumber)

    const observer = useRef()
    const lastTemplateElementRef = useCallback(node => {
        if (loading) {
            return
        }
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) {
            observer.current.observe(node)
        }
        console.log(node)
    }, [loading, hasMore])

    // const getTemplates = async (attributes) => {
    //     let response = await axios({
    //         method: 'get',
    //         url: `templates`,
    //         params: {
    //             // "limit": "2",
    //             // "offset": 1
    //         }
    //     }).then((response) => {
    //         updateTemplates(() => (response.data.data))
    //         localStorage.setItem("templates", JSON.stringify(response.data.data))
    //     })
    //         .catch((error) => {
    //             setMode('offline')
    //             let templates = localStorage.getItem("templates")
    //             updateTemplates(() => (JSON.parse(templates)))

    //         })
    //         .finally(() => {
    //         });
    // }
    // useEffect(() => {
    //     getTemplates();
    // }, [])
    function onClickdropdown() {
        setDropdown(!dropdown);
    }
    function onClickShare(e) {
        e.persist();
        setModalOpen(true)
    }
    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1);
    }
    // useEffect(() => {
    //     if (isBottom) {
    //         getComments();
    //     }
    // }, [isBottom]);
    return (
        <section id="section_content" className="css-scope section_content" >
            <div className="content">
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-3">
                            <div className="wrapper center-block">
                                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingOne">
                                            <h4 className="panel-title">
                                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse_ratings" aria-expanded="false" aria-controls="collapseOne" className="collapsed">
                                                    <i className="fa fa-angle-down rotate-icon" aria-hidden="true"></i>
                                                        Ratings
                                                    </a>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
                            
                        </div>
                        <div className="modal fade" id="sharepost" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Share on your favourite social media</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div id="button_share">
                                            <div className="share_buttons_wrap">
                                                <div className="socialShareButtonItem mobile_w">
                                                    <a id="whatsapp_mobile" data-action="share/whatsapp/share" target="_blank" title="whatsapp" rel="nofollow">
                                                        <div className="socialItem">
                                                            <div className="socialItem_icon">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 192 192" style=" fill:#000000;">
                                                                <g fill="none" fill-rule="none" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                                                    <path d="M0,192v-192h192v192z" fill="none" fill-rule="nonzero"></path>
                                                                    <g>
                                                                        <g id="surface1">
                                                                            <path d="M19.46875,173.21875l10.78125,-39.34375c-6.65625,-11.51562 -10.14062,-24.57812 -10.14062,-37.95312c0.01562,-41.85938 34.07812,-75.92188 75.95312,-75.92188c20.3125,0.01562 39.375,7.92188 53.71875,22.26562c14.32812,14.34375 22.23437,33.42188 22.21875,53.70313c-0.01562,41.875 -34.09375,75.92187 -75.9375,75.92187c-0.01562,0 0,0 0,0h-0.03125c-12.71875,0 -25.20313,-3.1875 -36.29688,-9.23437z" fill="#ffffff" fill-rule="nonzero"></path>
                                                                            <path d="M19.46875,175.21875c-0.53125,0 -1.03125,-0.21875 -1.42188,-0.59375c-0.5,-0.51562 -0.6875,-1.25 -0.5,-1.9375l10.54688,-38.54688c-6.53125,-11.625 -9.98438,-24.82812 -9.98438,-38.21875c0.01562,-42.96875 34.98438,-77.92188 77.95312,-77.92188c20.82812,0.01562 40.40625,8.125 55.125,22.85938c14.71875,14.71875 22.82812,34.29688 22.8125,55.10938c-0.01562,42.96875 -34.98438,77.92187 -77.9375,77.92187c-12.76562,0 -25.375,-3.14062 -36.57812,-9.10937l-39.5,10.35937c-0.17188,0.04688 -0.34375,0.07813 -0.51562,0.07813z" fill="#ffffff" fill-rule="nonzero"></path>
                                                                            <path d="M96.0625,20c20.3125,0.01562 39.375,7.92188 53.71875,22.26562c14.32812,14.34375 22.23437,33.42188 22.21875,53.70313c-0.01562,41.875 -34.09375,75.92187 -75.9375,75.92187h-0.03125c-12.71875,0 -25.20313,-3.1875 -36.29688,-9.23437l-40.26562,10.5625l10.78125,-39.34375c-6.65625,-11.51562 -10.14062,-24.57812 -10.14062,-37.95312c0.01562,-41.85938 34.07812,-75.92188 75.95312,-75.92188M96.0625,171.89062v0M96.0625,171.89062v0M96.0625,16c-44.07812,0 -79.9375,35.84375 -79.95312,79.92188c0,13.46875 3.39062,26.73438 9.84375,38.48438l-10.34375,37.75c-0.375,1.39062 0.01562,2.85937 1.01562,3.875c0.76562,0.76562 1.79688,1.1875 2.84375,1.1875c0.34375,0 0.6875,-0.04688 1.01562,-0.14063l38.75,-10.15625c11.3125,5.875 24,8.96875 36.79688,8.98438c44.09375,0 79.95312,-35.85938 79.96875,-79.92188c0.01562,-21.35938 -8.29688,-41.4375 -23.39062,-56.54688c-15.09375,-15.10938 -35.1875,-23.42188 -56.54688,-23.4375z" fill="#cfd8dc" fill-rule="nonzero"></path>
                                                                            <path d="M140.70312,51.32812c-11.92187,-11.92187 -27.76562,-18.5 -44.625,-18.5c-34.8125,0 -63.14062,28.29688 -63.15625,63.09375c0,11.92188 3.34375,23.53125 9.65625,33.57812l1.5,2.39062l-6.375,23.28125l23.89063,-6.26562l2.3125,1.375c9.6875,5.75 20.79687,8.79687 32.125,8.79687h0.03125c34.78125,0 63.09375,-28.3125 63.10938,-63.10937c0.01562,-16.85938 -6.54688,-32.71875 -18.46875,-44.64063z" fill="#40c351" fill-rule="nonzero"></path>
                                                                            <path d="M77.07812,64.1875c-1.42187,-3.17188 -2.92187,-3.23438 -4.28125,-3.28125c-1.10938,-0.04688 -2.375,-0.04688 -3.64062,-0.04688c-1.25,0 -3.3125,0.46875 -5.04688,2.375c-1.75,1.89062 -6.65625,6.48438 -6.65625,15.82812c0,9.32812 6.8125,18.35938 7.75,19.625c0.95313,1.25 13.14063,21.03125 32.42188,28.64062c16.03125,6.3125 19.29688,5.0625 22.76562,4.75c3.48438,-0.32812 11.23438,-4.59375 12.8125,-9.03125c1.57813,-4.42188 1.57813,-8.21875 1.10938,-9.01562c-0.46875,-0.79688 -1.73438,-1.26563 -3.64062,-2.21875c-1.89062,-0.95312 -11.21875,-5.53125 -12.96875,-6.17188c-1.73437,-0.625 -3,-0.9375 -4.26562,0.95313c-1.26562,1.89062 -4.90625,6.17187 -6.01562,7.4375c-1.10938,1.26562 -2.20312,1.42187 -4.10938,0.48437c-1.89062,-0.95312 -8,-2.95312 -15.25,-9.42187c-5.64062,-5.03125 -9.45312,-11.23438 -10.5625,-13.14063c-1.10938,-1.89062 -0.125,-2.92187 0.82812,-3.875c0.85938,-0.84375 1.90625,-2.21875 2.85938,-3.32812c0.9375,-1.10938 1.25,-1.89062 1.89062,-3.15625c0.625,-1.26563 0.3125,-2.375 -0.15625,-3.32813c-0.46875,-0.95312 -4.15625,-10.32812 -5.84375,-14.07812z" fill="#ffffff" fill-rule="evenodd"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg> */}
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <div className="socialsharename">whatsapp</div>
                                                </div>
                                                <div className="socialShareButtonItem xl_w">
                                                    <a id="whatsapp_web" target="_blank" title="whatsapp" rel="nofollow">
                                                        <div className="socialItem">
                                                            <div className="socialItem_icon">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 192 192" style=" fill:#000000;">
                                                                <g fill="none" fill-rule="none" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                                                    <path d="M0,192v-192h192v192z" fill="none" fill-rule="nonzero"></path>
                                                                    <g>
                                                                        <g id="surface1">
                                                                            <path d="M19.46875,173.21875l10.78125,-39.34375c-6.65625,-11.51562 -10.14062,-24.57812 -10.14062,-37.95312c0.01562,-41.85938 34.07812,-75.92188 75.95312,-75.92188c20.3125,0.01562 39.375,7.92188 53.71875,22.26562c14.32812,14.34375 22.23437,33.42188 22.21875,53.70313c-0.01562,41.875 -34.09375,75.92187 -75.9375,75.92187c-0.01562,0 0,0 0,0h-0.03125c-12.71875,0 -25.20313,-3.1875 -36.29688,-9.23437z" fill="#ffffff" fill-rule="nonzero"></path>
                                                                            <path d="M19.46875,175.21875c-0.53125,0 -1.03125,-0.21875 -1.42188,-0.59375c-0.5,-0.51562 -0.6875,-1.25 -0.5,-1.9375l10.54688,-38.54688c-6.53125,-11.625 -9.98438,-24.82812 -9.98438,-38.21875c0.01562,-42.96875 34.98438,-77.92188 77.95312,-77.92188c20.82812,0.01562 40.40625,8.125 55.125,22.85938c14.71875,14.71875 22.82812,34.29688 22.8125,55.10938c-0.01562,42.96875 -34.98438,77.92187 -77.9375,77.92187c-12.76562,0 -25.375,-3.14062 -36.57812,-9.10937l-39.5,10.35937c-0.17188,0.04688 -0.34375,0.07813 -0.51562,0.07813z" fill="#ffffff" fill-rule="nonzero"></path>
                                                                            <path d="M96.0625,20c20.3125,0.01562 39.375,7.92188 53.71875,22.26562c14.32812,14.34375 22.23437,33.42188 22.21875,53.70313c-0.01562,41.875 -34.09375,75.92187 -75.9375,75.92187h-0.03125c-12.71875,0 -25.20313,-3.1875 -36.29688,-9.23437l-40.26562,10.5625l10.78125,-39.34375c-6.65625,-11.51562 -10.14062,-24.57812 -10.14062,-37.95312c0.01562,-41.85938 34.07812,-75.92188 75.95312,-75.92188M96.0625,171.89062v0M96.0625,171.89062v0M96.0625,16c-44.07812,0 -79.9375,35.84375 -79.95312,79.92188c0,13.46875 3.39062,26.73438 9.84375,38.48438l-10.34375,37.75c-0.375,1.39062 0.01562,2.85937 1.01562,3.875c0.76562,0.76562 1.79688,1.1875 2.84375,1.1875c0.34375,0 0.6875,-0.04688 1.01562,-0.14063l38.75,-10.15625c11.3125,5.875 24,8.96875 36.79688,8.98438c44.09375,0 79.95312,-35.85938 79.96875,-79.92188c0.01562,-21.35938 -8.29688,-41.4375 -23.39062,-56.54688c-15.09375,-15.10938 -35.1875,-23.42188 -56.54688,-23.4375z" fill="#cfd8dc" fill-rule="nonzero"></path>
                                                                            <path d="M140.70312,51.32812c-11.92187,-11.92187 -27.76562,-18.5 -44.625,-18.5c-34.8125,0 -63.14062,28.29688 -63.15625,63.09375c0,11.92188 3.34375,23.53125 9.65625,33.57812l1.5,2.39062l-6.375,23.28125l23.89063,-6.26562l2.3125,1.375c9.6875,5.75 20.79687,8.79687 32.125,8.79687h0.03125c34.78125,0 63.09375,-28.3125 63.10938,-63.10937c0.01562,-16.85938 -6.54688,-32.71875 -18.46875,-44.64063z" fill="#40c351" fill-rule="nonzero"></path>
                                                                            <path d="M77.07812,64.1875c-1.42187,-3.17188 -2.92187,-3.23438 -4.28125,-3.28125c-1.10938,-0.04688 -2.375,-0.04688 -3.64062,-0.04688c-1.25,0 -3.3125,0.46875 -5.04688,2.375c-1.75,1.89062 -6.65625,6.48438 -6.65625,15.82812c0,9.32812 6.8125,18.35938 7.75,19.625c0.95313,1.25 13.14063,21.03125 32.42188,28.64062c16.03125,6.3125 19.29688,5.0625 22.76562,4.75c3.48438,-0.32812 11.23438,-4.59375 12.8125,-9.03125c1.57813,-4.42188 1.57813,-8.21875 1.10938,-9.01562c-0.46875,-0.79688 -1.73438,-1.26563 -3.64062,-2.21875c-1.89062,-0.95312 -11.21875,-5.53125 -12.96875,-6.17188c-1.73437,-0.625 -3,-0.9375 -4.26562,0.95313c-1.26562,1.89062 -4.90625,6.17187 -6.01562,7.4375c-1.10938,1.26562 -2.20312,1.42187 -4.10938,0.48437c-1.89062,-0.95312 -8,-2.95312 -15.25,-9.42187c-5.64062,-5.03125 -9.45312,-11.23438 -10.5625,-13.14063c-1.10938,-1.89062 -0.125,-2.92187 0.82812,-3.875c0.85938,-0.84375 1.90625,-2.21875 2.85938,-3.32812c0.9375,-1.10938 1.25,-1.89062 1.89062,-3.15625c0.625,-1.26563 0.3125,-2.375 -0.15625,-3.32813c-0.46875,-0.95312 -4.15625,-10.32812 -5.84375,-14.07812z" fill="#ffffff" fill-rule="evenodd"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg> */}
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <div className="socialsharename">whatsapp</div>
                                                </div>
                                                <div className="socialShareButtonItem">
                                                    <a id="facebook" target="_blank" title="facebook" rel="nofollow">
                                                        <div className="socialItem">
                                                            <div className="socialItem_icon">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 192 192" style=" fill:#000000;">
                                                                <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                                                    <path d="M0,192v-192h192v192z" fill="none"></path>
                                                                    <g id="Layer_1">
                                                                        <circle cx="24" cy="24" transform="scale(4,4)" r="20" fill="#3f51b5"></circle>
                                                                        <path d="M117.472,96h-13.472v48h-20v-48h-12v-16h12v-9.64c0.008,-14.032 5.836,-22.36 22.368,-22.36h13.632v16h-9.148c-6.436,0 -6.852,2.4 -6.852,6.892v9.108h16z" fill="#ffffff"></path>
                                                                    </g>
                                                                </g>
                                                            </svg> */}
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <div className="socialsharename">facebook</div>
                                                </div>
                                                <div className="socialShareButtonItem">
                                                    <a id="twitter" target="_blank" title="twitter" rel="nofollow">
                                                        <div className="socialItem">
                                                            <div className="socialItem_icon">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 192 192" style=" fill:#000000;">
                                                                <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                                                    <path d="M0,192v-192h192v192z" fill="none"></path>
                                                                    <g id="Layer_1">
                                                                        <circle cx="24" cy="24" transform="scale(4,4)" r="20" fill="#03a9f4"></circle>
                                                                        <path d="M144,68.48c-3.528,1.564 -7.996,3.032 -12,3.52c4.072,-2.416 10.532,-7.448 12,-12c-3.804,2.236 -10.684,4.624 -15.172,5.488c-3.584,-3.8 -8.696,-5.488 -14.36,-5.488c-10.88,0 -18.468,9.22 -18.468,20v8c-16,0 -31.6,-12.188 -41.308,-24c-1.708,2.884 -2.668,6.26 -2.668,9.828c0,7.276 6.684,14.66 11.976,18.172c-3.228,-0.1 -9.34,-2.564 -12,-4c0,0.064 0,0.144 0,0.228c0,9.468 6.644,15.896 15.648,17.688c-1.644,0.452 -3.648,2.084 -11.36,2.084c2.504,7.74 15.092,11.832 23.712,12c-6.744,5.228 -18.768,8 -28,8c-1.596,0 -2.46,0.088 -4,-0.092c8.712,5.52 20.88,8.092 32,8.092c36.228,0 56,-27.672 56,-53.48c0,-0.848 -0.028,-3.688 -0.072,-4.52c3.872,-2.728 5.44,-5.584 8.072,-9.52" fill="#ffffff"></path>
                                                                    </g>
                                                                </g>
                                                            </svg> */}
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <div className="socialsharename">twitter</div>
                                                </div>
                                                <div className="socialShareButtonItem">
                                                    <a id="tumblr" target="_blank" rel="nofollow">
                                                        <div className="socialItem">
                                                            <div className="socialItem_icon">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 192 192" style=" fill:#000000;">
                                                                <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                                                    <path d="M0,192v-192h192v192z" fill="none"></path>
                                                                    <g>
                                                                        <g id="surface1">
                                                                            <path d="M168,148c0,11.04688 -8.95312,20 -20,20h-104c-11.04688,0 -20,-8.95312 -20,-20v-104c0,-11.04688 8.95312,-20 20,-20h104c11.04688,0 20,8.95312 20,20z" fill="#01579b"></path>
                                                                            <path d="M128,139.5625c0,0.375 -0.14062,0.73438 -0.4375,0.98438c-0.34375,0.3125 -8.67188,7.45312 -27.78125,7.45312c-22.89063,0 -23.5625,-25.64062 -23.5625,-28.5625l-0.21875,-31.4375h-10.6875c-0.73438,0 -1.3125,-0.59375 -1.3125,-1.3125v-12.40625c0,-0.54688 0.32812,-1.03125 0.82812,-1.23438c0.21875,-0.07812 20.6875,-8.32812 20.6875,-27.73438c0,-0.73438 0.57813,-1.3125 1.3125,-1.3125h11.85938c0.73438,0 1.3125,0.57812 1.3125,1.3125v26.6875h22.6875c0.71875,0 1.3125,0.57812 1.3125,1.3125v13.375c0,0.73438 -0.59375,1.3125 -1.3125,1.3125h-22.6875v30.84375c0,0.40625 1.26562,10.07812 11.04688,10.07812c8.07812,0 14.875,-4.17188 14.95312,-4.21875c0.40625,-0.26562 0.90625,-0.26562 1.32812,-0.04687c0.42188,0.23437 0.67188,0.6875 0.67188,1.15625z" fill="#ffffff"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg> */}
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <div className="socialsharename">tumblr</div>
                                                </div>
                                                <div className="socialShareButtonItem">
                                                    <a id="reddit" href="http://reddit.com/submit?url=https://www.bestdivision.com/template/kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk&amp;title=kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk" target="_blank" rel="nofollow">
                                                        <div className="socialItem">
                                                            <div className="socialItem_icon">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 192 192" style=" fill:#000000;">
                                                                <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                                                    <path d="M0,192v-192h192v192z" fill="none"></path>
                                                                    <g>
                                                                        <g id="surface1">
                                                                            <path d="M48.76562,78.21875c-7.75,-6.96875 -19.15625,-6.90625 -25.45312,0.125c-6.29688,7.01562 -5.20312,20.07812 3.70312,26.51562z" fill="#ffffff"></path>
                                                                            <path d="M143.23438,78.21875c7.75,-6.96875 19.15625,-6.90625 25.45312,0.125c6.29688,7.01562 5.20312,20.07812 -3.70312,26.51562z" fill="#ffffff"></path>
                                                                            <path d="M167.28125,41.90625c0,7.71875 -6.26563,14 -14,14c-7.73438,0 -14,-6.28125 -14,-14c0,-7.73438 6.26562,-14 14,-14c7.73437,0 14,6.26562 14,14z" fill="#ffffff"></path>
                                                                            <path d="M168.6875,114.4375c0,-28.59375 -32.39062,-51.78125 -72.34375,-51.78125c-39.95313,0 -72.34375,23.1875 -72.34375,51.78125c0,28.60938 32.39062,51.79688 72.34375,51.79688c39.95312,0 72.34375,-23.1875 72.34375,-51.79688z" fill="#ffffff"></path>
                                                                            <path d="M133,105.5625c0,6.375 -5.17188,11.53125 -11.54688,11.53125c-6.35937,0 -11.53125,-5.15625 -11.53125,-11.53125c0,-6.375 5.17188,-11.53125 11.53125,-11.53125c6.375,0 11.54688,5.15625 11.54688,11.53125z" fill="#d84315"></path>
                                                                            <path d="M82.07812,105.5625c0,6.375 -5.17187,11.53125 -11.53125,11.53125c-6.375,0 -11.54688,-5.15625 -11.54688,-11.53125c0,-6.375 5.17188,-11.53125 11.54688,-11.53125c6.35938,0 11.53125,5.15625 11.53125,11.53125z" fill="#d84315"></path>
                                                                            <path d="M96.01562,139.60938c-13.01562,0 -24.5625,-2.98438 -32.01562,-7.60938c4.09375,8.17188 16.78125,16 32.01562,16c15.20313,0 27.89063,-7.82812 31.98438,-16c-7.42188,4.625 -18.98438,7.60938 -31.98438,7.60938z" fill="#37474f"></path>
                                                                            <path d="M167.3125,108.10938l-4.67188,-6.48438c3.32813,-2.40625 5.48438,-6.23438 5.95313,-10.5c0.42187,-3.92188 -0.625,-7.60938 -2.89063,-10.125c-2.28125,-2.54688 -5.5625,-3.95312 -9.21875,-3.96875c-3.71875,0.04687 -7.57812,1.45312 -10.59375,4.15625l-5.34375,-5.95312c4.5,-4.03125 10.1875,-6.09375 15.96875,-6.20312c5.95313,0.03125 11.32813,2.375 15.14063,6.625c3.76562,4.20312 5.54687,10.15625 4.89062,16.32812c-0.70312,6.51562 -4.0625,12.40625 -9.23438,16.125z" fill="#37474f"></path>
                                                                            <path d="M24.67188,108.10938c-5.15625,-3.73438 -8.51562,-9.60938 -9.21875,-16.125c-0.67187,-6.17188 1.10938,-12.125 4.89063,-16.32812c3.79687,-4.23438 9.1875,-6.59375 15.125,-6.625c0.04687,0 0.07812,0 0.10937,0c5.76563,0 11.40625,2.20312 15.85938,6.21875l-5.34375,5.95312c-3,-2.71875 -6.75,-4.03125 -10.57813,-4.17187c-3.65625,0.01562 -6.9375,1.42187 -9.21875,3.98437c-2.25,2.5 -3.3125,6.1875 -2.89062,10.10938c0.46875,4.26562 2.625,8.09375 5.95312,10.5z" fill="#37474f"></path>
                                                                            <path d="M100,67.35938h-8c0,-11.54688 0,-42.1875 19.92188,-42.1875c8.60938,0 12.76562,4.84375 15.79688,8.375c2.51562,2.9375 3.84375,4.34375 6.46875,4.34375h5.48438v8h-5.48438c-6.42188,0 -9.8125,-3.95312 -12.54688,-7.14062c-2.67187,-3.125 -4.78125,-5.59375 -9.73437,-5.59375c-8,0.01562 -11.90625,11.20312 -11.90625,34.20312z" fill="#37474f"></path>
                                                                            <path d="M96.34375,67.79688c37.6875,0 68.34375,20.92188 68.34375,46.64062c0,25.73438 -30.65625,46.65625 -68.34375,46.65625c-37.6875,0 -68.34375,-20.92188 -68.34375,-46.65625c0,-25.71875 30.65625,-46.64062 68.34375,-46.64062M96.34375,59.79688c-42.17188,0 -76.34375,24.46875 -76.34375,54.64062c0,30.1875 34.1875,54.65625 76.34375,54.65625c42.15625,0 76.34375,-24.46875 76.34375,-54.65625c0,-30.17188 -34.1875,-54.64062 -76.34375,-54.64062z" fill="#37474f"></path>
                                                                            <path d="M153.28125,31.90625c5.51562,0 10,4.48437 10,10c0,5.5 -4.48438,10 -10,10c-5.51563,0 -10,-4.5 -10,-10c0,-5.51563 4.48437,-10 10,-10M153.28125,23.90625c-9.9375,0 -18,8.04687 -18,18c0,9.9375 8.0625,18 18,18c9.9375,0 18,-8.0625 18,-18c0,-9.95313 -8.04688,-18 -18,-18z" fill="#37474f"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg> */}
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <div className="socialsharename">reddit</div>
                                                </div>
                                                <div className="socialShareButtonItem">
                                                    <a id="linkedin" title="linkedin" target="_blank" rel="nofollow">
                                                        <div className="socialItem">
                                                            <div className="socialItem_icon">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 192 192" style=" fill:#000000;">
                                                                <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                                                    <path d="M0,192v-192h192v192z" fill="none"></path>
                                                                    <g id="Layer_1">
                                                                        <circle cx="24" cy="24" transform="scale(4,4)" r="20" fill="#0288d1"></circle>
                                                                        <rect x="14" y="19" transform="scale(4,4)" width="4" height="15" fill="#ffffff"></rect>
                                                                        <path d="M63.952,68h-0.088c-4.776,0 -7.864,-3.56 -7.864,-8.004c0,-4.54 3.184,-7.996 8.044,-7.996c4.868,0 7.864,3.456 7.956,7.996c0,4.444 -3.088,8.004 -8.048,8.004z" fill="#ffffff"></path>
                                                                        <path d="M140,98c0,-12.152 -9.848,-22 -22,-22c-7.448,0 -14.02,3.712 -18,9.376v-9.376h-16v60h16v-32c0,-6.628 5.372,-12 12,-12c6.628,0 12,5.372 12,12v32h16c0,0 0,-36.316 0,-38z" fill="#ffffff"></path>
                                                                    </g>
                                                                </g>
                                                            </svg> */}
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <div className="socialsharename">linkedin</div>
                                                </div>
                                                <div className="socialShareButtonItem">
                                                    <a id="yahoo" title="yahoo" rel="nofollow">
                                                        <div className="socialItem">
                                                            <div className="socialItem_icon">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 192 192" style=" fill:#000000;">
                                                                <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                                                    <path d="M0,192v-192h192v192z" fill="none"></path>
                                                                    <g fill="#673ab7">
                                                                        <g id="surface1">
                                                                            <path d="M36,20c0,0 5.59375,1.20312 10,1.20312c4.40625,0 10,-1.20312 10,-1.20312l40,68l40.40625,-68c0,0 4.39062,1.59375 9.59375,1.59375c5.59375,0 10,-1.59375 10,-1.59375l-52,88l1.59375,64c0,0 -5.59375,-1.59375 -9.59375,-1.59375c-4,0 -10,1.59375 -10,1.59375l2,-64z"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg> */}
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <div className="socialsharename">yahoo</div>
                                                </div>
                                                <div className="socialShareButtonItem">
                                                    <a id="gmail" title="gmail" rel="nofollow">
                                                        <div className="socialItem">
                                                            <div className="socialItem_icon">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 192 192" style=" fill:#000000;">
                                                                <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                                                    <path d="M0,192v-192h192v192z" fill="none"></path>
                                                                    <g>
                                                                        <g id="surface1">
                                                                            <path d="M22,162h148c7.73438,0 14,-6.26562 14,-14v-104c0,-7.73438 -6.26562,-14 -14,-14h-148c-7.73438,0 -14,6.26562 -14,14v104c0,7.73438 6.26562,14 14,14z" fill="#e0e0e0"></path>
                                                                            <path d="M104,162h66c7.73438,0 14,-6.26562 14,-14v-104c0,-7.73438 -6.26562,-14 -14,-14h-148c-7.73438,0 -14,6.26562 -14,14z" fill="#d9d9d9"></path>
                                                                            <path d="M26.98438,162h143.01562c7.73438,0 14,-6.26562 14,-14v-102z" fill="#eeeeee"></path>
                                                                            <path d="M102.98438,162h67.01562c7.73438,0 14,-6.26562 14,-14v-102l-108.92188,80.46875z" fill="#e0e0e0"></path>
                                                                            <path d="M170,38h-148c-7.73438,0 -14,-1.73438 -14,6v104c0,7.73438 6.26562,14 14,14h6v-114h136v114h6c7.73438,0 14,-6.26562 14,-14v-104c0,-7.73438 -6.26562,-6 -14,-6z" fill="#ca3737"></path>
                                                                            <path d="M170,30h-148c-7.73438,0 -14,6.14062 -14,14c0,4.82812 6.07812,9.03125 6.07812,9.03125l81.92188,58l81.92188,-58c0,0 6.07812,-4.20313 6.07812,-9.03125c0,-7.85938 -6.26562,-14 -14,-14z" fill="#f5f5f5"></path>
                                                                            <path d="M172.98438,30.32812l-76.98438,53.67188l-76.98438,-53.67188c-6.29687,1.34375 -11.01562,6.85938 -11.01562,13.67188c0,4.82812 6.07812,9.03125 6.07812,9.03125l81.92188,58l81.92188,-58c0,0 6.07812,-4.20313 6.07812,-9.03125c0,-6.8125 -4.71875,-12.32812 -11.01562,-13.67188z" fill="#e84f4b"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg> */}
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <div className="socialsharename">gmail</div>
                                                </div>
                                                <div className="socialShareButtonItem">
                                                    <div className="socialItem">
                                                        {/* <input id="copy_url" type="text" style="display: none;" /> */}
                                                        <div id="Copy" onClick="copy_u()" className="socialItem_icon copyUrl" data-clipboard-text="xfgmfgjdgjcghm">
                                                            {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 192 192" style=" fill:#000000;">
                                                            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                                                <path d="M0,192v-192h192v192z" fill="none"></path>
                                                                <g fill="#34495e">
                                                                    <path d="M32,16c-8.84,0 -16,7.16 -16,16v112h16v-112h112v-16zM64,48c-8.84,0 -16,7.16 -16,16v96c0,8.84 7.16,16 16,16h96c8.84,0 16,-7.16 16,-16v-96c0,-8.84 -7.16,-16 -16,-16zM64,64h96v96h-96z"></path>
                                                                </g>
                                                            </g>
                                                        </svg> */}
                                                        </div>
                                                    </div>
                                                    <div className="socialsharename">Copy</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="pagination_container" style="display:flex; justify-content:center; font-size:16px;">
                    <div className="pagination">
                        <ul className="pagination">&nbsp;
                                        <li className="page-item"><a className="current page-link">1</a>
                            </li>
                            <a href="https://www.bestdivision.com/templates?q=&amp;start=5" className="page-link" data-ci-pagination-page="2">2</a><a href="https://www.bestdivision.com/templates?q=&amp;start=10" className="page-link" data-ci-pagination-page="3">3</a><a href="https://www.bestdivision.com/templates?q=&amp;start=5" className="page-link" data-ci-pagination-page="2" rel="next">Next</a>
                            <a href="https://www.bestdivision.com/templates?q=&amp;start=45" className="page-link" data-ci-pagination-page="10">Last ›</a>
                        </ul>
                    </div>
                </div> */}
                </div>
                <div class="container" id="jk_after_overlay_container">
                    <div class="container-fluid">
                        <div class="row clearfix">
                            <main class="">
                            {/* <main class="" style="min-width:100%;"> */}
                                <div class="box shadow-sm border rounded bg-white mb-3 jk-share-post">
                                    <ul class="nav border-bottom jk-line-tab" id="myTab" role="tablist">
                                        <li class="nav-item"> <a class="nav-link active" id="preview-tab" data-toggle="tab" href="#preview" role="tab" aria-controls="preview" aria-selected="true">Preview</a>
                                        </li>
                                        <li class="nav-item"> <a class="nav-link" id="html-tab" data-toggle="tab" href="#html" role="tab" aria-controls="html" aria-selected="true">HTML</a>
                                        </li>
                                        <li class="nav-item"> <a class="nav-link" id="css-tab" data-toggle="tab" href="#css" role="tab" aria-controls="css" aria-selected="true">CSS</a>
                                        </li>
                                        <li class="nav-item"> <a class="nav-link" id="javascript-tab" data-toggle="tab" href="#javascript" role="tab" aria-controls="javascript" aria-selected="true">Javascript</a>
                                        </li>
                                        <li class="nav-item"> <a class="nav-link" id="resources-tab" data-toggle="tab" href="#resources" role="tab" aria-controls="resources" aria-selected="true">Resources</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="preview" role="tabpanel" aria-labelledby="preview-tab">
                                            {/* <link href="https://www.bestdivision.com/assets/plugins/lightGallery-master/dist/css/lightgallery.css" rel="stylesheet"> */}
                                            {/* <script src="https://www.bestdivision.com/assets/plugins/lightGallery-master/dist/js/lightgallery.min.js"></script> */}
                                            <div class="container jk-main-content">
                                                <h2 class="">Preview Thumbnails</h2>
                                                {/* <h2 class="" style="margin-bottom:0">Preview Thumbnails</h2> */}
                                                <div class="text-center"> <small>Please click on the below thumbnail to view in full screen</small>
                                                {/* <div class="text-center" style="margin-bottom:30px"> <small>Please click on the below thumbnail to view in full screen</small> */}
                                                </div>
                                                {/* <ul id="lightgallery" class="list-unstyled row" style="margin-bottom:30px">
                                                        <div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">
                                                            
                                                </div>
                                            </ul> */}
                                            </div>

                                        </div>
                                        <div class="tab-pane fade" id="html" role="tabpanel" aria-labelledby="html-tab">
                                            <div class="container jk-main-content">
                                                <h2 class="">HTML</h2>
                                                <div class="row clearfix">
                                                    <div class="col-12">
                                                        hello
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="css" role="tabpanel" aria-labelledby="css-tab">
                                            <div class="container jk-main-content">
                                                <h2 class="">CSS</h2>
                                                <div class="row clearfix">
                                                    {/* <div class="col-12" style="padding:0"> */}
                                                    <div class="col-12">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="javascript" role="tabpanel" aria-labelledby="javascript-tab">
                                            <div class="container jk-main-content">
                                                <h2 class="">Javascript</h2>
                                                <div class="row clearfix">
                                                    <div class="col-12" >
                                                    {/* <div class="col-12" style="padding:0"> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="resources" role="tabpanel" aria-labelledby="resources-tab">
                                            <div class="container jk-main-content">
                                                <h2 class="">Top Blogs</h2>
                                                <div class="row clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Templates
