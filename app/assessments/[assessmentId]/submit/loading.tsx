import Header from '@/components/appshell/header/Header'
import Main from '@/components/appshell/main/Main'
import Footer from '@/components/appshell/footer/Footer'
import BackButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/BackButton'
import CancelButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/CancelButton'
import Spinner from '@/components/spinner/Spinner'
import SubmitButton from '@/app/assessments/[assessmentId]/submit/_components/SubmitButton'

export default async function Loading() {
  return (
    <>
      <Header />
      <Main>
        <Spinner />
      </Main>
      <Footer>
        <BackButton previousPageUrl={undefined} disabled />
        <SubmitButton formId="" disabled />
        <CancelButton disabled />
      </Footer>
    </>
  )
}
