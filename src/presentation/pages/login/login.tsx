import React, { useEffect, useState } from 'react'
import { Footer, LoginHeader } from '@/presentation/components/layout'
import { Input, FormStatus } from '@/presentation/components/utils'
import Styles from './login-styles.scss'
import Context from '../../contexts/form/FormContext'
import { IValidation } from '../../protocols/validation'

type Props = {
  validation: IValidation
}

export const Login: React.FC<Props> = ({ validation }: Props) => {
  const [formState, setFormState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo Obrigatório',
    passwordError: 'Campo Obrigatório',
    mainError: ''
  })

  useEffect(() => {
    validation.validate({ email: formState.email })
  }, [formState.email])
  useEffect(() => {
    validation.validate({ password: formState.password })
  }, [formState.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ formState, setFormState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit-button" className={Styles.submit} disabled type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}
