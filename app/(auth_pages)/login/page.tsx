import Card from '@/app/_components/cards/Card'
import { LinkButton } from '@/app/_components/ui/Buttons'
import { loginLink } from '@/app/_utils/constants'
import React from 'react'

function LoginPage() {
  return (
    <div>
        <Card>
            <p>You will be redirected to the AWS Login Page</p>
            <LinkButton href={loginLink}>Log In</LinkButton>
        </Card>
    </div>
  )
}

export default LoginPage