import React from 'react'

const Pagination = ({ perPage, total, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
        pageNumbers.push(i)
    }
    console.log(pageNumbers);
    return (
        < >
            <ul className="pagination">
                {pageNumbers.map(pageNumber => (
                    <li onClick={() => paginate(pageNumber)} key={pageNumber} className="page-item"><a className="current page-link">{pageNumber}</a></li>
                ))}
                {/* <a onClick={() => firstPage} disabled={!canFirstPage} href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=5" className="page-link" data-ci-pagination-page="2">2</a>
                <a onClick={() => prevPage} disabled={!canPrevPage} href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=5" className="page-link" data-ci-pagination-page="2">2</a>
                <a href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=5" className="page-link" data-ci-pagination-page="2">2</a>
                <a href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=10" className="page-link" data-ci-pagination-page="3">3</a>
                <a onClick={() => nextPage} disabled={!canNextPage} href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=5" className="page-link" data-ci-pagination-page="2" rel="next">Next</a>
                <a onClick={() => lastPage} disabled={!canLastPage} href="https://www.bestdivision.com/search?q=Select+HTML+Elements+and+apply+CSS++|+Ultimate+Guide&amp;start=45" className="page-link" data-ci-pagination-page="10">Last ›</a> */}
            </ul>
            {/* <div>Showing Page {blogs.length / 10} of about {total} Results</div> */}
        </>
    )
}

export default Pagination
