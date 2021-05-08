import LoginHeader from '@/presentation/components/layout/loginHeader/LoginHeader'
import Footer from '@/presentation/components/layout/footer/Footer'
import { Spinner } from '@/presentation/components/layout/spinner/Spinner'
import React from 'react'
import Styles from './login-styles.scss'

export const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrapper}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={Styles.status}>❗</span>
        </div>
        <div className={Styles.inputWrapper}>
          <input type="password" name="password" placeholder="Digite sua senha" />
          <span className={Styles.status}>❗</span>
        </div>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrapper}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}> error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}
