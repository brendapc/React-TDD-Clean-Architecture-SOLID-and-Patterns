import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, LoginHeader } from '@/presentation/components/layout'
import { Input, FormStatus } from '@/presentation/components/utils'
import Context from '../../contexts/form/FormContext'
import Styles from './signup-styles.scss'

export const Signup: React.FC = () => {
  const [formState] = useState({
    isLoading: false,
    usernameError: 'Campo Obrigatório',
    emailError: 'Campo Obrigatório',
    passwordError: 'Campo Obrigatório',
    passwordConfirmationError: 'Campo Obrigatório',
    mainError: ''
  })

  return (
      <div className={Styles.signup}>
        <LoginHeader />
        <Context.Provider value={{ formState }}>
          <form className={Styles.form} >
            <h2>Cadastro</h2>
            <Input type="text" name="username" placeholder="Digite seu nome" />
            <Input type="email" name="email" placeholder="Digite seu e-mail" />
            <Input type="password" name="password" placeholder="Digite sua senha" />
            <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
            <button className={Styles.submit} data-testid="submit-button" disabled>Entrar</button>
            <Link to="/login" className={Styles.link}>Voltar para login</Link>
            <FormStatus />
          </form>
        </Context.Provider>
        <Footer />
      </div>
  )
}
