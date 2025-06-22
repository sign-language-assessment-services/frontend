import Header from '@/components/appshell/header/Header'
import Main from '@/components/appshell/main/Main'
import Footer from '@/components/appshell/footer/Footer'
import Spinner from '@/components/spinner/Spinner'

export default async function Loading() {
  return (
    <>
      <Header />
      <Main>
        <Spinner />
      </Main>
      <Footer></Footer>
    </>
  )
}
