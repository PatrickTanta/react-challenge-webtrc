import { FC, ChangeEvent, FormEventHandler } from 'react'
interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    name: string
    value?: string
    onSearchSubmit: FormEventHandler<HTMLFormElement>
}

export const AddQuestionInput: FC<Props> = ({ onChange, name, placeholder, value = '', onSearchSubmit }) => {
    return (
        <form className="w-full lg:flex lg:w-auto" onSubmit={onSearchSubmit}>
            <div className="text-sm lg:flex-grow">
                <div className="relative">
                    <input
                        type="text"
                        name={name}
                        maxLength={50}
                        placeholder={placeholder}
                        className="block w-full rounded-lg border-2 border-gray-200 bg-white py-2 pl-4 pr-4 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={value}
                        onChange={onChange}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                </div>
            </div>
            <div>
                <button className="mt-4 inline-block rounded border border-transparent border-white px-4 py-2 text-sm leading-none text-indigo-500 lg:mt-0">
                    Pregunta
                </button>
            </div>
        </form>
    )
}
