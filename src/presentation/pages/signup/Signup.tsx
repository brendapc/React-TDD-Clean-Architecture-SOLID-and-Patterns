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
    setFormState({
      ...formState,
      usernameError: validation.validate('username', formState.username),
      emailError: validation.validate('email', formState.email),
      passwordError: validation.validate('password', formState.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', formState.passwordConfirmation)
    })
  }, [formState.username, formState.email, formState.password, formState.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (formState.isLoading || formState.usernameError || formState.emailError || formState.passwordError || formState.passwordConfirmationError) return
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
            <button className={Styles.submit} data-testid="submit-button" disabled={!!formState.usernameError || !!formState.emailError || !!formState.passwordError || !!formState.passwordConfirmationError}>Entrar</button>
            <Link data-testid="login" to="/login" className={Styles.link}>Voltar para login</Link>
            <FormStatus />
          </form>
        </Context.Provider>
        <Footer />
      </div>
  )
}
