import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageTitle } from './utils/usePageTitle.js'
import Sidebar from './components/Sidebar.jsx'
import Carousel from './components/Carousel.jsx'
import Marquee from './components/Marquee.jsx'
import FilterBar from './components/FilterBar.jsx'
import Playground from './pages/Playground.jsx'
import Resume from './pages/Resume.jsx'
import './App.css'

const marqueeText = '🇹🇼\u00A0🇨🇳\u00A0🇺🇸\u00A0\u00A0\u00A0CREATIVE BASED IN NYC\u00A0\u00A0\u00A0(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧\u00A0\u00A0\u00A0♬ ｡･:*:･ﾟ✧･ﾟ:*:･｡ ♫'

// projects shown in the carousel stack
const projects = [
  {
    id: 'enchante-accessories',
    title: 'ENCHANTE ACCESSORIES',
    year: '2025-2026',
    categories: ['packaging', 'brand identity'],
    description:
      'Designed beauty and bath packaging for Nicole Miller, Ellen Tracy, Pharma Glow, and Le Soie, sold at TJ Maxx, Ross, Burlington, and other major retailers.',
    images: [
      '/images/enchante_accessories/enchante_accessories_Floating_Tinted_Lip_Butter_Gift_Sets.webp',
      '/images/enchante_accessories/enchante_accessories_HydroGel_SHEETMASKTRIO.webp',
      '/images/enchante_accessories/enchante_accessories_COMPLEXION_STICK_TRIO.webp',
      '/images/enchante_accessories/enchante_accessories_NM_BATHESSENTIALS.webp',
      '/images/enchante_accessories/enchante_accessories_NM_HANDCREAMCOLLECTION.webp',
      '/images/enchante_accessories/enchante_accessories_PINKYELLOWGRADIENTSET.webp',
      '/images/enchante_accessories/enchante_accessories_Pharmaglow_Facial_Scrub_Duo.webp',
      '/images/enchante_accessories/enchante_accessories_Eco_Harbor_Pastel_Foaming_Soaps.webp',
    ],
  },
  {
    id: 'peach-slices',
    title: 'REIMAGINING PEACH SLICES SKINCARE',
    year: '2024',
    categories: ['brand identity', 'packaging'],
    description:
      'Developed a vibrant visual brand system for Peach Slices, a skincare line featuring essential Korean ingredients, tailored specifically for a younger audience.',
    images: [
      '/images/peach_slices/peach_slices_stickersPeachSlices.webp',
      '/images/peach_slices/peach_slices_animatedPeachSlices.webp',
      '/images/peach_slices/peach_slices_peachslices_cellphone.webp',
      '/images/peach_slices/peach_slices_peachslices1.webp',
      '/images/peach_slices/peach_slices_peachslices7.webp',
      '/images/peach_slices/peach_slices_peachslices3.webp',
      '/images/peach_slices/peach_slices_social1.webp',
      '/images/peach_slices/peach_slices_social2.webp',
      '/images/peach_slices/peach_slices_social3.webp',
      '/images/peach_slices/peach_slices_peachslices4.webp',
      '/images/peach_slices/peach_slices_peachslices5.webp',
      '/images/peach_slices/peach_slices_peachslices6.webp',
    ],
  },
  {
    id: 'perfume-street',
    title: 'PERFUME STREET: WHITE IRIS',
    year: '2026',
    categories: ['motion'],
    description: (
      <>
        Designed Instagram assets for the launch campaign of White Iris, the partner fragrance to <em>Borsalino</em>’s
        Black Iris.
      </>
    ),
    images: [
      '/images/perfume_street/perfume_street_Video_Collage_3.webp',
      '/images/perfume_street/perfume_street_MovieEdit_1_Final.mp4#t=1',
      '/images/perfume_street/perfume_street_Video_Collage_1.webp',
      '/images/perfume_street/perfume_street_MovieEdit_2_Final.mp4#t=1',
      '/images/perfume_street/perfume_street_Video_Collage_2.webp',
    ],
  },
  {
    id: 'thesis',
    title: 'WHAT AM I FEELING?',
    year: '2024',
    categories: ['brand identity', 'editorial', 'packaging'],
    description:
      'For my senior thesis at Parsons School of Design, I created a series of seven unique booklets, each devoted to capturing the essence of human emotions: happiness, anger, sadness, fear, surprise, disgust, and bad. These emotions are derived from the Feelings Wheel widely utilized by mental health professionals. With an intro zine, shows the purpose for creating this project, shows glimpses of each booklet, and is a guide for viewers on how to experience each booklet individually. Enclosed within is a care package with extra goodies\u2014stickers, a journal, and keychains.',
    images: [
      '/images/thesis/thesis_thesis5.webp',
      '/images/thesis/thesis_thesis2.webp',
      '/images/thesis/thesis_thesis1.webp',
      '/images/thesis/thesis_thesis3.webp',
      '/images/thesis/thesis_closeup1.webp',
      '/images/thesis/thesis_happy2.webp',
      '/images/thesis/thesis_closeup2.webp',
      '/images/thesis/thesis_angry3.webp',
      '/images/thesis/thesis_closeup3.webp',
      '/images/thesis/thesis_sad3.webp',
      '/images/thesis/thesis_closeup4.webp',
      '/images/thesis/thesis_fear2.webp',
      '/images/thesis/thesis_closeup5.webp',
      '/images/thesis/thesis_surprise2.webp',
      '/images/thesis/thesis_closeup7.webp',
      '/images/thesis/thesis_bad3.webp',
      '/images/thesis/thesis_closeup6.webp',
      '/images/thesis/thesis_disgusting2.webp',
      '/images/thesis/thesis_closeup8.webp',
    ],
  },
  {
    id: 'warner-music-group',
    title: 'WARNER MUSIC GROUP',
    year: '2023-2024',
    categories: ['motion', 'brand identity', 'website design'],
    description:
      'Social media graphics, animations, and website design done for Atlantic Records & 300 Entertainment as Creative Intern and Interactive Design Intern.',
    images: [
      '/images/warner_music_group/warner_music_group_atlantic_halloween.webp',
      '/images/warner_music_group/warner_music_group_Halloween.mp4',
      '/images/warner_music_group/warner_music_group_nolantaylor.mp4',
      '/images/warner_music_group/warner_music_group_advent.webp',
      '/images/warner_music_group/warner_music_group_damperhamper.webp',
      '/images/warner_music_group/warner_music_group_malbonbowling2.webp',
      '/images/warner_music_group/warner_music_group_malbonbowling.webp',
      '/images/warner_music_group/warner_music_group_300_yourfriends.webp',
      '/images/warner_music_group/warner_music_group_spotify.webp',
      '/images/warner_music_group/warner_music_group_ajagrant.webp',
      '/images/warner_music_group/warner_music_group_teegrizzleybday.webp',
      '/images/warner_music_group/warner_music_group_baribass.webp',
      '/images/warner_music_group/warner_music_group_july4.mp4',
      '/images/warner_music_group/warner_music_group_vinylday.mp4',
      '/images/warner_music_group/warner_music_group_breezylyn1.webp',
      '/images/warner_music_group/warner_music_group_breezylyn2.webp',
      '/images/warner_music_group/warner_music_group_solomon.webp',
      '/images/warner_music_group/warner_music_group_yourfriendsoptions.webp',
    ],
  },
  {
    id: 'electric-zoo',
    title: 'ELECTRIC ZOO REIMAGINED',
    year: '2023',
    categories: ['motion', 'brand identity'],
    description:
      'I gave New York\u2019s Electric Zoo Festival a vibrant, youthful makeover. The original branding lacked the energy to connect with the younger generation who are central to the festival\u2019s audience.',
    images: [
      '/images/electric_zoo/electric_zoo_billboardmockup.webp',
      '/images/electric_zoo/electric_zoo_ElectricZoo.webp',
      '/images/electric_zoo/electric_zoo_ezoowordmark.webp',
      '/images/electric_zoo/electric_zoo_colors.webp',
      '/images/electric_zoo/electric_zoo_typeface.webp',
      '/images/electric_zoo/electric_zoo_15sintroreel.mp4',
      '/images/electric_zoo/electric_zoo_wristbands.webp',
      '/images/electric_zoo/electric_zoo_postermockup.mp4',
      '/images/electric_zoo/electric_zoo_ezooshirts.webp',
      '/images/electric_zoo/electric_zoo_fannypackmockup2.webp',
      '/images/electric_zoo/electric_zoo_ezoosocialpost.webp',
    ],
  },
]

