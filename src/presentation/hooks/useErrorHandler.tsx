import { AccessDeniedError } from '@/domain/errors/AccessDeniedError'
import { useLogout } from '.'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const logoutHook = useLogout()
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logoutHook()
    } else {
      callback(error)
    }
  }
}
