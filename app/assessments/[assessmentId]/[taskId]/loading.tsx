import Header from '@/components/appshell/header/Header'
import Main from '@/components/appshell/main/Main'
import Footer from '@/components/appshell/footer/Footer'
import BackButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/BackButton'
import NextButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/NextButton'
import Spinner from '@/components/spinner/Spinner'
import SubmitButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/SubmitButton'

export default async function Loading() {
  return (
    <>
      <Header />
      <Main>
        <Spinner />
      </Main>
      <Footer>
        <BackButton previousPageUrl={undefined} disabled />
        <NextButton disabled />
        <SubmitButton disabled />
      </Footer>
    </>
  )
}
