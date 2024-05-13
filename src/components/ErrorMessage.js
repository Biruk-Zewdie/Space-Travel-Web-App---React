import React from "react"
import styles from "./ErrorMessage.module.css"

// Error Message component informs the user error message, when the user fills the form wrong 
//inputs or if blank input fields are left during building spacecraft.

const ErrorMessage = ({ errors, fieldName }) => {
    return (

        errors.map((error, index) => (error[fieldName] &&
            <div className={styles['error_message']} key={index}>
                {error[fieldName]}
            </div>))

    )

}

export default ErrorMessage;