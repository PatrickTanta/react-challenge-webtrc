import { QuestionVideo } from '../components/Question/QuestionVideo'
import { ArrowBackIcon } from '../components/icons/ArrowBackIcon'
import { BaseLayout } from '../components/layouts/Base'
export const QuestionDetailPage = () => {
    return (
        <BaseLayout>
            <div className="place flex flex-col justify-center px-3 py-4">
                <div className="mb-2">
                    <a href="/" className="align-center mb-2 mt-auto flex">
                        <ArrowBackIcon />
                        <p className="mb-0 ml-2 mt-[-4px] flex">Volver</p>
                    </a>
                </div>

                <QuestionVideo text={'sdasd'} isDetail={true} />

                <div className="mt-10 flex justify-between">
                    <a className="text-sm font-normal" href="/question/1">
                        Atrás
                    </a>
                    <a className="text-sm font-normal" href="/question/1">
                        Siguiente
                    </a>
                </div>
            </div>
        </BaseLayout>
    )
}
