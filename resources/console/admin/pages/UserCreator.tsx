import React from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "../../../auth/Layouts/GuestLayout";
import InputError from "../../../auth/Components/InputError";
import InputLabel from "../../../auth/Components/InputLabel";
import PrimaryButton from "../../../auth/Components/PrimaryButton";
import TextInput from "../../../auth/Components/TextInput";
import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";

const UserCreator: React.FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log("done");

        post("/console/admin/user-creator", {
            //たぶん要らない
            onFinish: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

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
