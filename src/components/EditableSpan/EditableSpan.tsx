import React, { ChangeEvent, useState } from "react"

type PropsType = {
    title: string
    updateSpan: (title: string) => void
}

function EditableSpan({ title, updateSpan }: PropsType) {
    const [editMode, setEditMode] = useState(false)
    const [spanValue, setSpanValue] = useState('')

    function goToEditMode() {
        setSpanValue(title)
        setEditMode(true)
    }

    function goToVisibleMode() {
        setEditMode(false)
        if (spanValue.trim()) {
            updateSpan(spanValue.trim())
        }
    }

    function onSpanValueChange(e: ChangeEvent<HTMLInputElement>) {
        setSpanValue(e.target.value)
    }

    return (
        <>
            {!editMode &&
                <span onDoubleClick={goToEditMode}>{title}</span>
            }
            {editMode &&
                <input
                    type="text"
                    value={spanValue}
                    autoFocus
                    onChange={onSpanValueChange}
                    onBlur={goToVisibleMode}
                />
            }
        </>
    )
}

export default EditableSpan
