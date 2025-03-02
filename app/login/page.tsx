import React from 'react'
import { LinkButton } from '../_components/ui/Buttons'
import Card from '../_components/cards/Card'

function LoginPage() {
  return (
    <div>
        <Card>
            <p>You will be redirected to the AWS Login Page</p>
            <LinkButton href='https://auth.platelette.com/login?client_id=27a4hidci87i37h6ufhdg5mo4&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http%3A%2F%2Flocalhost:3000%2Fauth-callback'>Log In</LinkButton>
        </Card>
    </div>
  )
}

export default LoginPage