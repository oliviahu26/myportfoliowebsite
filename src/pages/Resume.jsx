import { usePageTitle } from '../utils/usePageTitle.js'
import './Resume.css'

const RESUME_FILE = '/olivia_hu_resume.pdf'

const summary =
  'Olivia Hu is a multidisciplinary designer with a BFA in Communication Design from Parsons School of Design, specializing in visual branding, web design, and motion graphics. She brings a strong creative focus to projects in the beauty and music industries.'

const contact = ['imoliviahu.com', 'oliviahu26@gmail.com', 'in/olivia-hu-artist', '908 356 2100']

const experience = [
  {
    role: 'Graphics & Packaging Designer',
    company: 'Enchanté Accessories',
    dates: 'Jan 2025-Present',
    bullets: [
      'Executed 100+ retail packaging concepts in Illustrator for bath, beauty, and wellness brands at TJ Maxx, Ross, and Burlington, refreshing brand identity at scale',
      'Partnered with cross-functional teams to bring 10+ brand product lines from concept to completion, meeting client objectives on schedule',
      'Produced 100+ vector renderings and dielines in Illustrator and Photoshop, streamlining approval and accuracy',
    ],
  },
  {
    role: 'Freelance Graphic Designer',
    dates: 'May 2024-Present',
    bullets: [
      'Designed brand logos, typography, and visual guidelines in Illustrator for The Archive (6,500+ YouTube views) & Goby Global (850+ LinkedIn Newsletter subscribers)',
      'Produced motion graphics and social content in After Effects and Premiere Pro for NY Fashion Week and Perfume Street, driving 5,500+ Instagram views',
      'Translated vague client briefs into polished identities through iterative feedback, reducing revision rounds and delivering final designs on deadline',
    ],
  },
  {
    role: 'Graphic Design Intern',
    company: '300 Entertainment (Warner Music Group)',
    dates: 'Feb 2024-Apr 2024',
    bullets: [
      'Crafted static and animated company Instagram assets and artist logos in Photoshop and After Effects',
      'Rendered the album cover for Hunxho’s single ‘Your Friends’ (50M+ Spotify streams) in Illustrator, alongside logos and merch graphics for 5+ artists/label events',
      'Co-developed college marketing activations with fellow interns for rising artists including AR The Mermaid, Hunxho, Lil Jairmy, Chikoruss, and Kenya Vaun',
    ],
  },
  {
    role: 'Graphic Design Intern',
    company: 'Atlantic Records (Warner Music Group)',
    dates: 'Sep 2023-Nov 2023',
    bullets: [
      'Built Nolan Taylor’s artist website in Adobe XD, maintaining brand consistency and streamlined access to artist information',
      'Generated 50+ static assets optimized across major streaming platforms and custom Instagram filters in Spark AR to promote artist upcoming tours',
      'Coordinated with fellow interns to implement marketing activations on Discord, driving artist-fan interaction for The Marías',
    ],
  },
  {
    role: 'Graphic Designer',
    company: 'Yeh IDeology',
    dates: 'May 2022-May 2023',
    bullets: [
      'Developed brand identity and website UX in Figma for Thrive By Design, a partner business of Yeh IDeology',
      'Created 50+ digital assets in Figma for social media, websites, and Yeh IDeology’s monthly podcast covers',
      'Formatted monthly newsletter layouts in Mailchimp, incorporating imagery, text, and action buttons boosting 50% more interaction',
    ],
  },
]

const skills = [
  'Illustrator',
  'Photoshop',
  'InDesign',
  'After Effects',
  'Premiere Pro',
  'Figma',
  'Social Media',
  'HTML & CSS',
  'Typography',
  'Logo Design',
  'Color Theory',
  'Packaging Design',
  'Website Design',
  'Motion Graphics',
  'Video Editing',
  'Photo Editing',
  'Merch Design',
  'Illustration',
  'Photography',
]

const education = [
  { year: '2024', school: 'Parsons School of Design, The New School', degree: 'Bachelor of Fine Arts' },
  { year: '2023', school: 'Wix Playground Academy' },
]

function Resume() {
  usePageTitle('Resume | Olivia Hu')

  return (
    <main className="content resume-page">
      <article className="resume">
        <a className="resume-download" href={RESUME_FILE} download="olivia_hu_resume.pdf">
          Download PDF
        </a>

        <header className="resume-header">
          <div>
            <h1 className="resume-name">Olivia Hu</h1>
            <p className="resume-role">Graphic Designer</p>
          </div>
          <ul className="resume-contact">
            {contact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </header>

        <p className="resume-summary">{summary}</p>

        <div className="resume-columns">
          <section className="resume-main">
            <h2 className="resume-heading">Experience</h2>
            {experience.map((job) => (
              <div className="resume-job" key={`${job.role}-${job.dates}`}>
                <div className="resume-job-title">
                  <p>
                    <em>{job.role}</em>
                    {job.company && (
                      <>
                        {' | '}
                        <span>{job.company}</span>
                      </>
                    )}
                  </p>
                  <span className="resume-dates">{job.dates}</span>
                </div>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <aside className="resume-side">
            <h2 className="resume-heading">Skills</h2>
            <ul className="resume-skills">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>

            <h2 className="resume-heading">Education</h2>
            {education.map((item) => (
              <div className="resume-education" key={item.school}>
                <p className="resume-dates">{item.year}</p>
                <p>
                  <em>{item.school}</em>
                </p>
                {item.degree && <p>{item.degree}</p>}
              </div>
            ))}
          </aside>
        </div>

      </article>
    </main>
  )
}

export default Resume