const filterOptions = ['all', 'brand identity', 'packaging', 'editorial', 'motion', 'website design']

// keeps the home page mounted, with its state, but takes it out of layout while the resume shows (so its wide carousels don't cause horizontal scroll)
const hiddenStyle = { display: 'none' }

function App() {
  const { pathname } = useLocation()
  const [selectedFilters, setSelectedFilters] = useState([])

  // the resume page has no carousels to filter, so it always starts with nothing selected
  useEffect(() => {
    if (pathname === '/resume') setSelectedFilters([])
  }, [pathname])

  // "all" clears every other filter; any other filter toggles on or off
  const toggleFilter = (filter) => {
    if (filter === 'all') {
      setSelectedFilters([])
      return
    }
    setSelectedFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter],
    )
  }

  // only show filters that have at least one project
  const filters = filterOptions.filter(
    (filter) => filter === 'all' || projects.some((project) => project.categories.includes(filter)),
  )

  // a project shows if it has any of the selected filters
  const visibleProjects =
    selectedFilters.length === 0
      ? projects
      : projects.filter((project) => project.categories.some((category) => selectedFilters.includes(category)))

  usePageTitle(pathname === '/playground' || pathname === '/resume' ? null : 'Portfolio | Olivia Hu')
  if (pathname === '/playground') return <Playground />
  const isResume = pathname === '/resume'

  return (
    <>
      <Sidebar filters={filters} selectedFilters={selectedFilters} onToggleFilter={toggleFilter} showFilters={!isResume} />
      <main className="content" style={isResume ? hiddenStyle : undefined}>
        <Marquee text={marqueeText} />
        <FilterBar selectedFilters={selectedFilters} />
        {visibleProjects.map((project) => (
          <Carousel
            key={project.id}
            title={project.title}
            year={project.year}
            images={project.images}
            description={project.description}
          />
        ))}
      </main>
      {isResume && <Resume />}
    </>
  )
}

export default App
