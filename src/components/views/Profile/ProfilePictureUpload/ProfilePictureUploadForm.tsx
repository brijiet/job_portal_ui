import { ChangeEvent, FC, useEffect, useRef } from 'react';
import { useAppSelector } from '../../../..';
import { useAppDispatch } from '../../../..';
import { profilePictureUpload, clearPictureUploadState } from '../../../../store/reducers/jobSeekerProfile/uploadProfilePicture';
import { profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { deleteProfilePicture, clearDeleteProfilePictureState } from '../../../../store/reducers/jobSeekerProfile/deleteProfilePicture';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../../store/reducers/jobSeekerProfile/profileIndicator';

type Parameters = {
  closeDialog: () => void;
};

const ProfilePictureUploadForm: FC<Parameters> = ({ closeDialog }) => {

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const { success, errorMessage, error } = useAppSelector((state) => state.jobSeekerUploadProfilePicture);
  const { success: successDelete, errorMessage: errorMessageDelete, error: errorDelete } = useAppSelector((state) => state.jobSeekerDeleteProfilePicture);
  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard)

  useEffect(() => {
    if (success) {
      dispatch(profileDashboardGet());
      dispatch(clearPictureUploadState());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }
    if (error) {
      dispatch(clearPictureUploadState)
    }
  }, [success, error, errorMessage, dispatch]);

  useEffect(() => {
    if (successDelete) {
      dispatch(profileDashboardGet());
      dispatch(clearDeleteProfilePictureState());
    }
    if (errorDelete) {
      dispatch(clearDeleteProfilePictureState)
    }
  }, [successDelete, errorDelete, errorMessageDelete, dispatch]);

  const profilePictureFile = profileDashboard?.profilePictureFile;
  let uploadFile = 'Upload photo';
  if (profilePictureFile) {
    uploadFile = 'Change photo';
  }

  const handleDeletePicture = (event: any) => {
    event.preventDefault();
    const data = {
      profilePictureFile: '',
      profilePicturePath: ''
    }
    dispatch(deleteProfilePicture(data));
  }
  const handleFileChange = (event: ChangeEvent) => {
    event.preventDefault();
    const selectedFile = fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0];
    if (selectedFile) {
      const formData = new FormData();

      formData.append('file', selectedFile);

      try {

        dispatch(profilePictureUpload(formData))
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        };

      } catch (error) {
        console.log('error', error);
      }
    }
  }

  return (
    <div className="w-full rounded-2xl bg-white p-4">
      <br />
      <div className="flex flex-col justify-center items-center" >
        <h1 className="font-medium text-lg">Profile photo upload</h1>
        <h2 className="font-medium text-sm">Profile with photo has 40% higher chances of getting noticed by recruiters.</h2>
        {errorMessage && <span className="text-red-600 mt-3">{errorMessage}</span>}
      </div>
      <form >
        <div className="p-10 rounded-2xl flex flex-col justify-center items-center">
          {!profilePictureFile && (
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
          )}
          {
            profilePictureFile && (
              <div className="flex flex-row gap-10">
                <div className="mr-4">
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
                </div>

              </div>
            )
          }
          <span className=" text-gray-400">Supported file format: png, jpg, jpeg, gif - upto 2MB</span>
        </div>
      </form>
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm text-gray-400">By uploading your photograph, you certify that jobportal.com has the right to display this photograph to
          {/* <div className="flex"> */}the recruiters and that the uploaded file does not violate our
          <span className="ml-2 text-blue-600 text-sm font-bold">Terms of services.</span></p>
        {/* </div> */}
      </div>
    </div>
  )
}

export default ProfilePictureUploadForm;