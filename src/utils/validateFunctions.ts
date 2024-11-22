export const validateInn = (inn: string) => {
  let result = { innValid: false, innErrorMessage: '' }

  if (typeof inn !== 'string') {
    inn = ''
  }
  if (!inn.length) {
    result.innErrorMessage = 'ИНН пуст'
  } else if (/[^0-9]/.test(inn)) {
    result.innErrorMessage = 'ИНН может состоять только из цифр'
  } else if ([10, 12].indexOf(inn.length) === -1) {
    result.innErrorMessage = 'ИНН может состоять только из 10 или 12 цифр'
  } else {
    const checkDigit = (inn: string, coefficients: number[]) => {
      let n = 0
      for (let i in coefficients) {
        n += coefficients[i] * parseInt(inn[i])
      }
      return (n % 11) % 10
    }
    switch (inn.length) {
      case 10:
        const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8])
        if (n10 === parseInt(inn[9])) {
          result.innValid = true
        }
        break
      case 12:
        const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
        const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
        if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) {
          result.innValid = true
        }
        break
    }
    if (!result.innValid) {
      result.innErrorMessage = 'Неправильное контрольное число'
    }
  }
  return result
}

export const validateQuantity = (field: string) => {
  let result = { quantityValid: false, quantityErrorMessage: '' }

  if (!field.length) {
    result.quantityErrorMessage = 'Поле не может быть пустым'
  } else if (parseInt(field) < 1 || parseInt(field) > 1000) {
    result.quantityErrorMessage = 'Значение должно быть от 0 до 1000'
  } else {
    result.quantityValid = true
  }

  return result
}

export const validateDate = (startDate: string, endDate: string) => {
  let result = { dateValid: false, dateErrorMessage: '' }

  const currentDate = new Date()
  const firstDate = new Date(startDate)
  const lastDate = new Date(endDate)

  if (!startDate || !endDate) {
    result.dateErrorMessage = 'Поля обязательные'
  } else if (firstDate > lastDate) {
    result.dateErrorMessage = 'Дата начала не может быть больше даты конца'
  } else if (firstDate > currentDate) {
    result.dateErrorMessage = 'Дата начала не может быть больше текущей даты'
  } else {
    result.dateValid = true
  }

  return result
}
