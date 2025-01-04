import { Header } from '@/components/layout/header/Header'
import { Main } from '@/components/layout/Main'
import { Footer } from '@/components/layout/Footer'
import BackButton from '@/app/assessments/[assessmentId]/[taskId]/BackButton'
import NextButton from '@/app/assessments/[assessmentId]/[taskId]/NextButton'
import CancelButton from '@/app/assessments/[assessmentId]/[taskId]/CancelButton'
import { LoadingIndicator } from '@/components/LoadingIndicator'

export default async function Loading() {
  return (
    <>
      <Header />
      <Main>
        <LoadingIndicator />
      </Main>
      <Footer>
        <BackButton previousPageUrl={undefined} disabled />
        <NextButton disabled />
        <CancelButton disabled />
      </Footer>
    </>
  )
}
