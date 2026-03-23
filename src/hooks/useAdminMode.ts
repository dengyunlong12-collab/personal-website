const ADMIN_SECRET = 'elon19991214'

export function useAdminMode(): boolean {
  const params = new URLSearchParams(window.location.search)
  return params.get('admin') === ADMIN_SECRET
}
