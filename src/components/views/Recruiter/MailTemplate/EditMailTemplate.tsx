import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  getCurrencyList,
  getKeySkillsList,
  getLocationList,
  getNumberSystemList,
  getSalaryRangeList,
  getTotalYearsExpList,
} from "../../../utils/utils";
import AutocompleteBox from "../../../commonComponents/AutocompleteBox";

interface IFormInputs {
  templateName: string | null;
  fromEmailId: string | null;
  mailSubject: string | null;
  jobTitle: string | null;
  fromWorkExperience: { value: string; label: string };
  toWorkExperience: { value: string; label: string };
  message: string | null;
  signature: string | null;
}

const UpdateMailTemplateSchema = yup
  .object({
    fromEmailId: yup.string().label("From Email Id").required().nullable(),
    templateName: yup.string().label("Template Name").required().nullable(),
    mailSubject: yup.string().label("Mail Subject").required().nullable(),
    jobTitle: yup.string().label("Job Title").required().nullable(),
    jobLocation: yup
      .array()
      .required("Job Location is a required field")
      .min(1, "Please select a Job Location"),
    keySkills: yup
      .array()
      .required("Key Skills is a required field")
      .min(1, "Please select a Key Skills"),
    message: yup.string().label("Message").required().nullable(),
    signature: yup.string().label("Signature").required().nullable(),
  })
  .required();

