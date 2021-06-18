import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/FormContext'

type Props = {
  text: string
}

export const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { formState } = useContext(Context)
  return (
        <button data-testid="submit-button" type="submit" disabled={formState.isFormInvalid}>
            {text}
        </button>
  )
}
