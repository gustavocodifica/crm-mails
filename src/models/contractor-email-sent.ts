export interface ContractorEmailSent {
  id: string
  email: string
  emailType:
    | 'welcome'
    | 'half_test'
    | 'three_days_before'
    | 'last_day'
    | 'three_days_after'
  sentAt?: string
}
