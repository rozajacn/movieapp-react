import { Field, Form, Formik } from "formik";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import moment from "moment";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { ActorService } from "../../services/ActorService";

const service = new ActorService();
const EditActor = () => {
    const navigate = useNavigate();
    const location = useLocation();

    document.title = "Edit Actor | MoviesApp";
    return (
        <div>
            <React.Fragment>
                <div className="container-fluid p-5">
                    <h1 className="text-center">Edit Actor</h1>
                    <div className="d-flex justify-content-center">
                        <Formik
                            initialValues={{
                                id: location.state.id,
                                firstName: location.state.firstName,
                                lastName: location.state.lastName,
                                dateOfBirth: moment(location.state.dateOfBirth.toString()).format('yyyy-MM-DD'),
                                biography: location.state.biography,
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    service.editActor(values)
                                        .then(function (response: any) {
                                            navigate('/details-actor', { state: location.state.id });
                                            toast.success(`You have create new actor ${values.firstName} ${values.lastName}!`);
                                        })
                                        .catch(function (error: any) {
                                        })
                                    setSubmitting(false);
                                }, 1000);
                            }}
                            validationSchema={Yup.object({
                                firstName: Yup.string()
                                    .required('First name is required*'),
                                lastName: Yup.string()
                                    .required('Last name is required*'),
                                biography: Yup.string()
                                    .required('Biography is required*'),
                            })}
                        >
                            {({ touched, errors, isSubmitting }) => (
                                <Form className="w-50" >
                                    <div className="form-group py-2">
                                        <label htmlFor="firstName">First Name: </label>
                                        <Field
                                            id="firstName"
                                            name="firstName"
                                            className="form-control mt-1"
                                            type="text" />
                                        {touched.firstName && errors.firstName && <div className="text-danger"><>{errors.firstName}</></div>}
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="lastName">Last Name: </label>
                                        <Field
                                            id="lastName"
                                            name="lastName"
                                            className="form-control mt-1"
                                            type="text" />
                                        {touched.lastName && errors.lastName && <div className="text-danger"><>{errors.lastName}</></div>}
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="dateOfBirth">Date Of Birth: </label>
                                        <Field
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            className="form-control mt-1"
                                            type="date" />
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="biography">Biography:</label>
                                        <Field
                                            id="biography"
                                            name="biography"
                                            className="form-control mt-1"
                                            as="textarea" />
                                        {touched.biography && errors.biography && <div className="text-danger"><>{errors.biography}</></div>}
                                    </div>

                                    <div className="d-flex flex-row-reverse py-3">
                                        <div className="p-1">
                                            <button type="submit"
                                                className="btn btn-primary"
                                                disabled={isSubmitting}>
                                                {isSubmitting ? "Please wait..." : "Edit"}
                                            </button>
                                        </div>
                                        <div className="p-1">
                                            <button
                                                className="btn btn-secondary btn-block"
                                                onClick={() => navigate("/details-actor", { state: location.state.id })}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                </div>
            </React.Fragment>
        </div>
    );
};

export default EditActor;
