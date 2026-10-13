import { useEffect } from 'react'

// sets the browser tab title for the page that is currently rendered; pass null to leave it alone
export function usePageTitle(title) {
  useEffect(() => {
    if (title) document.title = title
  }, [title])
}
