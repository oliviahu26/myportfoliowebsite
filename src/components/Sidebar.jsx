import { useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import SpiralIcon from './SpiralIcon.jsx'
import Logo3D from './Logo3D.jsx'
import './Sidebar.css'

// placeholder links, replace the hrefs later
const links = [
  { label: 'Resume', to: '/resume' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/olivia-hu-artist', external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/ohu_design/', external: true },
]

// arrow pointing up-right, marks links that open in a new tab
function ExternalIcon() {
  return (
    <svg className="external-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12L12 4" />
      <path d="M6 4H12V10" />
    </svg>
  )
}

// sidebar bio
const intro =
  'I am a multidisciplinary designer. I specialize in brand identities for print, web, and motion graphics with experience in the beauty and music industry.'

function Sidebar({ filters, selectedFilters, onToggleFilter, showFilters = true }) {
  const [spinning, setSpinning] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const homeRef = useRef(null)

  // "all" is selected when nothing else is
  const isSelected = (filter) => (filter === 'all' ? selectedFilters.length === 0 : selectedFilters.includes(filter))

  // exposes the name bar height so the filter bar can stick just below it on mobile
  useLayoutEffect(() => {
    const home = homeRef.current
    const updateHeight = () => document.documentElement.style.setProperty('--sidebar-header-height', `${home.offsetHeight}px`)
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(home)
    return () => observer.disconnect()
  }, [])

  return (
    <aside className="sidebar">
      <div className="home" ref={homeRef}>
        <div className="home-left">
          <h1 className="name">
            <Link to="/">Olivia Hu</Link>
          </h1>
          <button
            type="button"
            className="menu-toggle"
            aria-label="menu"
            aria-expanded={menuOpen}
            aria-controls="sidebar-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <Link
          className="playground"
          to="/playground"
          aria-label="playground"
          onMouseEnter={() => setSpinning(true)}
          onMouseLeave={() => setSpinning(false)}
          onFocus={() => setSpinning(true)}
          onBlur={() => setSpinning(false)}
        >
          <span className="playground-label">playground</span>
          <SpiralIcon size={14} spinning={spinning} />
          <span className="playground-hint">Click me!</span>
        </Link>
      </div>
      <p className="intro">{intro}</p>
      <div className="sidebar-nav">
        <ul id="sidebar-links" className={`links${menuOpen ? ' is-open' : ''}`}>
          {links.map((link) => (
            <li key={link.label}>
              {link.to ? (
                <NavLink to={link.to}>{link.label}</NavLink>
              ) : (
                <a
                  href={link.href}
                  {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {link.label}
                  {link.external && <ExternalIcon />}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="filters" style={{ visibility: showFilters ? 'visible' : 'hidden' }}>
            {filters.map((filter) => (
              <Badge
                key={filter}
                variant={isSelected(filter) ? 'default' : 'outline'}
                className="h-7 cursor-pointer border-black px-3 text-sm uppercase hover:bg-[#F5A9E0] hover:text-[rgb(51,47,27)]"
                render={
                  <button type="button" aria-pressed={isSelected(filter)} onClick={() => onToggleFilter(filter)} />
                }
              >
                {filter}
              </Badge>
            ))}
        </div>
      </div>
      <div className="sidebar-logo">
        <Logo3D />
      </div>
      <p className="sidebar-footer">© 2026 Olivia Hu</p>
    </aside>
  )
}

export default Sidebar
