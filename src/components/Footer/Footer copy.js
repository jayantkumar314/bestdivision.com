import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom'
// import './footer.css';
import bdDarkLogo from './bdDarkLogo.svg';
import referAndEarnLogo from './referAndEarnLogo.svg';
import settingsLogo from './settingsLogo.svg';
import Svg from 'components/Svg'

function Footer() {
	const history = useHistory();

	// const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
	const isMobile = window.innerWidth <= 500;
	return (
		<section id="section_footer" className="css-scope section_footer" >
			<footer className="page-footer font-small stylish-color-dark pt-4 clearfix">
				<div className="container text-center text-md-left">
					<div className="row">
						<div className="col-md-4 mx-auto">
							<div id="jk-logo-row">
								<div id="bd_logo_footer">
									<a href="" id="logo_img">
										<img src={bdDarkLogo} />
									</a>
									<p>Learn And Earn</p>
								</div>
							</div>
						</div>
						<hr className="clearfix w-100 d-md-none" />

						<div className="col-md-2 mx-auto">
							<h5 className="font-weight-bold text-uppercase mt-3 mb-4">Best Division</h5>

							<ul className="list-unstyled">
								<li>
									<a href="#!">Aim</a>
								</li>
								<li>
									<a href="#!"></a>
								</li>
								<li>
									<a href="#!">Link 3</a>
								</li>
								<li>
									<a href="#!">Link 4</a>
								</li>
							</ul>
						</div>
						<hr className="clearfix w-100 d-md-none" />
						<div className="col-md-2 mx-auto">
							<h5 className="font-weight-bold text-uppercase mt-3 mb-4">About</h5>

							<ul className="list-unstyled">
								<li>
									<a href="<?=base_url('about-us') ?>">About Us</a>
								</li>
								<li>
									<a href="<?=base_url('privacy-policy') ?>">Privacy & Policy</a>
								</li>
								<li>
									<a href="<?=base_url('how-it-works') ?>">How it works</a>
								</li>
								<li>
									<a href="<?=base_url('quotes') ?>">Quotes</a>
								</li>
								<li>
									<a href="<?=base_url('news') ?>">News</a>
								</li>
								<li>
									<a href="<?=base_url('sitemap') ?>">SiteMap</a>
								</li>
							</ul>
						</div>
						<hr className="clearfix w-100 d-md-none" />
						<div className="col-md-2 mx-auto">
							<h5 className="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

							<ul className="list-unstyled">
								<li>
									<a href="#!">Link 1</a>
								</li>
								<li>
									<a href="#!">Link 2</a>
								</li>
								<li>
									<a href="#!">Link 3</a>
								</li>
								<li>
									<a href="#!">Link 4</a>
								</li>
							</ul>
						</div>

						<div className="col-md-2 mx-auto">
							<h5 className="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

							<ul className="list-unstyled">
								<li>
									<a href="#!">Link 1</a>
								</li>
								<li>
									<a href="#!">Link 2</a>
								</li>
								<li>
									<a href="#!">Link 3</a>
								</li>
								<li>
									<a href="#!">Link 4</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<hr />

				<ul className="list-unstyled list-inline text-center py-2">
					<li className="list-inline-item">
						<h5 className="mb-1">Register for free</h5>
					</li>
					<li className="list-inline-item">
						<a href="<?=base_url('auth/register')?>" className="btn btn-danger btn-rounded">Sign up!</a>
					</li>
				</ul>

				<hr />

				<ul id="helllllo" className="list-unstyled list-inline text-center">
					<li className="list-inline-item">
						<a className="btn-floating btn-fb mx-1">
							<i className="fab fa-facebook-f"> </i>
						</a>
					</li>
					<li className="list-inline-item">
						<a className="btn-floating btn-tw mx-1">
							<i className="fab fa-twitter"> </i>
						</a>
					</li>
					<li className="list-inline-item">
						<a className="btn-floating btn-gplus mx-1">
							<i className="fab fa-google-plus-g"> </i>
						</a>
					</li>
					<li className="list-inline-item">
						<a className="btn-floating btn-li mx-1">
							<i className="fab fa-linkedin-in"> </i>
						</a>
					</li>
					<li className="list-inline-item">
						<a className="btn-floating btn-dribbble mx-1">
							<i className="fab fa-dribbble"> </i>
						</a>
					</li>
				</ul>

				<div className="text-center py-3">
					&copy;
				{/* <?php echo date("Y"); ?> */}
				Copyright:
			</div>

				<div className="footer-copyright text-center py-3">
					&copy;
				{/* <?php echo date("Y"); ?> */}
				Copyright:
				<a href="">www.bestdivision.com</a>
				</div>

				{/* <?php $this->load->view('common/components/chat/index'); ?> */}
			</footer>
			{isMobile &&
				<nav className="footer_nav show-on-small_tablet hide show">
					<div className="footer_container1">
						<div className="footer_container2">
							<div className="footer_container3">
								<div className="css-scope footer_item footer_item-center">
									<div onClick={() => history.push('/home')} className="css-scope footerIcon_container waves-effect">
										<div className="css-scope footer_icon">
											<div className="css-scope footer_btn">
												<div className="css-scope icon">
													<Svg className="search-svg-container" svg={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" style="pointer-events:none;display:block;width:100%;height:100%;" viewBox="0 0 24 24">
															<title>home</title>
															<path d="M9.984 20.016h-4.969v-8.016h-3l9.984-9 9.984 9h-3v8.016h-4.969v-6h-4.031v6z"></path>
														</svg>`} />
												</div>
											</div>
										</div>
										<div className="icon_name">Home</div>
									</div>
									<div className="css-scope footerIcon_container waves-effect">
										<div className="css-scope footer_icon">
											<div className="css-scope footer_btn">
												<div className="css-scope icon">
													<Svg className="search-svg-container" svg={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" style="pointer-events:none;display:block;width:100%;height:100%;" viewBox="0 0 24 24">
															<title>explore</title>
															<path d="M14.203 14.203l3.797-8.203-8.203 3.797-3.797 8.203zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93zM12 10.922q0.469 0 0.773 0.305t0.305 0.773-0.305 0.773-0.773 0.305-0.773-0.305-0.305-0.773 0.305-0.773 0.773-0.305z"></path>
														</svg>`} />
												</div>
											</div>
										</div>
										<div className="icon_name">Explorer</div>
									</div>
									{/* <div className="css-scope footerIcon_container waves-effect app dropdown footer_dropdown"> */}
									<div className="css-scope footerIcon_container waves-effect app">
										<div id="app" className="css-scope footer_icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
											<div className="css-scope footer_btn">
												<div className="css-scope icon">
													<Svg className="search-svg-container" svg={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" style="pointer-events:none;display:block;width:100%;height:100%;" viewBox="0 0 24 24">
															<title>apps</title>
															<path d="M15.984 20.016v-4.031h4.031v4.031h-4.031zM15.984 14.016v-4.031h4.031v4.031h-4.031zM9.984 8.016v-4.031h4.031v4.031h-4.031zM15.984 3.984h4.031v4.031h-4.031v-4.031zM9.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 20.016v-4.031h4.031v4.031h-4.031zM9.984 20.016v-4.031h4.031v4.031h-4.031zM3.984 8.016v-4.031h4.031v4.031h-4.031z"></path>
														</svg>`} />
												</div>
											</div>
										</div>
										<div className="icon_name">App</div>
										<div className="dropdown-menu app_content" area-labelledby="app">
											<div>
												<div className="container-fluid open">
													<div className="row clearfix">
														<main className="">
															<div className="box shadow-sm border rounded bg-white mb-3 jk-share-post">
																<ul className="nav border-bottom jk-line-tab" id="mega_menu-myTab" role="tablist">
																	<li className="nav-item"> <a className="nav-link active" id="mega_menu-templates-tab" data-toggle="tab" href="#mega_menu-templates" role="tab" aria-controls="mega_menu-templates" aria-selected="true">Templates</a>
																	</li>
																	<li className="nav-item"> <a className="nav-link" id="mega_menu-paid_courses-tab" data-toggle="tab" href="#mega_menu-paid_courses" role="tab" aria-controls="mega_menu-paid_courses" aria-selected="true">Paid Courses</a>
																	</li>
																</ul>
																<div className="tab-content" id="mega_menu-myTabContent" role="navigation" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
																	<div className="tab-pane fade show active" id="mega_menu-templates" role="tabpanel" aria-labelledby="mega_menu-templates-tab">
																		<div className="container jk-main-content">
																			<h2 className="">Paid Courses</h2>
																			<div className="row clearfix">
																				<div className="row">
																					<div className="column">
																						<h3>Category 1</h3>  <a href="#">Link 1</a>  <a href="#">Link 2</a>  <a href="#">Link 3</a>
																					</div>
																					<div className="column">
																						<h3>Category 2</h3>  <a href="#">Link 1</a>  <a href="#">Link 2</a>  <a href="#">Link 3</a>
																					</div>
																					<div className="column">
																						<h3>Category 3</h3>  <a href="#">Link 1</a>  <a href="#">Link 2</a>  <a href="#">Link 3</a>
																					</div>
																				</div>
																			</div>
																		</div>
																		<div ><a href="https://www.bestdivision.com/">Show More ...</a>
																		</div>
																		{/* <div style="text-align:center; padding-bottom: 1rem;"><a href="https://www.bestdivision.com/">Show More ...</a>
																			</div> */}
																	</div>
																	<div className="tab-pane fade" id="mega_menu-paid_courses" role="tabpanel" aria-labelledby="mega_menu-paid_courses-tab">
																		<div className="container jk-main-content">
																			<h2 className="">Tutorials</h2>
																			<div className="row clearfix"></div>
																		</div>
																	</div>
																</div>
															</div>
														</main>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="css-scope footerIcon_container waves-effect  footer_dropdown">
										{/* <div className="css-scope footerIcon_container waves-effect dropdown footer_dropdown"> */}
										<div id="notifications" className="css-scope footer_icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
											<div className="css-scope footer_btn">
												<div className="css-scope icon">
													<Svg className="search-svg-container" svg={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" style="pointer-events:none;display:block;width:100%;height:100%;" viewBox="0 0 24 24">
															<title>notifications</title>
															<path d="M18 15.984l2.016 2.016v0.984h-16.031v-0.984l2.016-2.016v-4.969q0-2.344 1.195-4.078t3.305-2.25v-0.703q0-0.609 0.422-1.055t1.078-0.445 1.078 0.445 0.422 1.055v0.703q2.109 0.516 3.305 2.25t1.195 4.078v4.969zM12 21.984q-0.844 0-1.43-0.563t-0.586-1.406h4.031q0 0.797-0.609 1.383t-1.406 0.586z"></path>
														</svg>`} />

												</div>
											</div>
										</div>
										<div className="icon_name">Notifications</div>
										<ul className="css-scope notifications dropdown-menu" aria-labelledby="notifications">
											<h5> <b>20</b> Notifications <i className="fa fa-circle-o-notch spin hidden" aria-hidden="true"></i></h5>
											<li>
												<ul className="css-scope notifications_list">
													<li className="notifications_single">
														<a href="http://localhost/boroktv.com/@deepak" className="fluid" >
															{/* <a href="http://localhost/boroktv.com/@deepak" className="fluid" style="display: block;"> */}
															<div className="notifications_avatar">
																<img src="http://localhost/boroktv.com/upload/photos/d-avatar.jpg" alt="Avatar" className="full-size" />
															</div>
															<div className="notifications_info">
																<p> <span className="username">Jayant</span>  <span>added you as his friend</span>  <span></span>
																</p>
																<time>
																	<Svg className="search-svg-container" svg={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user-plus">
															<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
															<circle cx="8.5" cy="7" r="4"></circle>
															<line x1="20" y1="8" x2="20" y2="14"></line>
															<line x1="23" y1="11" x2="17" y2="11"></line>
														</svg>12 months ago`} />

																</time>
															</div>
														</a>
													</li>
												</ul>
											</li>
										</ul>
									</div>
									<div className="css-scope footerIcon_container waves-effect">
										<div className="css-scope footer_icon">
											<div className="css-scope footer_btn">
												<div className="css-scope icon">
													<Svg className="search-svg-container" svg={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" style="pointer-events:none;display:block;width:100%;height:100%;" viewBox="0 0 24 24">
															<title>library_add_check</title>
															<path d="M3.984 6v14.016h14.016v1.969h-14.016q-0.797 0-1.383-0.586t-0.586-1.383v-14.016h1.969zM12.469 14.016l6.516-6.609-1.406-1.406-5.109 5.156-2.063-2.063-1.406 1.406zM20.016 2.016q0.797 0 1.383 0.586t0.586 1.383v12q0 0.797-0.586 1.406t-1.383 0.609h-12q-0.797 0-1.406-0.609t-0.609-1.406v-12q0-0.797 0.609-1.383t1.406-0.586h12z"></path>
														</svg>`} />

												</div>
											</div>
										</div>
										<div className="icon_name">Library</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			}
		</section >
	)
}

export default Footer