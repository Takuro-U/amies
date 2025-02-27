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
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
