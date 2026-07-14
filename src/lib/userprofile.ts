// src/lib/userProfile.ts
export type UserProfile = {
  allergens: string[]        // ['gluten', 'peanut', 'tree-nut']
  diets: string[]            // ['vegan', 'kosher']
  cuisines: string[]         // ['Japanese', 'Indian']
  completedOnboarding: boolean
}

const DEFAULT: UserProfile = {
  allergens: [], diets: [], cuisines: [], completedOnboarding: false
}

export const getProfile = (): UserProfile => {
  if (typeof window === 'undefined') return DEFAULT
  const raw = localStorage.getItem('zc-profile')
  return raw ? JSON.parse(raw) : DEFAULT
}

export const saveProfile = (profile: UserProfile): void => {
  localStorage.setItem('zc-profile', JSON.stringify(profile))
}

export const clearProfile = (): void => {
  localStorage.removeItem('zc-profile')
}