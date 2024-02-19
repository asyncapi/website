// ---
// title: 'API Architect'
// date: 06/22/2021
export interface IJob {
  title: string
  date: string
  category: string
  closingOn: string
  contact: string
  company: {
    name: string
    logoUrl: string
  }
}