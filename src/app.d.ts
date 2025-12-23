export {};

declare global {
    interface User {
        id: number;
        name: string;
        email: string;
    }

    interface Office {
        id: string;
        name: string;
        picName: string;
        picContact: string;
        rooms?: Room[];
    }

    interface Room {
        id: string;
        name: string;
        floor: string;
        code: string;
        officeId: string;
        office?: Office;
    }
}
