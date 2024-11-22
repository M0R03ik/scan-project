import { ISearchForm } from '../pages/Search/Search'
import { IHistogramsRequest } from '../types'

export const createRequest = ({
  inn,
  tonality,
  quantity,
  firstDate,
  lastDate,
  excludeAnnouncements,
  excludeDigests,
  excludeTechNews,
  inBusinessNews,
  maxFullness,
  onlyMainRole,
  onlyWithRiskFactors,
}: ISearchForm): IHistogramsRequest => {
  const requestData: IHistogramsRequest = {
    issueDateInterval: {
      startDate: `${firstDate}T00:00:00+03:00`,
      endDate: `${lastDate}T23:59:59+03:00`,
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: 'company',
            sparkId: null,
            entityId: null,
            inn: Number(inn),
            maxFullness: maxFullness,
            inBusinessNews: inBusinessNews,
          },
        ],
        onlyMainRole: onlyMainRole,
        tonality: tonality,
        onlyWithRiskFactors: onlyWithRiskFactors,
        riskFactors: {
          and: [],
          or: [],
          not: [],
        },
        themes: {
          and: [],
          or: [],
          not: [],
        },
      },
      themesFilter: {
        and: [],
        or: [],
        not: [],
      },
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: [],
    },
    attributeFilters: {
      excludeTechNews: excludeTechNews,
      excludeAnnouncements: excludeAnnouncements,
      excludeDigests: excludeDigests,
    },
    similarMode: 'duplicates',
    limit: Number(quantity),
    sortType: 'sourceInfluence',
    sortDirectionType: 'desc',
    intervalType: 'month',
    histogramTypes: ['totalDocuments', 'riskFactors'],
  }

  return requestData
}
