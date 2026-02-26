
export interface JobDescription {
    jurisdiction: string
    code: string
    title: string
    description: string
} 

export interface SalaryRecord {
    salaryGrades: string[]
    jurisdiction: string
    jobCode: string
}