import { Envelope, Eye, Password } from 'phosphor-react'
import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import logoSvg from '../../assets/logo.svg'
import { Button } from '../../components/Button'
import { InputText } from '../../components/InputText'
import { AuthContext } from '../../context/authContext'
import { useOnError } from '../../hooks/useOnError'

export function LoginPage () {
  const navigate = useNavigate()
  const { Root, Icon, Input } = InputText

  const { login } = useContext(AuthContext)

  const formValues = useRef({
    username: '',
    password: ''
  })

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    login(formValues.current)
      .then(() => navigate('/'))
      .catch(err => useOnError(err))
  }

  return (
    <main className='bg-slate-900 h-screen flex justify-center items-center'>
      <div className='w-full max-w-2xl bg-slate-800 flex justify-around gap-4 items-center p-8 rounded-lg'>

        <div className='hidden sm:block'>
          <img src={logoSvg} alt="bot crypto logo" className='h-80' />
        </div>

        <form className='w-full h-full flex flex-col gap-4' onSubmit={handleSubmit}>
          <h1 className='text-4xl text-gray-300 font-russo mb-8 text-center'>BOTCRYPTO</h1>
          <Root >
            <Icon><Envelope weight='fill' /></Icon>
            <Input
              type='text'
              placeholder='Username'
              onChange={(e) => { formValues.current.username = e.target.value }}
            />
          </Root>

          <Root >
            <Icon><Password weight='fill' /></Icon>
            <Input
              type='password'
              placeholder='Password'
              onChange={(e) => { formValues.current.password = e.target.value }}
            />
            <Icon className='h-full flex items-center cursor-pointer px-4 text-xl text-violet-400'><Eye /></Icon>
          </Root>

          <div className='mt-4'>
            <Button type='submit' width='w-full'>Submit</Button>
          </div>
        </form>

      </div>
    </main>
  )
}
