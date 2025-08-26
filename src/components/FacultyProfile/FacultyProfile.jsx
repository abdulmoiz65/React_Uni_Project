import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './FacultyProfile.module.css'
import { getFacultyBySlug } from '../Data/FacultyData'

function splitName(fullName){
  if (!fullName) return { first: '', last: '' }
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) return { first: parts[0], last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

export default function FacultyProfile(){
  const { slug } = useParams()
  const person = getFacultyBySlug(slug)

  if (!person){
    return (
      <div className={styles.wrap}>
        <h1 className={styles.nameTitle}>Profile not found</h1>
        <span className={styles.accentLine}></span>
        <p><Link to="/faculty" className={styles.link}>← Back to Faculty</Link></p>
      </div>
    )
  }

  const { first, last } = splitName(person.name)

  return (
    <div className={styles.wrap} id="pageWrap">
      {/* Header */}
      <header className="mb-3">
        <h1 className={styles.nameTitle}>{person.name}</h1>
        <span className={styles.accentLine}></span>
      </header>

      <div className={`row ${styles.gCustom} align-items-start`}>
        {/* Sidebar */}
        <aside className="col-lg-4 order-1 order-lg-2">
          <div className={styles.sidebar}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className={styles.avatarWrap}>
                <img className={styles.avatar} src={person.photo || 'https://via.placeholder.com/240x240?text=Photo'} alt="Profile photo" />
              </div>
            </div>

            <div className={styles.label}>Name</div>
            <div className={styles.value}>{first || '—'}</div>

            <div className={styles.label}>Last Name</div>
            <div className={styles.value}>{last || '—'}</div>

            <div className={styles.label}>Contact</div>
            <div className={styles.value}>
              {person.email ? <a className={styles.link} href={`mailto:${person.email}`}>{person.email}</a> : '—'}
            </div>

            <div className={styles.label}>Department</div>
            <div className={styles.value}>{person.department || '—'}</div>

            <div className={styles.label}>Category</div>
            <div className={styles.value}>{person.category || '—'}</div>

            <p style={{ marginTop: 10 }}>
              <Link to="/faculty" className={styles.link}>← Back to Faculty</Link>
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className="col-lg-8 order-2 order-lg-1">
          <div className={styles.content}>
            {person.intro && <p className={styles.intro}>{person.intro}</p>}

            {Array.isArray(person.experience) && person.experience.length > 0 && (
              <>
                <span className={styles.sectionTitle}>Corporate Experience</span>
                <ul className={styles.resumeList}>
                  {person.experience.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </>
            )}

            {Array.isArray(person.academicBackground) && person.academicBackground.length > 0 && (
              <>
                <span className={styles.sectionTitle}>Academic Background</span>
                <ul className={styles.resumeList}>
                  {person.academicBackground.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}