const EditMailTemplate = ({
  data,
  setmailTemplateHeading,
  closeDialog,
  setData,
}: any) => {
  const selectedJobsLocation: any = [];
  const [totalExpYear, setTotalExpYear] = useState<any>([]);
  const [currency, setCurrency] = useState<any>([]);
  const [salaryRange, setSalaryRange] = useState<any>([]);
  const [numberSystem, setNumberSystem] = useState<any>([]);
  const [location, setLocation] = useState<any>([]);
  const [keySkills, setKeySkills] = useState<any>([]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInputs | any>({
    resolver: yupResolver(UpdateMailTemplateSchema),
  });
  const onSubmit = (submitData: any) => {
    setmailTemplateHeading("Preview & Create Mail Template");
    setData(submitData);
  };
  useEffect(() => {
    (async () => {
      const totalExpYearList = await getTotalYearsExpList();
      if (Object.keys(totalExpYearList)?.length) {
        setTotalExpYear(totalExpYearList as any);
      }

      const salaryRangeList = await getSalaryRangeList();
      if (Object.keys(salaryRangeList)?.length) {
        setSalaryRange(salaryRangeList as any);
      }

      const numberSystemList = await getNumberSystemList();
      if (Object.keys(numberSystemList)?.length) {
        setNumberSystem(numberSystemList as any);
      }

      const currencyList = await getCurrencyList();
      if (Object.keys(currencyList)?.length) {
        setCurrency(currencyList as any);
      }

      const locationList = await getLocationList();
      if (Object.keys(locationList)?.length) {
        setLocation(locationList as any);
      }
      const keySkillsList = await getKeySkillsList();
      if (Object.keys(keySkillsList)?.length) {
        setKeySkills(keySkillsList as any);
      }
    })();
  }, []);
  useEffect(() => {
    if (data) {
      data?.templateName && setValue("templateName", data?.templateName);
      data?.fromEmailId && setValue("fromEmailId", data?.fromEmailId);
      data?.mailSubject && setValue("mailSubject", data?.mailSubject);
      data?.jobTitle && setValue("jobTitle", data?.jobTitle);
      data?.message && setValue("message", data?.message);
      data?.signature && setValue("signature", data?.signature);
      data?.fromWorkExperience &&
        setValue("fromWorkExperience", {
          value: data?.fromWorkExperience?.value,
          label: data?.fromWorkExperience?.label,
        });
      data?.toWorkExperience &&
        setValue("toWorkExperience", {
          value: data?.toWorkExperience?.value,
          label: data?.toWorkExperience?.label,
        });
      data?.currency &&
        setValue("currency", {
          value: data?.currency?.value,
          label: data?.currency?.label,
        });
      data?.fromSalaryRange &&
        setValue("fromSalaryRange", {
          value: data?.fromSalaryRange?.value,
          label: data?.fromSalaryRange?.label,
        });
      data?.toSalaryRange &&
        setValue("toSalaryRange", {
          value: data?.toSalaryRange?.value,
          label: data?.toSalaryRange?.label,
        });
      data?.numberSystem &&
        setValue("numberSystem", {
          value: data?.numberSystem?.value,
          label: data?.numberSystem?.label,
        });
      data?.jobLocation &&
        data.jobLocation.map((location: any) => {
          location &&
            selectedJobsLocation.push({
              value: location?.value,
              label: location?.label,
            });
        });
      data?.jobLocation && setValue("jobLocation", selectedJobsLocation);
      data?.keySkills &&
        data?.keySkills.map((skill: any) => {
          setValue("keySkills", {
            value: skill?.value,
            label: skill?.label,
          });
        });
    }
  }, [data]);
  return (
    <>
      {" "}
      <div className="flex flex-col">
        <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-8 mb-2 mt-2">
            <div className="col-span-2">
              <label
                htmlFor="templateName"
                className="block text-sm font-medium leading-6 text-gray-900">
                Template Name
              </label>
            </div>
            <div className="col-span-6">
              <Controller
                name="templateName"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={false}
                  />
                )}
              />
              {errors.templateName && (
                <p className="font-normal text-xs text-red-500">
                  {errors.templateName.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-full mb-4 mt-2 p-2 font-semibold bg-slate-200">
            Mail Body
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label
                htmlFor="fromEmailId"
                className="block text-sm font-medium leading-6 text-gray-900">
                From Email-Id
              </label>
            </div>
            <div className="col-span-6">
              <Controller
                name="fromEmailId"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={false}
                  />
                )}
              />
              {errors.fromEmailId && (
                <p className="font-normal text-xs text-red-500">
                  {errors.fromEmailId.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label
                htmlFor="mailSubject"
                className="block text-sm font-medium leading-6 text-gray-900">
                Subject
              </label>
            </div>
            <div className="col-span-6">
              <Controller
                name="mailSubject"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={false}
                  />
                )}
              />
              {errors.mailSubject && (
                <p className="font-normal text-xs text-red-500">
                  {errors.mailSubject.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-full mb-4 mt-2 p-2 font-semibold bg-slate-200">
            Job Detail
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium leading-6 text-gray-900">
                Job Title
              </label>
            </div>
            <div className="col-span-6">
              <Controller
                name="jobTitle"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={false}
                  />
                )}
              />
              {errors.jobTitle && (
                <p className="font-normal text-xs text-red-500">
                  {errors.jobTitle.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label
                htmlFor="mailSubject"
                className="block text-sm font-medium leading-6 text-gray-900">
                Total Experience
              </label>
            </div>
            <div className="col-span-6">
              <div className="w-full justify-start  gap-5 inline-flex">
                <div className="w-full flex-col justify-start  gap-2 inline-flex">
                  <div className="w-full">
                    <AutocompleteBox
                      control={control}
                      isClearable={true}
                      fieldName={"fromWorkExperience"}
                      dropdownData={totalExpYear?.map(({ id, title }: any) => ({
                        value: id,
                        label: title,
                      }))}
                      defaultValue={watch("fromWorkExperience")}
                      placeholder={"Select work experience"}
                    />
                  </div>
                </div>
                <div className="w-full flex-col justify-start  gap-2 inline-flex">
                  <div className="w-full">
                    <AutocompleteBox
                      control={control}
                      isClearable={true}
                      fieldName={"toWorkExperience"}
                      dropdownData={totalExpYear?.map(({ id, title }: any) => ({
                        value: id,
                        label: title,
                      }))}
                      default={watch("toWorkExperience")}
                      placeholder={"Select work experience"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label
                htmlFor="mailSubject"
                className="block text-sm font-medium leading-6 text-gray-900">
                CTC
              </label>
            </div>
            <div className="col-span-6">
              <div className="mb-4">
                <div className="grid grid-cols-8 gap-4 mt-1">
                  <div className="col-span-2">
                    <AutocompleteBox
                      control={control}
                      fieldName={"currency"}
                      dropdownData={currency?.map(({ id, title }: any) => ({
                        value: id,
                        label: title,
                      }))}
                      default={watch("currency")}
                      placeholder={"Currency"}
                    />
                  </div>
                  <div className="col-span-2">
                    <AutocompleteBox
                      control={control}
                      isClearable={true}
                      fieldName={"fromSalaryRange"}
                      dropdownData={salaryRange?.map(({ id, title }: any) => ({
                        value: id,
                        label: title,
                      }))}
                      default={watch("fromSalaryRange")}
                      placeholder={"Min range"}
                    />
                  </div>
                  <div className="col-span-2">
                    <AutocompleteBox
                      control={control}
                      isClearable={true}
                      fieldName={"toSalaryRange"}
                      dropdownData={salaryRange?.map(({ id, title }: any) => ({
                        value: id,
                        label: title,
                      }))}
                      default={watch("toSalaryRange")}
                      placeholder={"Max range"}
                    />
                  </div>
                  <div className="col-span-2">
                    <AutocompleteBox
                      control={control}
                      isClearable={true}
                      fieldName={"numberSystem"}
                      dropdownData={numberSystem?.map(({ id, title }: any) => ({
                        value: id,
                        label: title,
                      }))}
                      default={watch("numberSystem")}
                      placeholder={"Number system"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label
                htmlFor="mailSubject"
                className="block text-sm font-medium leading-6 text-gray-900">
                Location
              </label>
            </div>
            <div className="col-span-6">
              <AutocompleteBox
                control={control}
                isClearable={true}
                isMulti={true}
                fieldName={"jobLocation"}
                dropdownData={location?.map(
                  ({ id, title }: any) => ({ value: id, label: title } as any)
                )}
                placeholder={"Select job location"}
                defaultValue={watch("jobLocation")}
              />
              {errors.jobLocation && (
                <p className="font-normal text-xs text-red-500">
                  {errors.jobLocation.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label
                htmlFor="keySkills"
                className="block text-sm font-medium leading-6 text-gray-900">
                Key Skills
              </label>
            </div>
            <div className="col-span-6">
              <AutocompleteBox
                control={control}
                isClearable={true}
                isMulti={true}
                fieldName={"keySkills"}
                dropdownData={keySkills?.map(
                  ({ id, title }: any) => ({ value: id, label: title } as any)
                )}
                placeholder={"Select Key Skills"}
                defaultValue={watch("keySkills")}
              />
              {errors.keySkills && (
                <p className="font-normal text-xs text-red-500">
                  {errors.keySkills.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium leading-6 text-gray-900">
                Message
              </label>
            </div>
            <div className="col-span-6">
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={false}
                    placeholder={"Please add message"}
                    defaultValue={watch("message")}
                  />
                )}
              />

              {errors.message && (
                <p className="font-normal text-xs text-red-500">
                  {errors.message.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-8 mb-2">
            <div className="col-span-2">
              <label
                htmlFor="signature"
                className="block text-sm font-medium leading-6 text-gray-900">
                Signature
              </label>
            </div>
            <div className="col-span-6">
              <Controller
                name="signature"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    readOnly={false}
                    placeholder={"Please add signature"}
                    defaultValue={watch("signature")}
                  />
                )}
              />
              {errors.signature && (
                <p className="font-normal text-xs text-red-500">
                  {errors.signature.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="mt-5 flex justify-end items-center">
            <div>
              <button type="button" className="mr-3" onClick={closeDialog}>
                Cancel
              </button>
              <button
                form="my-form"
                type="submit"
                className={"rounded-3xl bg-blue-500 text-white px-5 py-1.5"}>
                Preview
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default EditMailTemplate;
