import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import facultyData from '../Data/faculty.json';
import styles from './Faculty.module.css';

const Faculty = () => {
  const [selectedDepts, setSelectedDepts] = useState(new Set());
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeptsDropdown, setShowDeptsDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  
  const pageSize = 16;

  // Get unique departments and categories
  const departments = useMemo(() => {
    return [...new Set(facultyData.map(p => p.department))].sort((a, b) => a.localeCompare(b));
  }, []);

  const categories = useMemo(() => {
    return [...new Set(facultyData.map(p => p.category))].sort((a, b) => a.localeCompare(b));
  }, []);

  // Filter results
  const filteredResults = useMemo(() => {
    return facultyData.filter(p => {
      const haystack = [p.name, p.category, p.department, (p.areas || []).join(' ')].join(' ').toLowerCase();
      const inSearch = !searchTerm || haystack.includes(searchTerm.toLowerCase());
      const inDepts = selectedDepts.size === 0 || selectedDepts.has(p.department);
      const inCats = selectedCategories.size === 0 || selectedCategories.has(p.category);
      return inSearch && inDepts && inCats;
    });
  }, [searchTerm, selectedDepts, selectedCategories]);

  // Paginated results
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredResults.slice(start, start + pageSize);
  }, [filteredResults, currentPage]);

  const totalPages = Math.ceil(filteredResults.length / pageSize);

  // Pagination helper
  const getPaginationPages = (totalPages, current, siblingCount = 1) => {
    const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => i + start);
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;
    
    if (totalPages <= totalBlocks) return range(1, totalPages);

    const start = Math.max(2, current - siblingCount);
    const end = Math.min(totalPages - 1, current + siblingCount);
    const hasLeft = start > 2;
    const hasRight = end < totalPages - 1;

    let pages = [1];
    if (hasLeft) pages.push('…');
    pages = pages.concat(range(start, end));
    if (hasRight) pages.push('…');
    pages.push(totalPages);
    return pages;
  };

  // Handle department filter change
  const handleDeptChange = (dept, checked) => {
    const newDepts = new Set(selectedDepts);
    if (checked) {
      newDepts.add(dept);
    } else {
      newDepts.delete(dept);
    }
    setSelectedDepts(newDepts);
    setCurrentPage(1);
  };

  // Handle category filter change
  const handleCategoryChange = (category, checked) => {
    const newCategories = new Set(selectedCategories);
    if (checked) {
      newCategories.add(category);
    } else {
      newCategories.delete(category);
    }
    setSelectedCategories(newCategories);
    setCurrentPage(1);
  };

  // Handle "All" toggles
  const handleAllDepts = (checked) => {
    if (checked) {
      setSelectedDepts(new Set());
    }
  };

  const handleAllCategories = (checked) => {
    if (checked) {
      setSelectedCategories(new Set());
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepts(new Set());
    setSelectedCategories(new Set());
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    if (page === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (page === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (!isNaN(parseInt(page))) {
      setCurrentPage(parseInt(page));
    }
  };

  // Search debounce effect
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepts, selectedCategories]);

  const paginationPages = totalPages > 1 ? getPaginationPages(totalPages, currentPage, 1) : [];

  return (
    <>
      <section className={`${styles.facultyHero} py-4 py-md-5`}>
        <div className={styles.facultyContainer}>
          <div className={styles.facultyHeader}>
            <h1>FACULTY</h1>
            <div className={styles.underline}></div>
          </div>
          <p className={`${styles.facultyIntro} mb-0`}>
            As with our students, our faculty range from a richly diverse number of nationalities across all schools. With over 500 professors at the university, each discipline benefits from their own community of highly experienced members. Browse, search, and filter to meet our faculty members and learn how they can help guide you towards your chosen career.
          </p>
        </div>
      </section>

      <section className="py-3 py-md-4">
        <div className={styles.facultyContainer}>
          <div className={styles.filtersSticky}>
            <div className="row g-2 align-items-center">
              <div className="col-12 col-md-4">
                <div className={`position-relative ${styles.searchWrap}`}>
                  <i className={`bi bi-search ${styles.biSearch}`}></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What are you looking for?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Departments Dropdown */}
              <div className="col-12 col-md-4">
                <div className="dropdown" data-bs-auto-close="outside">
                  <button
                    className={`btn ${styles.btnFilter} w-100 d-flex justify-content-between align-items-center`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={showDeptsDropdown}
                    onClick={() => setShowDeptsDropdown(!showDeptsDropdown)}
                  >
                    <span>
                      {selectedDepts.size === 0 ? 'All departments' : `Departments (${selectedDepts.size})`}
                    </span>
                    <i className="bi bi-chevron-down ms-2"></i>
                  </button>
                  <div className={`dropdown-menu p-0 ${styles.dropdownMenu} ${showDeptsDropdown ? 'show' : ''}`}>
                    <div className={`p-2 border-bottom ${styles.allOptSticky}`}>
                      <div className={`form-check ${styles.formCheck}`}>
                        <input
                          className={`form-check-input ${styles.formCheckInput}`}
                          type="checkbox"
                          id="deptAll"
                          checked={selectedDepts.size === 0}
                          onChange={(e) => handleAllDepts(e.target.checked)}
                        />
                        <label className={`form-check-label ${styles.formCheckLabel}`} htmlFor="deptAll">
                          All departments
                        </label>
                      </div>
                    </div>
                    <div>
                      {departments.map((dept, i) => (
                        <div key={dept} className={`form-check ${styles.formCheck}`}>
                          <input
                            className={`form-check-input ${styles.formCheckInput}`}
                            type="checkbox"
                            id={`dept${i}`}
                            checked={selectedDepts.has(dept)}
                            onChange={(e) => handleDeptChange(dept, e.target.checked)}
                          />
                          <label className={`form-check-label ${styles.formCheckLabel}`} htmlFor={`dept${i}`}>
                            {dept}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories Dropdown */}
              <div className="col-12 col-md-3">
                <div className="dropdown" data-bs-auto-close="outside">
                  <button
                    className={`btn ${styles.btnFilter} w-100 d-flex justify-content-between align-items-center`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={showCategoriesDropdown}
                    onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                  >
                    <span>
                      {selectedCategories.size === 0 ? 'All categories' : `Categories (${selectedCategories.size})`}
                    </span>
                    <i className="bi bi-chevron-down ms-2"></i>
                  </button>
                  <div className={`dropdown-menu p-0 ${styles.dropdownMenu} ${showCategoriesDropdown ? 'show' : ''}`}>
                    <div className={`p-2 border-bottom ${styles.allOptSticky}`}>
                      <div className={`form-check ${styles.formCheck}`}>
                        <input
                          className={`form-check-input ${styles.formCheckInput}`}
                          type="checkbox"
                          id="catAll"
                          checked={selectedCategories.size === 0}
                          onChange={(e) => handleAllCategories(e.target.checked)}
                        />
                        <label className={`form-check-label ${styles.formCheckLabel}`} htmlFor="catAll">
                          All categories
                        </label>
                      </div>
                    </div>
                    <div>
                      {categories.map((category, i) => (
                        <div key={category} className={`form-check ${styles.formCheck}`}>
                          <input
                            className={`form-check-input ${styles.formCheckInput}`}
                            type="checkbox"
                            id={`cat${i}`}
                            checked={selectedCategories.has(category)}
                            onChange={(e) => handleCategoryChange(category, e.target.checked)}
                          />
                          <label className={`form-check-label ${styles.formCheckLabel}`} htmlFor={`cat${i}`}>
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-auto ms-md-auto text-md-end">
                <button className="btn btn-sm btn-outline-secondary w-100 w-md-auto" onClick={clearFilters}>
                  <i className="bi bi-x-circle me-1"></i>Clear filters
                </button>
              </div>
            </div>
          </div>

          <div className={styles.resultCount}>
            <span>{filteredResults.length}</span> result(s)
          </div>

          <div className={styles.facultyGrid}>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3 g-4 gy-5">
              {paginatedResults.map((person) => (
                <div key={person.id} className="col">
                  <Link to={`/faculty/${person.slug}`} className="text-decoration-none">
                    <div className={styles.facultyCard}>
                      <img className={styles.avatar} src={person.photo} alt={person.name} />
                      <div className={styles.facultyName}>{person.name}</div>
                      <div className={`${styles.facultyMeta} faculty-dept`}>{person.department}</div>
                      <div className={`${styles.facultyMeta} faculty-category`}>{person.category}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {filteredResults.length === 0 && (
              <div className={styles.noResults}>
                No results found. Try adjusting your search or filters.
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="d-flex justify-content-center mt-4" aria-label="Faculty pagination">
                <ul className={`pagination pagination-sm ${styles.pagination}`}>
                  <li className={`page-item ${styles.pageItem} ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className={`page-link ${styles.pageLink}`}
                      onClick={() => handlePageChange('prev')}
                      aria-label="Previous"
                      disabled={currentPage === 1}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>
                  {paginationPages.map((page, idx) => (
                    <li
                      key={idx}
                      className={`page-item ${styles.pageItem} ${
                        page === '…' ? 'ellipsis' : ''
                      } ${page === currentPage ? 'active' : ''}`}
                    >
                      {page === '…' ? (
                        <span className={`page-link ${styles.pageLink}`}>…</span>
                      ) : (
                        <button
                          className={`page-link ${styles.pageLink}`}
                          onClick={() => handlePageChange(page)}
                          aria-label={`Go to page ${page}`}
                        >
                          {page}
                        </button>
                      )}
                    </li>
                  ))}
                  <li className={`page-item ${styles.pageItem} ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className={`page-link ${styles.pageLink}`}
                      onClick={() => handlePageChange('next')}
                      aria-label="Next"
                      disabled={currentPage === totalPages}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Faculty;