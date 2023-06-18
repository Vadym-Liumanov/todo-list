import React, { useState, ChangeEvent, KeyboardEvent } from "react"

import styles from './AddItemForm.module.css'

type PropsType = {
    addItem: (itemTitle: string) => void
    placeholder: string
}

function AddItemForm({ placeholder, addItem }: PropsType) {
    const [itemTitle, setItemTitle] = useState<string>("")
    const [itemError, setItemError] = useState<string | null>(null)

    function onItemTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setItemTitle(e.target.value)
        setItemError(null)
    }

    function onAddItemClick() {
        if (itemTitle.trim() !== "") {
            addItem(itemTitle.trim())
            setItemTitle("")
            setItemError(null)
        }
        else {
            setItemError('Field is required')
        }
    }

    function onCtrlEnterKeyUp(e: KeyboardEvent) {
        if (e.ctrlKey && e.code === 'Enter') {
            onAddItemClick()
        }
    }

    return (
        <div className={styles.form}>
            <input
                type="text"
                placeholder={placeholder}
                className={itemError ? styles.titleInput_error : styles.titleInput}
                value={itemTitle}
                onChange={onItemTitleChange}
                onKeyUp={onCtrlEnterKeyUp}
            />
            <button
                className={styles.addBtn}
                onClick={onAddItemClick}
            >+</button>

            {itemError &&
                <div className={styles.errorMsg}>{itemError}</div>
            }
        </div>
    )
}

export default AddItemForm