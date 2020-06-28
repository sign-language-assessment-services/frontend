import axios, { AxiosResponse } from 'axios'
import { HelloWorldResponse } from './types'

export const getHelloWorldMessage = async (): Promise<string> => {
  const response: AxiosResponse<HelloWorldResponse> = await axios.get('/api/')
  return response.data.msg
}
