export const checkUserAuth = (): boolean => {
  let logOutDate = localStorage.getItem('expire')

  if (Date.parse(logOutDate as string) - Date.now() > 0) return true

  return false
}
