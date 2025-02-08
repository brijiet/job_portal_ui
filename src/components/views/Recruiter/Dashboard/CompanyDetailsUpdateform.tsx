import { ChangeEvent, useEffect, useRef, useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from '../../../../';
import { updateCompanyprofile, clearCompanyDetailsState } from '../../../../store/reducers/companies/updateCompanyProfile';
import { deleteCompanyDetails, deleteCompanyDetailsState } from '../../../../store/reducers/companies/deleteCompanyProfile';
import { getEmployerCompanyList } from '../../../../store/reducers/companies/employerCompanyList';

interface IFormInputs {
    companyImage: string | undefined
    //companyDescription: string
}

type Parameters = {
    id: number,
    company: any,
    closeDialog: () => void
}

const CareerProfileSchema = yup.object().shape({
    companyImage: yup.string().label("Please upload an image"),
    //companyDescription: yup.string().label("Please enter company description").required(),
}).required();

const CompanyDetailsUpdateform: FC<Parameters> = ({ id, company, closeDialog }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [fileUploadErrors, setFileUploadErrors] = useState<any>();
    const [companyImg, setCompanyImg] = useState<any>();
    const dispatch = useAppDispatch();
    const { companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);
    const { error, errorMessage } = useAppSelector((state) => state.updateCompanyProfile);
    const { error: errorDelete, errorMessage: errorMessageDelete } = useAppSelector((state) => state.deleteCompanyProfilePicture)

    const {
        control,
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IFormInputs>({
        resolver: yupResolver(CareerProfileSchema),
        defaultValues: {
            companyImage: '',
            //companyDescription: '',
        }
    });

    useEffect(() => {
        if (companyDetails[0]) {
            setValue('companyImage', companyDetails[0]?.companyImage);
            //setValue('companyDescription', companyDetails[0].companyDescription);
        }
        if (error)
            dispatch(clearCompanyDetailsState)
        if (errorDelete) dispatch(deleteCompanyDetailsState)
        setCompanyImg(companyDetails[0]?.companyImage);
    }, [setValue, companyDetails, error, errorMessage, errorDelete, errorMessageDelete]);

    //const companyImg = companyDetails[0].companyImage;
    let uploadFile = 'Upload photo';
    if (companyImg) {
        uploadFile = 'Change photo';
    }

    useEffect(() => {
        setFileUploadErrors(errorMessage)
    }, [errorMessage])

    const handleDeletePicture = (event: any) => {
        event.preventDefault();
        setValue('companyImage', '');
        setCompanyImg('');
        // dispatch(deleteCompanyDetails(companyDetails[0].id));
        // dispatch(deleteCompanyDetailsState())
    }

    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl as any)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const file = event.target.files && event.target.files[0];

        if (file) {
            setSelectedFile(file);
            setValue('companyImage', file.name);
        }
        setFileUploadErrors('');
    }

    const onSubmit = (data: IFormInputs) => {
        const formData = new FormData();
        if (selectedFile) {
            formData.append('file', selectedFile);
        }
        //formData.append('companyDescription', data.companyDescription);
        if (watch('companyImage') === "") {
            const data = {
                id: companyDetails[0]?.id,
                companyImage: companyDetails[0]?.companyImage
            }
            dispatch(deleteCompanyDetails(data));
            dispatch(deleteCompanyDetailsState())
        }
        dispatch(updateCompanyprofile({ id: companyDetails[0]?.id, data: formData }));
    }

    return (
        <div className="flex flex-col">
            <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center items-center">
                    <label htmlFor="companyImage" className="block text-sm font-medium leading-6 text-gray-900 mb-4">
                        Company Image
                    </label>
                    {
                        preview ?
                            <img className=" rounded-full mb-4" height={80} width={80} src={preview} />
                            : companyImg && <img className=" rounded-full mb-4" height={80} width={80} src={`${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${companyImg}`.replace(/"/g, '') as any} />
                    }
                    <div className=" flex justify-center items-center">
                        <div>
                            <label className="cursor-pointer px-3 py-1 mb-1 rounded-3xl border-2 border-blue-600 bg-blue-600 text-white font-md">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept=".png,.jpg,.jpeg,.gif"
                                    onChange={handleFileChange}
                                />
                                {uploadFile}
                            </label>
                        </div>
                        {companyImg && <div className="ml-6">
                            <button className="text-blue-600 font-medium" onClick={handleDeletePicture}>
                                Delete photo
                            </button>
                        </div>}
                    </div>
                    {errors?.companyImage && <p className="mt-2 font-normal text-xs text-red-500">{errors?.companyImage?.message}</p>}
                    {
                        fileUploadErrors && <p className="mt-2 font-normal text-xs text-red-500">{fileUploadErrors}</p>
                    }
                    {
                        selectedFile
                            ? <span className=" text-gray-400 mt-2">{selectedFile?.name}</span>
                            : <span className=" text-gray-400 mt-2">Supported file format: png, jpg, jpeg, gif - upto 2MB</span>
                    }
                </div>
                {/* <div className="mb-4 ">
                    <label htmlFor="companyImage" className="block text-sm font-medium leading-6 text-gray-900">Company Image</label>
                    <div className="grid mt-1">
                        {errorMessage && <span className="text-red-600 mt-3">{errorMessage}</span>}
                        <div className="p-10 flex flex-col justify-center items-center">
                            {

                                !companyImg && (
                                    <div>
                                        <label className="cursor-pointer px-3 py-1 mb-1 rounded-3xl border-2 border-blue-600 bg-blue-600 text-white font-md">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="hidden"
                                                accept=".png,.jpg,.jpeg,.gif"
                                                onChange={handleFileChange}
                                            />
                                            Upload photo
                                        </label>
                                        {errors?.companyImage && <p className="mt-2 font-normal text-xs text-red-500">{errors?.companyImage?.message}</p>}
                                    </div>

                                )
                            }
                            {companyImg && (
                                <div className="flex flex-row gap-10">
                                    <div className="mr-4">
                                        <img height={50} width={40} src={companyImg ? `${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${companyImg}`.replace(/"/g, '') as any : default_image} />
                                        <button className="text-blue-600 font-medium" onClick={handleDeletePicture}>
                                            Delete photo
                                        </button>
                                    </div>
                                    <div className="ml-4">
                                        <label className="cursor-pointer px-3 py-1 mb-1 rounded-3xl border-2 border-blue-600 bg-blue-600 text-white font-md">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="hidden"
                                                accept=".png,.jpg,.jpeg,.gif"
                                                onChange={handleFileChange}
                                            />
                                            {uploadFile}
                                        </label>
                                        {errors?.companyImage && <p className="font-normal text-xs text-red-500">{errors?.companyImage?.message}</p>}
                                    </div>

                                </div>
                            )
                            }

                            {
                                selectedFile
                                    ? <span className=" text-gray-400 mt-2">{selectedFile?.name}</span>
                                    : <span className=" text-gray-400 mt-2">Supported file format: png, jpg, jpeg, gif - upto 2MB</span>
                            }
                        </div>
                    </div>
                </div> */}
                {/* <div className="mb-4">
                    <label htmlFor="companyDescription" className="block text-sm font-medium leading-6 text-gray-900">Company Description</label>
                    <div className="grid grid-cols-8 gap-4 mt-1">
                        <div className="col-span-8">
                            <input defaultValue={companyDetails[0].companyDescription}
                                className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                                placeholder={"companyDescription"}
                                {...register("companyDescription")} />
                            {errors?.companyDescription && <p className="font-normal text-xs text-red-500">{errors?.companyDescription?.message}</p>}
                        </div>
                    </div>
                </div> */}
                <div className="mt-5 flex justify-end items-center">
                    <div>
                        <button
                            type="button"
                            className="mr-3"
                            onClick={closeDialog}
                        >
                            Cancel
                        </button>
                        <button
                            form='my-form'
                            type="submit"
                            className="rounded-3xl bg-blue-500 text-white px-5 py-1.5"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CompanyDetailsUpdateform;