export interface History {
    Id: string;
    AbcgoalCalification: number;
    Treatment: string;
    Evolution: string;
    OtherTests: string;
    Symptoms: number[];
    Created: Date;
    PatientRef: any;
}

export interface HistoryViewModel extends History {
    Collapse: boolean;
    DescriptiveSymptoms: string [];
}

