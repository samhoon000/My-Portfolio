import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { profile } from '../data/museum-data'
import { destinations, useMuseum } from './MuseumContext'

export function MuseumNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { progress } = useMuseum()
  useEffect(() => setOpen(false), [location.pathname])
  const current = destinations.find(room => room.path === location.pathname)
  const roomName = location.pathname === '/' ? 'Entrance' : current?.label || (location.pathname.includes('/projects/') ? 'Project Exhibit' : 'Museum')

  return <>
    <header className="museum-nav">
      <Link className="museum-brand" to="/" aria-label="Abdul Samhoon, museum entrance"><span>AS<span>·</span></span><strong>ABDUL SAMHOON<small>INTERACTIVE DATA MUSEUM</small></strong></Link>
      <div className="museum-location"><span className="location-pulse" /> NOW IN <b>{roomName}</b></div>
      <div className="museum-nav-actions">
        {location.pathname !== '/museum' && <Link className="nav-atrium" to="/museum"><ArrowLeft size={15} /> Atrium</Link>}
        <a href={profile.resume} download className="nav-resume">Résumé <Download size={15} /></a>
        <Link to="/museum/contact" className="nav-contact">Contact <ArrowUpRight size={15} /></Link>
        <button type="button" className="nav-menu-button" aria-label={open ? 'Close room selector' : 'Open room selector'} aria-expanded={open} aria-controls="room-selector" onClick={() => setOpen(value => !value)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
    </header>
    {open && <nav id="room-selector" className="room-selector" aria-label="Museum room selector">
      <div className="room-selector-heading"><span>EXHIBITION DIRECTORY</span><span>{String(progress.rooms.length).padStart(2, '0')} / 06 ROOMS VISITED</span></div>
      {destinations.map(room => <Link key={room.id} to={room.path} aria-current={current?.id === room.id ? 'page' : undefined} className={current?.id === room.id ? 'selected' : ''}><span>{room.number}</span><strong>{room.label}</strong><span className={progress.rooms.includes(room.id) ? 'room-visited' : 'room-unvisited'}>{progress.rooms.includes(room.id) ? 'VISITED' : 'ENTER'}</span><ArrowUpRight size={17} /></Link>)}
      <div className="room-selector-foot"><a href={profile.resume} download>Download résumé <Download size={16} /></a><Link to="/museum/contact">Get in touch <ArrowUpRight size={16} /></Link></div>
    </nav>}
  </>
}
