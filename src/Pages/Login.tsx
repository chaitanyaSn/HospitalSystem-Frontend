import React, { use } from "react";
import { Button, TextInput } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Service/USerService";
import { errorNotification, successNotification } from "../Util/NotificationUtil";
import { useDispatch } from "react-redux";
import { setJwt } from "../Slices/JwtSlices";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";
const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value:string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const handleSubmit = (values: typeof form.values) => {
    loginUser(values).then((_data) => {
console.log("Login Response:", _data);
console.log(jwtDecode(_data));
      successNotification("Login successful");
      dispatch(setJwt(_data));
      dispatch(setUser(jwtDecode(_data)));
    }).catch((err) => {
      console.log(err);
      errorNotification("Login failed");
    });
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
            Login
          </div>
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
          <Button fullWidth radius="md" size="md" type="submit" color="blue">
            Login
          </Button>
         <div className="text-center text-sm text-gray-200 mt-4">
  Don’t have an account?{" "}
  <Link
    to="/register"
    className="text-blue-400 font-medium hover:underline hover:text-blue-500 transition-colors"
  >
    Register
  </Link>
</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
