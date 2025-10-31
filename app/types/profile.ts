export interface Profile {
  id: string
  email: string
  phone: string
  firstName: string
  lastName: string
  fullName: string
  avatarFileId: string | null
  gender: string | null
  birthDate: string | null
  height: number | null
  weight: number | null
  skinTone: string | null
  bodyType: string | null
  stylePreferences: string | null
  sizePreferences: string | null
  isActive: boolean
  isPremium: boolean
  role: string
  createdDate: string
  modifiedDate: string | null
}
