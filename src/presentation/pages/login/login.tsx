import LoginHeader from '@/presentation/components/layout/loginHeader/LoginHeader'
import Footer from '@/presentation/components/layout/footer/Footer'
import React from 'react'
import Styles from './login-styles.scss'
import { Input } from '@/presentation/components/utils/input/Input'
import { FormStatus } from '@/presentation/components/utils/formStatus/FormStatus'

export const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}
