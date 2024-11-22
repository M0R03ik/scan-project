import { AxiosResponse } from 'axios'
import {
  IDocumentsIdResponse,
  IDocumentsIds,
  IDocumentsResponse,
  IHistogramsRequest,
  IHistogramsResponse,
} from '../types'
import { api } from '../http'

export async function fetchHistograms(
  requisites: IHistogramsRequest
): Promise<AxiosResponse<IHistogramsResponse>> {
  return api.post('objectsearch/histograms', requisites)
}

export async function fetchDocumentsId(
  requisites: IHistogramsRequest
): Promise<AxiosResponse<IDocumentsIdResponse>> {
  return api.post('objectsearch', requisites)
}

export async function fetchDocuments(
  requisites: IDocumentsIds
): Promise<AxiosResponse<IDocumentsResponse[]>> {
  return api.post('documents', requisites)
}
