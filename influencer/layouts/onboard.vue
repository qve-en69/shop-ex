<template>
  <div class='position'>
    <LoginContainer/>
    <ErrorContainer/>
    <HeaderOnBoard/>
    <nuxt />
    <ClipperModalContainer/>
    <Footer>
      <Logo/>
    </Footer>
  </div>
</template>

<script>
import Logo from 'common/components/ui/Logo'
import Footer from 'common/components/ui/Footer'
import HeaderOnBoard from '~/components/HeaderOnBoard'
import ClipperModalContainer from '~/containers/ui/ClipperModalContainer'
import LoginContainer from '@/containers/auth/LoginContainer'
import ErrorContainer from '@/containers/error/ErrorContainer'
export default {
  name: 'onboard',
  components: {
    LoginContainer,
    ErrorContainer,
    Logo,
    Footer,
    ClipperModalContainer,
    HeaderOnBoard
  }
}
</script>

<style scoped>
.position{
  position: relative;
}
</style>
