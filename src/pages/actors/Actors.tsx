import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ListItemComponent } from "../../component";
import { Actor } from "../../sdk/models/Actor";
import { ActorService } from "../../services/ActorService";

const service = new ActorService();
const Actors = () => {
  const navigate = useNavigate();

  const [actorsData, setActorsData] = useState<Actor[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    service.getActors(search)
      .then(function (response: any) {
        setActorsData(response.data.data)

      })
      .catch(function (error: any) {
      })
  }, []);

  const showDetailsActor = (actorId: number) => {
    navigate("details-actor", { state: actorId });
  }

  const onDeleteActor = (actorId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your actor has been deleted.',
          'success'
        )
        service.deleteActor(actorId)
          .then(function (response) {
            setActorsData([
              ...actorsData.filter((element) => {
                return element.id !== actorId
              }),
            ]);
          })
          .catch(function (error) {
          });
      }
    })
  }
  document.title = "Home | MoviesApp";
  return (
    <div>
      <React.Fragment>
        <div className="container-fluid p-5">
          <h1 className="text-center">Actors</h1>
          <div className="d-flex mb-5 mt-5">
            <Formik
              initialValues={{
                search: '',
              }}
              onSubmit={(values) => {
                service.getActors(values.search)
                  .then(function (response: any) {
                    setActorsData(response.data.data)

                  })
                  .catch(function (error: any) {
                  })
              }}
            >
              {({ isSubmitting }) => (
                <div className="d-flex mb-5 mt-5">
                  <div className="me-auto ">
                    <Form >
                      <div className="form-group m-0">
                        <div className="input-group">
                          <Field
                            name="search"
                            type="text"
                            className="form-control"
                            placeholder="Search by name ..." />
                          <button
                            type="submit"

                            className="btn btn-primary rounded-0 rounded-end bi bi-search"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              )}
            </Formik>

            <div style={{ alignSelf: 'center', flex: 'auto' }} className="d-flex flex-row-reverse">
              <Link
                className="btn btn-primary btn-block"
                to="/add-actor"         >
                Add Actors
              </Link>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <div>
              {actorsData.map((element: any, index: any) => {
                return (
                  <div key={index}>
                    <ListItemComponent
                      name={element.firstName + " " + element.lastName}
                      description={element.biography}
                      id={element.id as number}
                      showDetails={showDetailsActor}
                      onDelete={onDeleteActor}
                      check={true} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default Actors;
