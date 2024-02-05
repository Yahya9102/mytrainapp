export interface User {
  username: string
  password: string
  role: string
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  enabled: boolean
  authorities: Array<{ authority: string }>
}

export interface NavbarProps {
  username?: string
  handleLogout: () => void
}

export interface AdminProps {
  handleLogout: () => void
}

export interface LoginFormProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setGlobalUsername: React.Dispatch<React.SetStateAction<string>>
}

export interface TrainAnnouncement {
  id: number
  trainNumber: string
  station: string
  originalArrivalTime: string
  delayMinutes: number
  newEstimatedTime: string
}
