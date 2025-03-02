import React from 'react'
import { LinkButton } from '../_components/ui/Buttons'
import Card from '../_components/cards/Card'
import { loginLink } from '../_utils/constants'

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