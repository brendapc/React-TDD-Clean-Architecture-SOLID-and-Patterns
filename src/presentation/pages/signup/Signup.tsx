import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, LoginHeader } from '@/presentation/components/layout'
import { Input, FormStatus, SubmitButton } from '@/presentation/components/utils'
import { IValidation } from '@/presentation/protocols/validation'
import Context from '../../contexts/form/FormContext'
import Styles from './signup-styles.scss'
import { IAddAccount } from '@/domain/useCases'
import { ApiContext } from '@/presentation/contexts'

type Props = {
  validation: IValidation
  addAccount: IAddAccount
}

export const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)

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

  useEffect(() => { validate('username') }, [formState.username])
  useEffect(() => { validate('email') }, [formState.email])
  useEffect(() => { validate('password') }, [formState.password])
  useEffect(() => { validate('passwordConfirmation') }, [formState.passwordConfirmation])

  const validate = (field: string): void => {
    const { username, email, password, passwordConfirmation } = formState
    const formData = { username, email, password, passwordConfirmation }
    setFormState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setFormState(old => ({ ...old, isFormInvalid: !!old.usernameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (formState.isLoading || formState.isFormInvalid) return
      setFormState(old => ({ ...old, isLoading: true }))
      const account = await addAccount.add({ username: formState.username, email: formState.email,password: formState.password, passwordConfirmation: formState.passwordConfirmation })

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
      <div className={Styles.signup}>
        <LoginHeader />
        <Context.Provider value={{ formState, setFormState }}>
          <form className={Styles.form} data-testid="login-form" onSubmit={handleSubmit} >
            <h2>Cadastro</h2>
            <Input type="text" name="username" placeholder="Digite seu nome" />
            <Input type="email" name="email" placeholder="Digite seu e-mail" />
            <Input type="password" name="password" placeholder="Digite sua senha" />
            <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
            <SubmitButton text="Cadastrar" />
            <Link data-testid="login-link" replace to="/login" className={Styles.link}>Voltar para login</Link>
            <FormStatus />
          </form>
        </Context.Provider>
        <Footer />
      </div>
  )
}
