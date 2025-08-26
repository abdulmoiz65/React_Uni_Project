import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Faculty.module.css'
import { FACULTY } from '../Data/FacultyData'

const PAGE_SIZE = 16

function getPagination(totalPages, current, siblingCount = 1){
  const range = (s, e) => Array.from({length: e - s + 1}, (_, i) => i + s)
  const totalNumbers = siblingCount * 2 + 3
  const totalBlocks  = totalNumbers + 2
  if (totalPages <= totalBlocks) return range(1, totalPages)

  const start = Math.max(2, current - siblingCount)
  const end   = Math.min(totalPages - 1, current + siblingCount)
  const hasLeft  = start > 2
  const hasRight = end < totalPages - 1

  let pages = [1]
  if (hasLeft) pages.push('…')
  pages = pages.concat(range(start, end))
  if (hasRight) pages.push('…')
  pages.push(totalPages)
  return pages
}

export default function Faculty(){
  // State
  const [search, setSearch] = useState('')
  const [selectedDepts, setSelectedDepts] = useState(new Set())
  const [selectedCats, setSelectedCats] = useState(new Set())
  const [page, setPage] = useState(1)
  const resultRef = useRef(null)

  // Options
  const deptOptions = useMemo(() => {
    return Array.from(new Set(FACULTY.map(p => p.department).filter(Boolean))).sort((a,b)=>a.localeCompare(b))
  }, [])
  const catOptions = useMemo(() => {
    return Array.from(new Set(FACULTY.map(p => p.category).filter(Boolean))).sort((a,b)=>a.localeCompare(b))
  }, [])

  // Filtering
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return FACULTY.filter(p => {
      const haystack = [p.name, p.category, p.department, ...(p.areas||[])].join(' ').toLowerCase()
      const inSearch = !s || haystack.includes(s)
      const inDept  = selectedDepts.size === 0 || selectedDepts.has(p.department)
      const inCat   = selectedCats.size === 0 || selectedCats.has(p.category)
      return inSearch && inDept && inCat
    })
  }, [search, selectedDepts, selectedCats])

  // Pagination
  const total = filtered.length
  const totalPages = Math.ceil(total / PAGE_SIZE) || 1
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])
  useEffect(() => {
    if (page > totalPages) setPage(Math.max(1, totalPages))
  }, [page, totalPages])

  // Handlers
  const toggleDept = (d) => {
    setPage(1)
    setSelectedDepts(prev => {
      const next = new Set(prev); next.has(d) ? next.delete(d) : next.add(d); return next
    })
  }
  const toggleCat = (c) => {
    setPage(1)
    setSelectedCats(prev => {
      const next = new Set(prev); next.has(c) ? next.delete(c) : next.add(c); return next
    })
  }
  const clearFilters = () => {
    setSearch('')
    setSelectedDepts(new Set())
    setSelectedCats(new Set())
    setPage(1)
  }

  // Scroll to top of results when page changes
  useEffect(() => {
    if (resultRef.current) resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page])

  return (
    <>
      <section className={`${styles.facultyHero} py-4 py-md-5`}>
        <div className={styles.facultyContainer}>
          <div className={styles.facultyHeader}>
            <h1 className={styles.title}>FACULTY</h1>
            <div className={styles.underline}></div>
          </div>
          <p className={`${styles.facultyIntro} mb-0`}>
            As with our students, our faculty range from a richly diverse number of nationalities across all schools.
            With over 500 professors at the university, each discipline benefits from their own community of highly
            experienced members. Browse, search, and filter to meet our faculty members and learn how they can help
            guide you towards your chosen career.
          </p>
        </div>
      </section>

      <section className="py-3 py-md-4">
        <div className={styles.facultyContainer}>
          {/* Filters */}
          <div className={styles.filtersSticky}>
            <div className="row g-2 align-items-center">
              {/* Search */}
              <div className="col-12 col-md-4">
                <div className={`position-relative ${styles.searchWrap}`}>
                  <i className={`bi bi-search ${styles.searchIcon}`}></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What are you looking for?"
                    aria-label="Search faculty"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1) }}
                  />
                </div>
              </div>

              {/* Departments */}
              <div className="col-12 col-md-4">
                <div className="dropdown" data-bs-auto-close="outside">
                  <button className={`btn ${styles.btnFilter} w-100 d-flex justify-content-between align-items-center`} data-bs-toggle="dropdown" aria-expanded="false">
                    <span>{selectedDepts.size ? `Departments (${selectedDepts.size})` : 'All departments'}</span>
                    <i className="bi bi-chevron-down ms-2"></i>
                  </button>
                  <div className="dropdown-menu p-0" onClick={e => e.stopPropagation()}>
                    <div className="p-2 border-bottom all-opt-sticky">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="deptAll"
                          checked={selectedDepts.size === 0}
                          onChange={(e) => { if (e.target.checked){ setSelectedDepts(new Set()); setPage(1) } }}
                        />
                        <label className="form-check-label" htmlFor="deptAll">All departments</label>
                      </div>
                    </div>
                    <div>
                      {deptOptions.map((dept, i) => (
                        <label key={dept} className="form-check d-flex align-items-center gap-2 px-3 py-2">
                          <input
                            type="checkbox"
                            className="form-check-input dept-opt"
                            checked={selectedDepts.has(dept)}
                            onChange={() => toggleDept(dept)}
                          />
                          <span className="form-check-label">{dept}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="col-12 col-md-3">
                <div className="dropdown" data-bs-auto-close="outside">
                  <button className={`btn ${styles.btnFilter} w-100 d-flex justify-content-between align-items-center`} data-bs-toggle="dropdown" aria-expanded="false">
                    <span>{selectedCats.size ? `Categories (${selectedCats.size})` : 'All categories'}</span>
                    <i className="bi bi-chevron-down ms-2"></i>
                  </button>
                  <div className="dropdown-menu p-0" onClick={e => e.stopPropagation()}>
                    <div className="p-2 border-bottom all-opt-sticky">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="catAll"
                          checked={selectedCats.size === 0}
                          onChange={(e) => { if (e.target.checked){ setSelectedCats(new Set()); setPage(1) } }}
                        />
                        <label className="form-check-label" htmlFor="catAll">All categories</label>
                      </div>
                    </div>
                    <div>
                      {catOptions.map((cat, i) => (
                        <label key={cat} className="form-check d-flex align-items-center gap-2 px-3 py-2">
                          <input
                            type="checkbox"
                            className="form-check-input cat-opt"
                            checked={selectedCats.has(cat)}
                            onChange={() => toggleCat(cat)}
                          />
                          <span className="form-check-label">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear */}
              <div className="col-12 col-md-auto ms-md-auto text-md-end">
                <button className="btn btn-sm btn-outline-secondary w-100 w-md-auto" onClick={clearFilters}>
                  <i className="bi bi-x-circle me-1"></i>Clear filters
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div ref={resultRef} className={styles.resultCount}><span>{total}</span> result(s)</div>

          {/* Grid */}
          <div className={styles.facultyGrid}>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3 g-4 gy-5">
              {paged.map(p => (
                <div className="col" key={p.id}>
                  <div className={`${styles.facultyCard} h-100`}>
                    <img className={styles.avatar} src={p.photo} alt={p.name} />
                    <div className={styles.facultyName}>{p.name}</div>
                    <div className={`${styles.facultyMeta} faculty-dept`}>{p.department}</div>
                    <div className={`${styles.facultyMeta} faculty-category`}>{p.category}</div>
                    <Link to={`/faculty/${p.slug}`} className="stretched-link" aria-label={`Open ${p.name}'s profile`} />
                  </div>
                </div>
              ))}
            </div>

            {total === 0 && <div className={styles.noResults}>No results found. Try adjusting your search or filters.</div>}

            {/* Pagination */}
            <nav className="d-flex justify-content-center mt-4" aria-label="Faculty pagination">
              {(() => {
                const pages = getPagination(totalPages, page, 1)
                if (totalPages <= 1) return null
                return (
                  <ul className="pagination pagination-sm">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" onClick={e => { e.preventDefault(); if (page > 1) setPage(page - 1) }} aria-label="Previous">
                        <i className="bi bi-chevron-left"></i>
                      </a>
                    </li>
                    {pages.map((p, idx) => p === '…'
                      ? <li key={`e-${idx}`} className="page-item disabled ellipsis"><span className="page-link">…</span></li>
                      : <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                          <a className="page-link" href="#" onClick={e => { e.preventDefault(); setPage(p) }} aria-label={`Go to page ${p}`}>{p}</a>
                        </li>
                    )}
                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" onClick={e => { e.preventDefault(); if (page < totalPages) setPage(page + 1) }} aria-label="Next">
                        <i className="bi bi-chevron-right"></i>
                      </a>
                    </li>
                  </ul>
                )
              })()}
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}