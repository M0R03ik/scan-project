import axios, { AxiosResponse } from 'axios'
import {
  IAuthRequisites,
  IAuthResponse,
  IError,
  IUserInfoResponse,
} from '../types'
import { api } from '../http'

export async function fetchAuth(
  requisites: IAuthRequisites
): Promise<AxiosResponse<IAuthResponse>> {
  try {
    const response = await api.post<IAuthResponse>('account/login', requisites)
    return response
  } catch (error) {
    let errorMessage: string | null = null

    // Проверяем, является ли ошибка AxiosError и содержит ли типизированные данные
    if (axios.isAxiosError<IError>(error)) {
      errorMessage = error.response?.data.message || 'Неизвестная ошибка'
    } else {
      // Обработка других типов ошибок
      errorMessage = 'An unexpected error occurred'
    }

    throw new Error(errorMessage) // Приведение к Error
  }
}

export async function fetchUserInfo(): Promise<
  AxiosResponse<IUserInfoResponse, any>
> {
  return api.get<IUserInfoResponse>('account/info')
}
