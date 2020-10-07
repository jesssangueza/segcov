export class Patient {
    public Id: string;
    public FirstName: string;
    public MiddleName: string;
    public LastName: string;
    public Age: number;
    public Sex: string;
    public Type: string;
    public Telephone: string;
    public Created: Date;

    constructor(patient: Partial<any>) {
        Object.assign(this, patient);
    }
}
