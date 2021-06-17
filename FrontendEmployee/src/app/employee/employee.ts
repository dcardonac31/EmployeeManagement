export interface EmployeeDTO{
    id: number;
    idDocument : number;
    name: string;
    lastName: string;
    hiringDate: Date;
    position: string;
}

export interface EmployeeCreateDTO{
    idDocument : number;
    name: string;
    lastName: string;
    hiringDate: Date;
    position: string;
}