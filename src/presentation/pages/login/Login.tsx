import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, LoginHeader } from '@/presentation/components/layout'
import { Input, FormStatus } from '@/presentation/components/utils'
import Styles from './login-styles.scss'
import Context from '../../contexts/form/FormContext'
import { IValidation } from '../../protocols/validation'
import { IAuthentication, ISaveAccessToken } from '@/domain/useCases'

type Props = {
  validation: IValidation
  authentication: IAuthentication
  saveAccessToken: ISaveAccessToken
}

export const Login: React.FC<Props> = ({ validation, authentication,saveAccessToken }: Props) => {
  const history = useHistory()

  const [formState, setFormState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const { email, password } = formState
    const formData = { email, password }
    setFormState({
      ...formState,
      emailError: validation.validate('email', formData),
      passwordError: validation.validate('password', formData)
    })
  }, [formState.email, formState.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()
      if (formState.isLoading || formState.emailError || formState.passwordError) return

      setFormState({ ...formState, isLoading: true })

      const account = await authentication.auth({ email: formState.email, password: formState.password })

      await saveAccessToken.save(account.accessToken)

      history.replace('/')
    } catch (err) {
      setFormState({
        ...formState,
        isLoading: false,
        mainError: err.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ formState, setFormState }}>
        <form data-testid="login-form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit-button" className={Styles.submit} disabled={!!formState.emailError || !!formState.passwordError} type="submit">Entrar</button>
          <Link to="/signup" data-testid="signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}
