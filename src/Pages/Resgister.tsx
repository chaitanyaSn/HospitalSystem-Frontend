import React from "react";
import { Button, TextInput, PasswordInput, SegmentedControl } from "@mantine/core";
import { useForm } from "@mantine/form";
import { data, Link } from "react-router-dom";
import { registerUser } from "../Service/USerService";

// ✅ Define the type for form values
interface RegisterFormValues {
  name:string;
  role: "PATIENT" | "DOCTOR" | "ADMIN";
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const form = useForm<RegisterFormValues>({
    initialValues: {
      name:"",
      role: "PATIENT",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
        name:(value:string) => value.length < 2 ? "Name is required": null,
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
     password: (value: string) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
    ? null
    : "Password must be at least 8 characters, include an uppercase letter, a number, and a special character",
      confirmPassword: (value: string, values: RegisterFormValues) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = (values: RegisterFormValues) => {
    registerUser(values).then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
  
  };

  return (
    <div
      style={{ background: 'url("/anime-moon-landscape.jpg")' }}
      className="h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex items-center justify-center"
    >
      <div className="w-[450px] backdrop-blur-md p-10 py-8">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-5 [&_input]:placeholder-neutral-100 [&_svg]:text-neutral-100 [&_input]:text-white "
        >
          <div className="self-center font-medium text-light text-xl">
            Register
          </div>

          <SegmentedControl
            {...form.getInputProps("role")}
            fullWidth
            size="md"
            radius="md"
            color="blue"
            bg="none"
            className="[&_*]:!text-white border border-gray-300 rounded-md px-3 py-1"
            data={[{label:'Patient',value:'PATIENT'},{label:'Doctor',value:'DOCTOR'},{label:'Admin',value:'ADMIN'}]}
          />
          <TextInput
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Name"
            className="border border-gray-300 rounded-md px-3 py-1 bg-white/10"
            {...form.getInputProps("name")}
          />

          <TextInput
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Email"
            className="border border-gray-300 rounded-md px-3 py-1 bg-white/10"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Password"
            className="border border-gray-300 rounded-md px-3 py-1 bg-white/10"
            {...form.getInputProps("password")}
          />

          <PasswordInput
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Confirm Password"
            className="border border-gray-300 rounded-md px-3 py-1 bg-white/10"
            {...form.getInputProps("confirmPassword")}
          />

          <Button fullWidth radius="md" size="md" type="submit" color="blue">
            Register
          </Button>

          <div className="text-center text-sm text-gray-200 mt-4">
            Have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-medium hover:underline hover:text-blue-500 transition-colors"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;