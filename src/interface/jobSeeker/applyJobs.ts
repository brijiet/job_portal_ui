export interface IFormApplyJobs {
  questionnaire?: { question?: string | undefined, questionType?: string | undefined, multipleChoice?: string[] | undefined, singleChoice?: string | undefined, descriptive?: string | undefined, numberChoice?: string | undefined }[] | undefined


}

export interface IFormApplyJobsWithoutQuestionnaire {
  questionnaire?: { user: number, jobs: number, question?: string | undefined, questionType?: string | undefined, multipleChoice?: string[] | undefined, singleChoice?: string | undefined, descriptive?: string | undefined, numberChoice?: string | undefined }[] | undefined


}

export interface IFormSaveJobs {
  questionnaire?: {}[] | undefined
}


export interface IFormApplyJobsPost {

}
