import fs from "fs";
import path from "path";
import { JobDescription, SalaryRecord, JobListing } from "./types";

export function loadJobListings(): JobListing[] {
  // 1. read + parse job descriptions
  const jobsPath = path.join(process.cwd(), "data", "job-descriptions.json");
  const jobs: JobDescription[] = JSON.parse(fs.readFileSync(jobsPath, "utf-8"));

  // 2. read + parse salaries
  const salariesPath = path.join(process.cwd(), "data", "salaries.json");
  const salaries: SalaryRecord[] = JSON.parse(
    fs.readFileSync(salariesPath, "utf-8")
  );

  // 3. join them - for each job, find its matching salary record
  return jobs.map((job) => {
    const salaryRecord = salaries.find(
      (s) => s.Jurisdiction === job.jurisdiction && s["Job Code"] === job.code
    );

    // 4. filter empty salary grades
    const salaryGrades = salaryRecord
      ? Object.values(salaryRecord).filter(
          (v) => typeof v === "string" && v.trim() !== "" && v.startsWith("$")
        )
      : [];

    return {
      jurisdiction: job.jurisdiction,
      code: job.code,
      title: job.title,
      description: job.description,
      salaryGrades,
    };
  });
}
