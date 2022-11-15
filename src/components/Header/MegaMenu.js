import React from 'react'
// import './MegaMenu.css'

function MegaMenu() {
    return (
        <div className="container-fluid open">
            <div className="row clearfix">
                <main className="">
                    <div className="box shadow-sm border rounded bg-white mb-3 jk-share-post">

                        <ul className="nav border-bottom jk-line-tab" id="mega_menu-myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="mega_menu-templates-tab" data-toggle="tab" href="#mega_menu-templates" role="tab" aria-controls="mega_menu-templates" aria-selected="true">Templates</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="mega_menu-paid_courses-tab" data-toggle="tab" href="#mega_menu-paid_courses" role="tab" aria-controls="mega_menu-paid_courses" aria-selected="true">Paid Courses</a>
                            </li>
                        </ul>

                        <div className="tab-content" id="mega_menu-myTabContent" role="navigation" itemScope="itemscope" itemType="https://schema.org/SiteNavigationElement">
                            <div className="tab-pane fade show active" id="mega_menu-templates" role="tabpanel" aria-labelledby="mega_menu-templates-tab">
                                <div className="container jk-main-content">
                                    <h2 className="">Paid Courses</h2>
                                    <div className="row clearfix">
                                        <div className="row">
                                            <div className="column">
                                                <h3>Category 1</h3>
                                                <a href="#">Link 1</a>
                                                <a href="#">Link 2</a>
                                                <a href="#">Link 3</a>
                                            </div>
                                            <div className="column">
                                                <h3>Category 2</h3>
                                                <a href="#">Link 1</a>
                                                <a href="#">Link 2</a>
                                                <a href="#">Link 3</a>
                                            </div>
                                            <div className="column">
                                                <h3>Category 3</h3>
                                                <a href="#">Link 1</a>
                                                <a href="#">Link 2</a>
                                                <a href="#">Link 3</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="show_more"><a href="/" >Show More ...</a></div>
                            </div>

                            <div className="tab-pane fade" id="mega_menu-paid_courses" role="tabpanel" aria-labelledby="mega_menu-paid_courses-tab">
                                <div className="container jk-main-content">
                                    <h2 className="" >Tutorials</h2>
                                    <div className="row clearfix">
                                        {/* <?<17; $i++){ ?>
    				                <? php //$this->load->view('home/snippets/course_card.php'); ?>
                                                <? php } ?> */}

    				        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default MegaMenu
