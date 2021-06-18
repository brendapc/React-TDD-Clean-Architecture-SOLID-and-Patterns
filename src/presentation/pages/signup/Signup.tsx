import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, LoginHeader } from '@/presentation/components/layout'
import { Input, FormStatus } from '@/presentation/components/utils'
import { IValidation } from '@/presentation/protocols/validation'
import Context from '../../contexts/form/FormContext'
import Styles from './signup-styles.scss'
import { IAddAccount, ISaveAccessToken } from '@/domain/useCases'

type Props = {
  validation: IValidation
  addAccount: IAddAccount
  saveAccessToken: ISaveAccessToken
}

export const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
  const [formState , setFormState] = useState({
    isLoading: false,
    isFormInvalid: true,
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    usernameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: 'Campo Obrigatório',
    mainError: ''
  })

  useEffect(() => {
    const usernameError = validation.validate('username', formState.username)
    const emailError = validation.validate('email', formState.email)
    const passwordError = validation.validate('password', formState.password)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formState.passwordConfirmation)

    setFormState({
      ...formState,
      usernameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!usernameError || !!emailError || !!passwordError || !!passwordConfirmationError
    })
  }, [formState.username, formState.email, formState.password, formState.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (formState.isLoading || formState.isFormInvalid) return
      setFormState({ ...formState, isLoading: true })
      const account = await addAccount.add({ username: formState.username, email: formState.email,password: formState.password,passwordConfirmation: formState.passwordConfirmation })

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
      <div className={Styles.signup}>
        <LoginHeader />
        <Context.Provider value={{ formState, setFormState }}>
          <form className={Styles.form} data-testid="login-form" onSubmit={handleSubmit} >
            <h2>Cadastro</h2>
            <Input type="text" name="username" placeholder="Digite seu nome" />
            <Input type="email" name="email" placeholder="Digite seu e-mail" />
            <Input type="password" name="password" placeholder="Digite sua senha" />
            <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
            <button className={Styles.submit} data-testid="submit-button" disabled={formState.isFormInvalid}>Entrar</button>
            <Link data-testid="login-link" replace to="/login" className={Styles.link}>Voltar para login</Link>
            <FormStatus />
          </form>
        </Context.Provider>
        <Footer />
      </div>
  )
}
