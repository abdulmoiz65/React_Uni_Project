import React from 'react';
import { useParams, Link } from 'react-router-dom';
import facultyData from '../data/faculty.json';
import styles from './FacultyProfile.module.css';

const FacultyProfile = () => {
  const { slug } = useParams();
  
  // Find faculty member by slug
  const person = facultyData.find(p => p.slug === slug);

  if (!person) {
    return (
      <div className={styles.wrap}>
        <div className={`alert ${styles.alertDanger}`}>
          Profile not found. <Link to="/faculty" className={styles.alertLink}>Back to directory</Link>.
        </div>
      </div>
    );
  }

  // Split name into first and last
  const splitName = (fullName) => {
    if (!fullName) return { first: '', last: '' };
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return { first: parts[0], last: '' };
    return { first: parts[0], last: parts.slice(1).join(' ') };
  };

  const nameParts = splitName(person.name);

  return (
    <div className={styles.wrap}>
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
                <img 
                  src={person.photo || 'https://via.placeholder.com/240x240?text=Photo'} 
                  alt={person.name || 'Profile photo'} 
                />
              </div>
            </div>

            <div className={styles.label}>Name</div>
            <div className={styles.value}>{nameParts.first || '—'}</div>

            <div className={styles.label}>Last Name</div>
            <div className={styles.value}>{nameParts.last || '—'}</div>

            <div className={styles.label}>Contact</div>
            <div className={styles.value}>
              {person.email ? (
                <a href={`mailto:${person.email}`}>{person.email}</a>
              ) : (
                '—'
              )}
            </div>

            <div className={styles.label}>Department</div>
            <div className={styles.value}>{person.department || '—'}</div>

            <div className={styles.label}>Category</div>
            <div className={styles.value}>{person.category || '—'}</div>
          </div>
        </aside>

        {/* Main content */}
        <main className="col-lg-8 order-2 order-lg-1">
          <div className={styles.content}>
            {person.intro && (
              <p className={styles.intro}>{person.intro}</p>
            )}

            {person.experience && person.experience.length > 0 && (
              <>
                <span className={styles.sectionTitle}>Corporate Experience</span>
                <ul className={styles.resumeList}>
                  {person.experience.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {person.academicBackground && person.academicBackground.length > 0 && (
              <>
                <span className={styles.sectionTitle}>Academic Background</span>
                <ul className={styles.resumeList}>
                  {person.academicBackground.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FacultyProfile;