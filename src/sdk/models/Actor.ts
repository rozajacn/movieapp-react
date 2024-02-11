export interface Actor {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    biography: string;
}

export const getActorInitialValue =
    (): Actor => {
        return {
            id: 0,
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            biography: ""
        }
    }