import React from 'react'
import {Link} from 'react-router-dom'

export default function footer() {
  return (
    <div>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 m-2 border-top">
          <div className="d-flex align-items-center">
            <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            
            </Link>
            <span className="text-muted fs-5">© 2021 Company, Inc</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
