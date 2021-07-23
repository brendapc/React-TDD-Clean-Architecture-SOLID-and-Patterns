import { createContext } from 'react'
import { IAccountModel } from '@/domain/models'

type Props = {
  setCurrentAccount?: (account: IAccountModel) => void
  getCurrentAccount?: () => IAccountModel
}

export default createContext<Props>(null)
