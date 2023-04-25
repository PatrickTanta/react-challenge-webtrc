import { ChangeEvent, useState } from 'react'

interface InitialStateType {
    question: string
}

export const useForm = (initialState = { question: '' }) => {
    const [values, setValues] = useState<InitialStateType>(initialState)

    const reset = () => {
        setValues(initialState)
    }

    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    return { values, handleInputChange, reset }
}
