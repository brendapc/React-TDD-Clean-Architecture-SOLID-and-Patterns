import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, LoginHeader } from '@/presentation/components/layout'
import { Input, FormStatus } from '@/presentation/components/utils'
import Styles from './login-styles.scss'
import { FormContext, ApiContext } from '../../contexts'
import { IValidation } from '../../protocols/validation'
import { IAuthentication } from '@/domain/useCases'

type Props = {
  validation: IValidation
  authentication: IAuthentication
}

export const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const [formState, setFormState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
    isFormInvalid: true
  })
  useEffect(() => {
    validate('email')
  }, [formState.email])

  useEffect(() => {
    validate('password')
  }, [formState.password])

  const validate = (field: string): void => {
    const { email, password } = formState
    const formData = { email, password }
    setFormState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setFormState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()
      if (formState.isLoading || formState.isFormInvalid) return

      setFormState(old => ({ ...old, isLoading: true }))

      const account = await authentication.auth({ email: formState.email, password: formState.password })

      setCurrentAccount(account)

      history.replace('/')
    } catch (err) {
      setFormState(old => ({
        ...old,
        isLoading: false,
        mainError: err.message
      }))
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ formState, setFormState }}>
        <form data-testid="login-form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit-button" className={Styles.submit} disabled={formState.isFormInvalid} type="submit">Entrar</button>
          <Link to="/signup" data-testid="signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
