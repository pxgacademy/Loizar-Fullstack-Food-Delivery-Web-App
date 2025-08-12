import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { z } from "zod";
import bannerImage from "../../assets/images/3896377.jpg";
import PageContainer from "../../components/containers/PageContainer";
import SectionContainer from "../../components/containers/SectionContainer";
import { useAuthStore } from "../../stores/useAuthStore";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().regex(passwordRegex, {
    message: "Invalid password",
  }),
  isHuman: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you are not a robot" }),
  }),
});

type LoginFormData = z.infer<typeof schema>;

interface LoginResponse {
  isSuccess: boolean;
  message: string;
}

const Login: FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login, user } = useAuthStore();
  const [isEye, setIsEye] = useState(false);

  if (user) navigate(state?.reach || "/");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const { isSuccess, message }: LoginResponse = await login(data);
    console.log(isSuccess, message);

    if (isSuccess) {
      Swal.fire({
        title: "Success",
        text: message,
        position: "center",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(state?.reach || "/");
    } else
      Swal.fire({
        title: "Error",
        text: message,
        showConfirmButton: true,
      });
  };

  return (
    <PageContainer>
      <SectionContainer margin="" className="flex gap-14">
        <div className="lg:flex-1 w-full flex items-center justify-center">
          <div className="relative w-full max-w-lg mx-auto lg:mx-0 p-10 sm:p-20 my-16 border-[2px] rounded-4xl">
            <h2 className="text-xl text-center mb-3">Login Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="flex gap-x-2 mb-1">
                  <Mail />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="johndoe@mail.com"
                  {...register("email")}
                  className="input w-full"
                />
                {errors.email && (
                  <span className="text-error text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label>Password</label>
                <div className="flex items-center relative">
                  <input
                    type={isEye ? "text" : "password"}
                    placeholder="********"
                    {...register("password")}
                    className="input w-full"
                  />
                  <button
                    onClick={() => setIsEye(!isEye)}
                    type="button"
                    className="absolute right-2 cursor-pointer z-10"
                  >
                    {isEye ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-error text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center">
                  <input
                    id="human_checkbox"
                    type="checkbox"
                    {...register("isHuman")}
                    className="mr-2 checkbox"
                  />
                  <label htmlFor="human_checkbox" className="cursor-pointer">
                    I am not a robot
                  </label>
                </div>
                {errors.isHuman && (
                  <span className="text-error text-sm">
                    {errors.isHuman.message}
                  </span>
                )}
              </div>

              <div className="absolute right-16 bottom-0 translate-y-[50%] bg-base-100 border-[2px] p-2 rounded-full">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-base-300 rounded-full py-4 px-8 cursor-pointer transition-all duration-150"
                >
                  Login
                </button>
              </div>
            </form>

            <p>
              Don't have an account? Please{" "}
              <Link to="/register" className="btn btn-link px-0">
                Register
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center lg:flex-1 py-16 px-10 bg-primary/5">
          <img src={bannerImage} alt="Banner Image" className="rounded-xl" />
        </div>
      </SectionContainer>
    </PageContainer>
  );
};

export default Login;

//
