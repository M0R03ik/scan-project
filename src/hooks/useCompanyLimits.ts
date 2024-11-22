import { useAppSelector } from '../store/store'

export const useCompanyLimits = () => {
  const { isLoading, companyLimit, usedCompanyCount } = useAppSelector(
    state => state.companyLimits
  )

  return { isLoading, companyLimit, usedCompanyCount }
}
