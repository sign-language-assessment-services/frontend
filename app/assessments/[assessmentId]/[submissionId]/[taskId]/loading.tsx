import Main from '@/components/appshell/main/Main'
import Footer from '@/components/appshell/footer/Footer'
import Spinner from '@/components/spinner/Spinner'

export default function Loading() {
  return (
    <>
      <Main>
        <Spinner />
      </Main>
      <Footer></Footer>
    </>
  )
}
