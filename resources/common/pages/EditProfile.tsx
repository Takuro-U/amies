import React from "react";
import UpdatePasswordForm from "../../auth/Pages/Profile/Partials/UpdatePasswordForm";
import DeleteUserForm from "../../auth/Pages/Profile/Partials/DeleteUserForm";
import UpdateProfileInformationForm from "../../auth/Pages/Profile/Partials/UpdateProfileInformationForm";

const EditProfile: React.FC<{ mustVerifyEmail: boolean; status?: string }> = ({
    mustVerifyEmail,
    status,
}) => {
    return (
        <div>
            <div className="py-12 bg-gray-100">
                <div className="flex flex-col items-center">
                    <div className="bg-white max-w-3xl w-full p-5 mb-4 shadow rounded-md">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="w-full"
                        />
                    </div>

                    <div className="bg-white max-w-3xl w-full p-5 shadow rounded-md">
                        <UpdatePasswordForm className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
