
export interface JobDescription {
    jurisdiction: string
    code: string
    title: string
    description: string
} 

export interface SalaryRecord {
    Jurisdiction: string
    "Job Code": string
    [key: string]: string
}

export interface JobListing {
    jurisdiction: string
    code: string
    title: string
    description: string
    salaryGrades: string[]
}