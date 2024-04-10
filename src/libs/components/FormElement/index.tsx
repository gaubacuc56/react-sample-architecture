import { CommonProps } from '@app-core/@types/common'

export const FormError = (props: CommonProps ) => {
  return (
    <p className='text-sm text-red-500 mt-2 font-medium'>{props.children}</p>
  )
}

interface IFormLabel {
  htmlFor?: string
}
export const FormLabel = (props: CommonProps & IFormLabel) => {
  return (
    <label htmlFor={props.htmlFor} className='text-sm font-medium text-gray-900 dark:text-white'>{props.children}</label>
  )
}