import React from 'react'
import img_10 from '../../assets/images/avatars/10.jpg';
import boomerang from '../../assets/images/avatars/10.jpg';

function Main() {
    return (
        <div className="main main-visible" data-mobile-height="">
            <div id="chat-2" className="chat dropzone-form-js" data-dz-url="some.html">
                <div className="chat-body">
                    <div className="chat-header border-bottom py-4 py-lg-6 px-lg-8">
                        <div className="container-xxl">
                            <div className="row align-items-center">
                                <div className="col-3 d-xl-none">
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item">
                                            <a className="text-muted px-0" href="#" data-chat="open"> <i className="icon-md fe-chevron-left"></i> </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-6 col-xl-6">
                                    <div className="media text-center text-xl-left">
                                        <div className="avatar avatar-sm avatar-online d-none d-lg-inline-block mr-5"><img src={img_10} className="avatar-img" alt="" /></div>
                                        <div className="media-body align-self-center text-truncate">
                                            <h6 className="text-truncate mb-n1">Anna Bridges</h6>
                                            <span className="badge badge-dot badge-success d-inline-block d-xl-none mr-1"></span> <small className="text-muted">Online</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3 col-xl-6 text-right">
                                    <ul className="nav justify-content-end">
                                        <li className="nav-item list-inline-item d-none d-xl-block mr-3">
                                            <a className="nav-link text-muted px-3" data-toggle="collapse" data-target="#chat-2-search" href="#" title="Search this chat"> <i className="icon-md fe-search"></i> </a>
                                        </li>
                                        <li className="nav-item list-inline-item d-none d-xl-block mr-0">
                                            <a className="nav-link text-muted px-3" href="#" data-chat-sidebar-toggle="#chat-2-info" title="Details"> <i className="icon-md fe-more-vertical"></i> </a>
                                        </li>
                                        <li className="nav-item list-inline-item d-block d-xl-none">
                                            <div className="messenger_dropdown">
                                                <a className="nav-link text-muted px-0" href="#" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="icon-md fe-more-vertical"></i> </a>
                                                <div className="messenger_dropdown-menu">
                                                    <a className="messenger_dropdown-item d-flex align-items-center" data-toggle="collapse" data-target="#chat-2-search" href="#"> Search <span className="ml-auto pl-5 fe-search"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#" data-chat-sidebar-toggle="#chat-2-info"> Chat Info <span className="ml-auto pl-5 fe-more-horizontal"></span> </a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="collapse border-bottom px-lg-8" id="chat-2-search">
                        <div className="container-xxl py-4 py-lg-6">
                            <div className="input-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Search this chat" aria-label="Search this chat" />
                                <div className="input-group-append">
                                    <button className="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit"><i className="fe-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-content px-lg-8">
                        <div className="container-xxl py-6 py-lg-10">
                            <div className="message">
                                <a className="avatar avatar-sm mr-4 mr-lg-5" href="#" data-chat-sidebar-toggle="#chat-2-info"> <img className="avatar-img" src={img_10} alt="" /> </a>
                                <div className="message-body">
                                    <div className="message-row">
                                        <div className="d-flex align-items-center">
                                            <div className="message-content bg-light">
                                                <h6 className="mb-2">Anna Bridges</h6>
                                                <div>Yeah, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents.</div>
                                                <div className="mt-1"><small className="opacity-65">8 mins ago</small></div>
                                            </div>
                                            <div className="messenger_dropdown">
                                                <a className="text-muted opacity-60 ml-3" href="#" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                <div className="messenger_dropdown-menu">
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Edit <span className="ml-auto fe-edit-3"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message message-right">
                                <div className="avatar avatar-sm ml-4 ml-lg-5 d-none d-lg-block"><img className="avatar-img" src={img_10} alt="" /></div>
                                <div className="message-body">
                                    <div className="message-row">
                                        <div className="d-flex align-items-center justify-content-end">
                                            <div className="messenger_dropdown">
                                                <a className="text-muted opacity-60 mr-3" href="#" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                <div className="messenger_dropdown-menu">
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Edit <span className="ml-auto fe-edit-3"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                </div>
                                            </div>
                                            <div className="message-content bg-primary text-white">
                                                <div>Yeah, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents.</div>
                                                <div className="mt-1"><small className="opacity-65">8 mins ago</small></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="message-row">
                                        <div className="d-flex align-items-center justify-content-end">
                                            <div className="messenger_dropdown">
                                                <a className="text-muted opacity-60 mr-3" href="#" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                <div className="messenger_dropdown-menu">
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Edit <span className="ml-auto fe-edit-3"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                </div>
                                            </div>
                                            <div className="message-content bg-primary text-white">
                                                <div className="media">
                                                    <a href="#" className="icon-shape mr-5"> <i className="fe-paperclip"></i> </a>
                                                    <div className="media-body overflow-hidden flex-fill">
                                                        <a href="#" className="d-block text-truncate font-medium text-reset">bootstrap.min.js</a>
                                                        <ul className="list-inline small mb-0">
                                                            <li className="list-inline-item"><span className="t">79.2 KB</span></li>
                                                            <li className="list-inline-item"><span className="text-uppercase">js</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-divider my-9 mx-lg-5">
                                <div className="row align-items-center">
                                    <div className="col"><hr /></div>
                                    <div className="col-auto"><small className="text-muted">Today</small></div>
                                    <div className="col"><hr /></div>
                                </div>
                            </div>
                            <div className="message">
                                <a className="avatar avatar-sm mr-4 mr-lg-5" href="#" data-chat-sidebar-toggle="#chat-2-info"> <img className="avatar-img" src={img_10} alt="" /> </a>
                                <div className="message-body">
                                    <div className="message-row">
                                        <div className="d-flex align-items-center">
                                            <div className="message-content bg-light w-100">
                                                <h6 className="mb-2">Anna Bridges shared 3 photos:</h6>
                                                <div className="form-row py-3">
                                                    <div className="col"><img className="img-fluid rounded" src={img_10} data-action="zoom" alt="" /></div>
                                                    <div className="col"><img className="img-fluid rounded" src={img_10} data-action="zoom" alt="" /></div>
                                                    <div className="col"><img className="img-fluid rounded" src={img_10} data-action="zoom" alt="" /></div>
                                                </div>
                                                <div className="mt-1"><small className="opacity-65">8 mins ago</small></div>
                                            </div>
                                            <div className="messenger_dropdown">
                                                <a className="text-muted opacity-60 ml-3" href="#" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                <div className="messenger_dropdown-menu">
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Edit <span className="ml-auto fe-edit-3"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="message-row">
                                        <div className="d-flex align-items-center">
                                            <div className="message-content bg-light">
                                                <div>Yeah, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents.</div>
                                                <div className="mt-1"><small className="opacity-65">8 mins ago</small></div>
                                            </div>
                                            <div className="messenger_dropdown">
                                                <a className="text-muted opacity-60 ml-3" href="#" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                <div className="messenger_dropdown-menu">
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Edit <span className="ml-auto fe-edit-3"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message message-right">
                                <div className="avatar avatar-sm ml-4 ml-lg-5 d-none d-lg-block"><img className="avatar-img" src={img_10} alt="" /></div>
                                <div className="message-body">
                                    <div className="message-row">
                                        <div className="d-flex align-items-center justify-content-end">
                                            <div className="messenger_dropdown">
                                                <a className="text-muted opacity-60 mr-3" href="#" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                <div className="messenger_dropdown-menu">
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Edit <span className="ml-auto fe-edit-3"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                </div>
                                            </div>
                                            <div className="message-content bg-primary text-white">
                                                <div>I'm going to meet a friend of mine at the department store. Yeah, I have to buy some presents for my parents.</div>
                                                <div className="mt-1"><small className="opacity-65">8 mins ago</small></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message">
                                <a className="avatar avatar-sm mr-4 mr-lg-5" href="#" data-chat-sidebar-toggle="#chat-2-info"> <img className="avatar-img" src={img_10} alt="" /> </a>
                                <div className="message-body">
                                    <div className="message-row">
                                        <div className="d-flex align-items-center">
                                            <div className="message-content bg-light">
                                                <h6 className="mb-2">Anna Bridges</h6>
                                                <div>I'm going to meet a friend of mine at the department store. Yeah, I have to buy some presents for my parents.</div>
                                                <div className="mt-1"><small className="opacity-65">8 mins ago</small></div>
                                            </div>
                                            <div className="messenger_dropdown">
                                                <a className="text-muted opacity-60 ml-3" href="#" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                <div className="messenger_dropdown-menu">
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Edit <span className="ml-auto fe-edit-3"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message message-right">
                                <div className="avatar avatar-sm ml-4 ml-lg-5 d-none d-lg-block"><img className="avatar-img" src={img_10} alt="" /></div>
                                <div className="message-body">
                                    <div className="message-row">
                                        <div className="d-flex align-items-center justify-content-end">
                                            <div className="messenger_dropdown">
                                                <a className="text-muted opacity-60 mr-3" href="#" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                <div className="messenger_dropdown-menu">
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Edit <span className="ml-auto fe-edit-3"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                    <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                </div>
                                            </div>
                                            <div className="message-content bg-primary text-white">
                                                <div>Yeah, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents.</div>
                                                <div className="mt-1"><small className="opacity-65">8 mins ago</small></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message">
                                <a className="avatar avatar-sm mr-4 mr-lg-5" href="#" data-chat-sidebar-toggle="#chat-2-info"> <img className="avatar-img" src={img_10} alt="" /> </a>
                                <div className="message-body">
                                    <div className="message-row">
                                        <div className="d-flex align-items-center">
                                            <div className="message-content bg-light">
                                                <div>
                                                    Anna is typing<span className="typing-dots"><span>.</span><span>.</span><span>.</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="end-of-chat"></div>
                    </div>
                    <div className="chat-files hide-scrollbar px-lg-8">
                        <div className="container-xxl"><div className="dropzone-previews-js form-row py-4"></div></div>
                    </div>
                    <div className="chat-footer border-top py-4 py-lg-6 px-lg-8">
                        <div className="container-xxl">
                            <form id="chat-id-2-form" action="https://themes.2the.me/Messenger-1.1/assets/php/upload.php" data-emoji-form="">
                                <div className="form-row align-items-center">
                                    <div className="col">
                                        <div className="input-group">
                                            <textarea
                                                id="chat-id-2-input"
                                                className="chat_mainTextArea form-control bg-transparent border-0"
                                                placeholder="Type your message..."
                                                rows="1"
                                                data-emoji-input=""
                                                data-autosize="true"
                                            ></textarea>
                                            <div className="input-group-append">
                                                <button className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0" type="button" data-emoji-btn=""><img src="" data-inject-svg="" alt="" /></button>
                                            </div>
                                            <div className="input-group-append">
                                                <button id="chat-upload-btn-2" className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0 dropzone-button-js dz-clickable" type="button"><img src="" data-inject-svg="" alt="" /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-ico btn-primary rounded-circle" type="submit"><span className="fe-send"></span></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div id="chat-2-info" className="chat-sidebar">
                    <div className="d-flex h-100 flex-column">
                        <div className="border-bottom py-4 py-lg-6">
                            <div className="container-fluid">
                                <ul className="nav justify-content-between align-items-center">
                                    <li className="nav-item list-inline-item">
                                        <a className="nav-link text-muted px-0" href="#" data-chat-sidebar-close=""> <i className="icon-md fe-chevron-left"></i> </a>
                                    </li>
                                    <li className="text-center d-block d-lg-none">
                                        <h6 className="mb-n2">Anna Bridges</h6>
                                        <small className="text-muted">Chat Details</small>
                                    </li>
                                    <li className="nav-item list-inline-item">
                                        <div className="messenger_dropdown">
                                            <a className="nav-link text-muted px-0" href="#" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="icon-md fe-sliders"></i> </a>
                                            <div className="messenger_dropdown-menu">
                                                <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Mute <span className="ml-auto fe-bell"></span> </a>
                                                <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="hide-scrollbar flex-fill">
                            <div className="border-bottom text-center py-9 px-10">
                                <div className="avatar avatar-xl mx-5 mb-5"><img className="avatar-img" src={img_10} alt="" /></div>
                                <h5>Anna Bridges</h5>
                                <p className="text-muted">Bootstrap is an open source toolkit for developing web with HTML, CSS, and JS.</p>
                            </div>
                            <div className="nav nav-tabs nav-justified bg-light rounded-0" role="tablist">
                                <a className="nav-item nav-link active" href="#chat-2-user-details" data-toggle="tab" aria-selected="true" role="tab">Details</a>
                                <a className="nav-item nav-link" href="#chat-2-user-files" data-toggle="tab" role="tab">Files</a>
                            </div>
                            <div className="tab-content" role="tablist">
                                <div id="chat-2-user-details" className="tab-pane fade show active" role="tabpanel">
                                    <ul className="list-group list-group-flush mb-8">
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <p className="small text-muted mb-0">Country</p>
                                                    <p>Warsaw, Poland</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-globe"></i>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <p className="small text-muted mb-0">Phone</p>
                                                    <p>+39 02 87 21 43 19</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-mic"></i>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <p className="small text-muted mb-0">Email</p>
                                                    <p>anna@gmail.com</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-mail"></i>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <p className="small text-muted mb-0">Time</p>
                                                    <p>10:03 am</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-clock"></i>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item py-6">
                                            <a href="#" className="media text-muted">
                                                <div className="media-body align-self-center">Twitter</div>
                                                <i className="icon-sm fe-twitter"></i>
                                            </a>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <a href="#" className="media text-muted">
                                                <div className="media-body align-self-center">Facebook</div>
                                                <i className="icon-sm fe-facebook"></i>
                                            </a>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <a href="#" className="media text-muted">
                                                <div className="media-body align-self-center">Github</div>
                                                <i className="icon-sm fe-github"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div id="chat-2-user-files" className="tab-pane fade" role="tabpanel">
                                    <ul className="list-group list-group-flush list-group-no-border-first">
                                        <li className="list-group-item py-6">
                                            <div className="media">
                                                <div className="icon-shape bg-primary text-white mr-5"><i className="fe-paperclip"></i></div>
                                                <div className="media-body align-self-center overflow-hidden">
                                                    <h6 className="text-truncate mb-0"><a href="#" className="text-reset" title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a></h6>
                                                    <ul className="list-inline small mb-0">
                                                        <li className="list-inline-item"><span className="text-muted">79.2 KB</span></li>
                                                        <li className="list-inline-item"><span className="text-muted text-uppercase">txt</span></li>
                                                    </ul>
                                                </div>
                                                <div className="align-self-center ml-5">
                                                    <div className="messenger_dropdown">
                                                        <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                        <div className="messenger_dropdown-menu">
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Download <span className="ml-auto fe-download"></span> </a>
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media">
                                                <div className="icon-shape bg-primary text-white mr-5"><i className="fe-paperclip"></i></div>
                                                <div className="media-body align-self-center overflow-hidden">
                                                    <h6 className="text-truncate mb-0"><a href="#" className="text-reset" title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a></h6>
                                                    <ul className="list-inline small mb-0">
                                                        <li className="list-inline-item"><span className="text-muted">79.2 KB</span></li>
                                                        <li className="list-inline-item"><span className="text-muted text-uppercase">psd</span></li>
                                                    </ul>
                                                </div>
                                                <div className="align-self-center ml-5">
                                                    <div className="messenger_dropdown">
                                                        <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                        <div className="messenger_dropdown-menu">
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Download <span className="ml-auto fe-download"></span> </a>
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media">
                                                <div className="icon-shape bg-primary text-white mr-5"><i className="fe-paperclip"></i></div>
                                                <div className="media-body align-self-center overflow-hidden">
                                                    <h6 className="text-truncate mb-0"><a href="#" className="text-reset" title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a></h6>
                                                    <ul className="list-inline small mb-0">
                                                        <li className="list-inline-item"><span className="text-muted">79.2 KB</span></li>
                                                        <li className="list-inline-item"><span className="text-muted text-uppercase">pdf</span></li>
                                                    </ul>
                                                </div>
                                                <div className="align-self-center ml-5">
                                                    <div className="messenger_dropdown">
                                                        <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                        <div className="messenger_dropdown-menu">
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Download <span className="ml-auto fe-download"></span> </a>
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media">
                                                <div className="icon-shape bg-primary text-white mr-5"><i className="fe-paperclip"></i></div>
                                                <div className="media-body align-self-center overflow-hidden">
                                                    <h6 className="text-truncate mb-0"><a href="#" className="text-reset" title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a></h6>
                                                    <ul className="list-inline small mb-0">
                                                        <li className="list-inline-item"><span className="text-muted">79.2 KB</span></li>
                                                        <li className="list-inline-item"><span className="text-muted text-uppercase">txt</span></li>
                                                    </ul>
                                                </div>
                                                <div className="align-self-center ml-5">
                                                    <div className="messenger_dropdown">
                                                        <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                        <div className="messenger_dropdown-menu">
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Download <span className="ml-auto fe-download"></span> </a>
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media">
                                                <div className="icon-shape bg-primary text-white mr-5"><i className="fe-paperclip"></i></div>
                                                <div className="media-body align-self-center overflow-hidden">
                                                    <h6 className="text-truncate mb-0"><a href="#" className="text-reset" title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a></h6>
                                                    <ul className="list-inline small mb-0">
                                                        <li className="list-inline-item"><span className="text-muted">79.2 KB</span></li>
                                                        <li className="list-inline-item"><span className="text-muted text-uppercase">pdf</span></li>
                                                    </ul>
                                                </div>
                                                <div className="align-self-center ml-5">
                                                    <div className="messenger_dropdown">
                                                        <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i> </a>
                                                        <div className="messenger_dropdown-menu">
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Download <span className="ml-auto fe-download"></span> </a>
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Share <span className="ml-auto fe-share-2"></span> </a>
                                                            <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
