import { FloppyDisk, Link, LockKeyOpen, Password, User } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { Box } from '../../components/Box'
import { Button } from '../../components/Button'
import { InputText } from '../../components/InputText'
import { getInfos, updateInfos } from '../../services/api.servives'

interface FieldsValues {
  id: string
  username: string
  password?: string
  confirmPas?: string
  apiURL?: string
  streamURL?: string
  accessKey?: string
  secretKey?: string
}

export function SettingsPage () {
  const [formValues, setFormValues] = useState<FieldsValues>({} as FieldsValues)

  async function handleSubmit (event: React.FormEvent) {
    event.preventDefault()

    console.log(formValues)

    const response = await updateInfos(formValues)

    setFormValues({ ...response.data })
  }

  useEffect(() => {
    getInfos()
      .then(response => { setFormValues({ ...response.data }) })
      .catch(err => console.error(err))
  }, [])

  return (
    <main className='px-8 w-full h-full flex flex-col gap-8 overflow-auto'>
      <Box mt='md' size='sm'>
        <h1 className='text-xl'>Settings</h1>
      </Box>

      <Box>
        <form className='w-full flex flex-col gap-6' onSubmit={handleSubmit}>
          <h2 className='text-2xl' >General Info</h2>
          <div className='w-full'>
            <div className='mb-1'>Username</div>
            <InputText.Root>
              <InputText.Icon>
                <User />
              </InputText.Icon>
              <InputText.Input defaultValue={formValues.username} type={'text'} placeholder='Username' disabled />
            </InputText.Root>
          </div>

          <div className='w-full flex gap-4'>
            <div className='w-full'>
              <div className='mb-1'>New Password</div>
              <InputText.Root >
                <InputText.Icon>
                  <Password />
                </InputText.Icon>
                <InputText.Input
                  type={'password'}
                  placeholder='Enter your new password'
                  onChange={(e) => setFormValues((state) => { return { ...state, password: e.target.value } })}
                />
              </InputText.Root>
            </div>

            <div className='w-full'>
              <div className='mb-1'>Confirm Password</div>
              <InputText.Root>
                <InputText.Icon>
                  <Password />
                </InputText.Icon>
                <InputText.Input
                  type={'password'}
                  placeholder='Your new password again'
                  onChange={(e) => setFormValues((state) => { return { ...state, confirmPas: e.target.value } })}
                />
              </InputText.Root>
            </div>
          </div>

          <h2 className='text-2xl'>Exchange Info</h2>

          <div className='w-full'>
            <div className='mb-1'>API URL</div>
            <InputText.Root>
              <InputText.Icon>
                <Link />
              </InputText.Icon>
              <InputText.Input
                defaultValue={formValues.apiURL}
                type={'text'}
                placeholder='https://testnet.binance.vision/api'
                onChange={(e) => setFormValues((state) => { return { ...state, apiURL: e.target.value } })}
              />
            </InputText.Root>
          </div>

          <div className='w-full'>
            <div className='mb-1'>STREAM URL</div>
            <InputText.Root>
              <InputText.Icon>
                <Link />
              </InputText.Icon>
              <InputText.Input
                defaultValue={formValues.streamURL}
                type={'text'}
                placeholder='wss://testnet.binance.vision/ws'
                onChange={(e) => setFormValues((state) => { return { ...state, streamURL: e.target.value } })}
              />
            </InputText.Root>
          </div>

          <div className='w-full'>
            <div className='mb-1'>Access Key</div>
            <InputText.Root>
              <InputText.Icon>
                <LockKeyOpen />
              </InputText.Icon>
              <InputText.Input
                defaultValue={formValues.accessKey}
                type={'text'}
                placeholder='123yz'
                onChange={(e) => setFormValues((state) => { return { ...state, accessKey: e.target.value } })}
              />
            </InputText.Root>
          </div>

          <div className='w-full'>
            <div className='mb-1'>Secret Key</div>
            <InputText.Root>
              <InputText.Icon>
                <Password />
              </InputText.Icon>
              <InputText.Input
                type={'password'}
                placeholder='*****'
                onChange={(e) => setFormValues((state) => { return { ...state, secretKey: e.target.value } })}
              />
            </InputText.Root>
          </div>

          <Button type='submit' width='w-fit'>
            <span> Save</span>
            <FloppyDisk size={20} weight={'fill'} />
          </Button>
        </form>
      </Box>
    </main>
  )
}
