export interface IRecord { 
    _id?: string;
    patient_id: string;
    body_temperature: number;
    heart_rate: number;
}
export interface IPatient {
    _id?: string;
    patient_name: string;
    national_id: string;
    frequent_sickness: string;
}