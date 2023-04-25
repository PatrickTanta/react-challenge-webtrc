import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { ErrorPage } from '../pages/ErrorPage'
import { QuestionDetailPage } from '../pages/QuestionDetailPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/question/:id',
        element: <QuestionDetailPage />
    }
])
