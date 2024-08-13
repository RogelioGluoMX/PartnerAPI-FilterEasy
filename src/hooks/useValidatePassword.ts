import { useState } from 'react'

export type PasswordState = {
  hasLowercase: boolean
  hasNumber: boolean
  hasSpecial: boolean
  hasUppercase: boolean
  hasValidLength: boolean
  isValidPassword: boolean
}

export type DispatchPassword = (password: string) => void

export const useValidatePassword = (): [PasswordState, DispatchPassword] => {
  const [state, setState] = useState<PasswordState>({
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
    hasUppercase: false,
    hasValidLength: false,
    isValidPassword: false,
  })

  const dispatch = (password: string) => {
    const validations = {
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasValidLength: password.length >= 8 && password.length <= 20,
    }

    setState({
      ...validations,
      isValidPassword: Object.values(validations).every(Boolean),
    })
  }

  return [state, dispatch]
}
