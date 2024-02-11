import React from "react";

export interface ListItemComponentProps {
    name: string;
    description: string;
    id: number;
    showDetails?: (id: number) => void;
    onDelete?: (id: number) => void;
    check?: boolean;
}

export const ListItemComponent: React.FC<ListItemComponentProps> = ({
    name,
    description,
    id,
    showDetails,
    onDelete,
    check
}) => {
    const details = () => {
        if (showDetails) showDetails(id as number);
    };
    const ondelete = () => {
        if (onDelete) onDelete(id as number);
    };
    return (
        <React.Fragment >
            <div className="row p-3">
                <div className="col-8">
                    <div className="row h3">
                        {name}
                    </div>
                    <div className="row">
                        {description}
                    </div>
                </div>
                <div className="col-4" style={{ textAlign: "end", alignSelf: "center" }}>
                    <button type="button" className="btn btn-secondary mx-2" onClick={details}>Details</button>
                    {check === true ?
                        <button type="button" className="btn btn-danger mx-2" onClick={ondelete}>Delete</button>
                        : <></>}
                </div>


            </div>
        </React.Fragment>
    );
}
