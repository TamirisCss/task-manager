import './AddTaskDialog.css'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [errors, setErrors] = useState([])

  const nodeRef = useRef()
  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      setErrors([])
    }
  }, [isOpen])

  const handleSaveClick = () => {
    const newErrors = []

    const title = titleRef.current.value
    const time = timeRef.current.value
    const description = descriptionRef.current.value

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório.',
      })
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório.',
      })
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória.',
      })
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    })
    handleClose()
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-brand-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="text-brand-text-gray mb-4 mt-1 text-sm">
                Insira as Informações abaixo
              </p>
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                />
                <TimeSelect errorMessage={timeError?.message} ref={timeRef} />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                />
              </div>
              <div className="mt-3 flex gap-3">
                <Button
                  size="large"
                  className="w-full"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  size="large"
                  className="w-full"
                  onClick={handleSaveClick}
                >
                  Salvar
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
