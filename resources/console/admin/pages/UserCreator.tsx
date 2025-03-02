import React from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "../../../auth/Layouts/GuestLayout";
import InputError from "../../../auth/Components/InputError";
import InputLabel from "../../../auth/Components/InputLabel";
import PrimaryButton from "../../../auth/Components/PrimaryButton";
import TextInput from "../../../auth/Components/TextInput";
import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import classNames from "classnames";

const UserCreator: React.FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        role: { student: false, restaurant: false, user: true },
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post("/console/admin/user-creator", {
            //たぶん要らない
            onFinish: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />
                    <div id="role" className="mt-1 block w-full">
                        {Object.entries(data.role).map(([key, value]) => (
                            <button
                                type="button"
                                key={key}
                                className={classNames(
                                    "py-1 px-2 mr-1 rounded-md",
                                    {
                                        "bg-green-400 text-white": value,
                                        "bg-gray-200": !value,
                                    }
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setData("role", {
                                        ...data.role,
                                        [key]: !value,
                                    });
                                }}
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
};

export default UserCreator;
