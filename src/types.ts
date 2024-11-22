export interface IAuthRequisites {
  login: string
  password: string
}

export interface IAuthResponse {
  accessToken: string
  expire: string
}

export interface IError {
  message: string
}

export interface EventFiltersInfo {
  usedCompanyCount: number
  companyLimit: number
}

export interface IUserInfoResponse {
  eventFiltersInfo: EventFiltersInfo
}

export type DateInterval = {
  startDate: string
  endDate: string
}

export type TargetSearchEntity = {
  type: 'company'
  inBusinessNews: boolean | null
  sparkId: null
  entityId: null
  inn: number
  maxFullness: boolean
}

export type TargetSearchEntitiesContext = {
  targetSearchEntities: TargetSearchEntity[]
  onlyMainRole: boolean
  onlyWithRiskFactors: boolean
  tonality: string
}

export type SearchContext = {
  targetSearchEntitiesContext: TargetSearchEntitiesContext
}

export type Attributes = {
  excludeTechNews: boolean
  excludeAnnouncements: boolean
  excludeDigests: boolean
}

export interface IHistogramsRequest {
  intervalType: 'month'
  histogramTypes: ['totalDocuments', 'riskFactors']
  issueDateInterval: DateInterval
  searchContext: SearchContext
  similarMode: 'none' | 'duplicates'
  limit: number
  sortType: 'issueDate' | 'sourceInfluence'
  sortDirectionType: 'desc' | 'asc'
  attributeFilters: Attributes
}

type IntervalPoint = {
  value: number
  date: string
}

export type HistogramData = {
  histogramType: 'totalDocuments' | 'riskFactors'
  data: IntervalPoint[]
}

export interface IGeneralSummary {
  date: string
  all: number
  risks: number
}

export interface IHistogramsResponse {
  data: HistogramData[]
}

type SearchResultItem = {
  encodedId: string
  influence: number
  similarCount: number
}

export interface IDocumentsIdResponse {
  items: SearchResultItem[]
}

export interface IDocumentsIds {
  ids: string[]
}

interface DocumentAuthor {
  name: string
}

interface DocumentSource {
  id: number
  name: string
  categoryId: number
  levelId: number
  groupId: number
}

interface DocumentTitle {
  text: string
  markup: string
}

interface DocumentContent {
  markup: string
}

interface DocumentAtributes {
  isTechNews: boolean
  isAnnouncement: boolean
  isDigest: boolean
  wordCount: number
}

export interface IDocument {
  schemaVersion: string
  id: string
  version: number
  issueDate: string
  url: string
  author: DocumentAuthor
  source: DocumentSource
  dedupClusterId: string
  title: DocumentTitle
  content: DocumentContent
  attributes: DocumentAtributes
  language: string
}

export interface IDocumentsResponse {
  ok: IDocument
}
