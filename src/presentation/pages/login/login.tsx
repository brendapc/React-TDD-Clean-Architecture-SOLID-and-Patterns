import React, { useState } from 'react'
import { Footer, LoginHeader } from '@/presentation/components/layout'
import { Input, FormStatus } from '@/presentation/components/utils'
import Styles from './login-styles.scss'
import Context from '../../contexts/form/FormContext'

export const Login: React.FC = () => {
  const [formState] = useState({
    isLoading: false
  })
  const [errorState] = useState({
    email: 'Campo Obrigatório',
    password: 'Campo Obrigatório',
    main: ''
  })
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ formState, errorState }}>
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
