import { Badge } from '@/components/ui/badge'
import './FilterBar.css'

// shows the selected filters above the carousels; display only, not clickable
function FilterBar({ selectedFilters }) {
  // always rendered so the carousels don't shift when a filter is picked; hidden while empty
  return (
    <div className={`filter-bar${selectedFilters.length === 0 ? ' is-empty' : ''}`}>
      {selectedFilters.map((filter) => (
        <Badge key={filter} className="h-7 border-transparent bg-(--sidebar-blue) px-3 text-sm text-white uppercase">
          {filter}
        </Badge>
      ))}
    </div>
  )
}

export default FilterBar
