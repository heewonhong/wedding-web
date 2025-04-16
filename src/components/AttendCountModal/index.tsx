import { Wedding } from '@models/wedding'
import { useModalContext } from '@contexts/ModalContext'
import { useEffect, useRef, useState } from 'react'

function AttendCountModal({ wedding }: { wedding: Wedding }) {
  const { open, close } = useModalContext()

  const $input = useRef<HTMLInputElement>(null)

  const haveSeenModal = localStorage.getItem('@have-seen-modal')
  const [currentWedding, setCurrentWedding] = useState(wedding)

  useEffect(() => {
    if (haveSeenModal === 'true') {
      return
    }

    open({
      title: `현재 참석자: ${currentWedding.attendCount} 명`,
      body: (
        <div>
          <input
            ref={$input}
            placeholder="참석 가능 인원을 추가해주세요"
            style={{ width: '100%' }}
            type="number"
          />
        </div>
      ),
      onLeftButtonClick: () => {
        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
      onRightButtonClick: async () => {
        if ($input.current == null) {
          return
        }

        const updatedWedding = await fetch(
          'https://67ff4bd658f18d7209f0a126.mockapi.io/api/wedding/guests/1',
          {
            method: 'PUT',
            body: JSON.stringify({
              ...currentWedding,
              attendCount:
                currentWedding.attendCount + Number($input.current.value),
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ).then((res) => res.json())

        setCurrentWedding(updatedWedding)
        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
    })
  }, [open, close, currentWedding, haveSeenModal])

  return null
}

export default AttendCountModal
