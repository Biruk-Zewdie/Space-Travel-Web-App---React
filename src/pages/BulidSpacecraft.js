import React, { useState, useContext } from "react";
import styles from "./BuildSpacecraft.module.css"
import SpaceTravelApi from "../services/SpaceTravelApi"
import { useNavigate } from "react-router-dom";
import LoadingContext from "../context/LoadingContext";
import ErrorMessage from "../components/ErrorMessage";

const BuildSpacecraft = () => {
    const initialState = {
        name: "",
        capacity: "",
        description: "",
        pictureUrl: ""
    }

    const [formData, setFormData] = useState(initialState)
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const { enableLoading, disableLoading } = useContext(LoadingContext)

/*======================================== Handle Submission of Form and Alert Wrong Input Submission=======================================================*/

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const { name, capacity, description, pictureUrl } = formData;

        //Setting errors to null when resetting the errors for new form submission.
        let isFormError = false;
        setErrors([])

        //Check if the name of the spacecraft is filled or left empty  
        if (name.length === 0) {
            isFormError = true;
            setErrors(errors => ([...errors, { blank_spacecraft_name_error: "What is the name of the spaceCraft?" }]))
        }

        //Check the capacity of the spacecraft is filled or left empty.
        if (capacity.length === 0) {
            isFormError = true
            setErrors(errors => ([...errors, { blank_spacecraft_capacity_error: "How many peoples can the spacecraft carry?" }]))
        }
        // The capacity from the input should be converted from string to integer for addition and subtruction with current population.
        const Capacity = Number(capacity)
        if (!Number.isInteger(Capacity)) {
            isFormError = true;
            setErrors(errors => ([...errors, { capacity_not_integer: "Capacity should be an integer number" }]))
        }
    
        // Check the description input field of the spacecraft left empty and inform the user.
        if (description.length === 0) {
            isFormError = true;
            setErrors(errors => ([...errors, { blank_spacecraft_description_error: "We need some information about the spacecraft we use. Can you tell us?" }]))
        }
        // If there is no error in the input field, it will build a spacecraft using the inputs in  the input fields.

        if (!isFormError) {
            enableLoading()
            const { isError } = await SpaceTravelApi.buildSpacecraft({ name, capacity, description, pictureUrl })
            if (!isError) {
                setFormData(initialState)
            }
            disableLoading()
        }
    }
/*======================================== Handle Change in Input Field =======================================================*/

    const handleChangeOfInputField = (event) => {
        const { name, value } = event.target
        setFormData((formData) => ({ ...formData, [name]: value }))
    }

    const handleBackButtonClick = () => {
        navigate(-1)

    }

    return (
        <div >
            <button className={styles['back_button']} onClick={handleBackButtonClick}>Back 👈🏽</button>
            <form onSubmit={handleFormSubmit} >
                <div className={styles['spacecraft_build_form']}>
                    <input
                        className={styles['spacecraft_name']}
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChangeOfInputField}
                    />
                    <ErrorMessage errors= {errors} fieldName="blank_spacecraft_name_error"/>
                    
                    <input
                        type="text"
                        name="capacity"
                        placeholder="Capacity"
                        value={formData.capacity}
                        onChange={handleChangeOfInputField}
                    />
                     <ErrorMessage errors= {errors} fieldName="blank_spacecraft_capacity_error"/>
                     <ErrorMessage  errors= {errors} fieldName="capacity_not_integer"/>


                    <textarea
                        className={styles['textarea']}
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChangeOfInputField}
                    />
                     <ErrorMessage errors= {errors} fieldName="blank_spacecraft_description_error"/>
                    <input
                        className={styles['pictureUrl']}
                        type="url"
                        name="pictureUrl"
                        placeholder="Picture Url"
                        value={formData.pictureUrl}
                        onChange={handleChangeOfInputField}
                    />
                </div>
                <div className={styles['build_button']} >
                    <button type="submit">Build</button>
                </div>
            </form>
        </div>
    )
}

export default BuildSpacecraft