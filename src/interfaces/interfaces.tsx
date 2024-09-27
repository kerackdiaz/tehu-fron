export interface UserData {
    email: string;
    password: string;
    chekData: boolean;
}

export interface User {
    userID: string;
    password: string;
}

export interface FormLoginSectionOneProps {
    setSectionNetx: (value: boolean) => void;
    setUserEmail: (value: string) => void;
}

export interface Register {
    //id: number;
    company: string;
    name: string;
    position: string;
    phone: string;
    email: string;
    password: string;
    rolId: string;
    //rol: string;
    authenticated: boolean;
    identificationNumber: string;
}
export interface RegisterInfo {
    id: number;
    company: string;
    name: string;
    position: string;
    phone: string;
    email: string;
    password: string;
    rolId: string;
    rol: string;
    identificationNumber: string;
}
 export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
  }  