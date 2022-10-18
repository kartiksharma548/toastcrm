import React from 'react'

// @ts-ignore
export default function Alert(props) {
    return (
       props.alert && <div className={`alert alert-${props.alert.type} fade show`} role="alert">
            <strong>{props.alert.message}</strong>. 
        </div>
    )
}
