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
  ActivityId: string
  ActivityType: string
  Advertised: boolean
  AdvertisedTimeAtLocation: string
  AdvertisedTrainIdent: string
  Booking: any
  Canceled: boolean
  Deleted: boolean
  DepartureDateOTN: string
  EstimatedTimeIsPreliminary: boolean
  FromLocation: Array<{
    LocationName: string
    Priority: number
    Order: number
  }>
  InformationOwner: string
  LocationDateTimeOTN: string
  LocationSignature: string
  ModifiedTime: string
  NewEquipment: number
  Operator: string
  OperationalTrainNumber: string
  OperationalTransportIdentifiers: Array<{
    ObjectType: string
    Company: string
    Core: string
    Variant: string
    TimetableYear: number
    StartDate: string
  }>
  PlannedEstimatedTimeAtLocationIsValid: boolean
  ProductInformation: Array<{
    Code: string
    Description: string
  }>
  ScheduledDepartureDateTime: string
  TimeAtLocation: string
  TimeAtLocationWithSeconds: string
  ToLocation: Array<{
    LocationName: string
    Priority: number
    Order: number
  }>
  TrackAtLocation: string
  TrainOwner: string
  TypeOfTraffic: Array<{
    Code: string
    Description: string
  }>
  ViaToLocation: any
  WebLink: string
  WebLinkName: string
  ViaFromLocation: Array<{
    LocationName: string
    Priority: number
    Order: number
  }>
  EstimatedTimeAtLocation: string
}

