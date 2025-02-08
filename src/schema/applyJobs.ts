import * as yup from "yup";

export const applyJobsSchema = yup.object().shape({
  questionnaire: yup.array().of(
    yup.object().shape({
      // descriptive: yup.string()
      //   .required('descriptive is required'),
      // multipleChoice: yup.string()
      //   .required('multiple choice is required'),
      // singleChoice: yup.string()
      //   .required('single choice is required'),
      // numberChoice: yup.string()
      //   .required('single choice is required'),
    })
  ).optional()

}).required();

export const SaveJobsSchema = yup.object().shape({


}).required();