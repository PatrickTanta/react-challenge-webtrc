import { QuestionVideo } from '@/components/Question/QuestionVideo'
import { BaseLayout } from '@/components/layouts/Base'
import { AddQuestionInput } from '@/components/Question/AddQuestionInput'
import { useForm } from '@/hooks/useAddForm'
import { Question } from '@/interfaces'
import { useState, FormEventHandler } from 'react'

const INITIAL_QUESTION_LIST: Question[] = [
    {
        id: 0,
        text: 'Cual fue tu video juego favorito durante tu infancia?',
        recordedVideo: null
    },
    {
        id: 1,
        text: 'Cual fue tu serie favorita durante tu infancia?',
        recordedVideo: null
    }
]

export const HomePage = () => {
    const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTION_LIST)

    const onSearchSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setQuestions((prevState) => {
            return [
                ...prevState,
                {
                    id: questions.length,
                    text: values.question
                }
            ]
        })
    }

    const onSetQuestionVideo = (id: number, value: any) => {
        const questionsList = [...questions]
        const currentItem = questionsList.find((item) => item.id === id)
        if (currentItem) {
            currentItem.recordedVideo = value
            console.log('questionsList ', questionsList)
            setQuestions(questionsList)
        }
    }

    const { handleInputChange, values } = useForm({
        question: ''
    })

    return (
        <BaseLayout>
            <div className="flex flex-col justify-center px-2 py-5 sm:px-3">
                <div className="mb-5 flex justify-center sm:mb-10">
                    <h1 className="px-5 text-3xl sm:text-5xl">Video Cuestionario</h1>
                </div>

                <AddQuestionInput
                    placeholder="Escribe tu pregunta aquí"
                    name="question"
                    value={values.question}
                    onChange={handleInputChange}
                    onSearchSubmit={onSearchSubmit}
                />

                <div className="mt-10 flex flex-col flex-wrap justify-center gap-4 sm:flex-row">
                    {questions.map((question) => (
                        <QuestionVideo
                            key={question.id}
                            id={question.id}
                            text={question.text}
                            recordedVideo={question.recordedVideo}
                            onSetQuestionVideo={onSetQuestionVideo}
                        />
                    ))}
                </div>
            </div>
        </BaseLayout>
    )
}
