import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputBase,
    useTheme,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import KeyIcon from "@mui/icons-material/Key";
import React, { useCallback, useState } from "react";
import { useForm } from "@inertiajs/react";
import Auth from "@/Layouts/Backoffice/Auth";
import { tokens } from "@/theme";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { Link } from "@inertiajs/react";

function Login({ nama }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data, setData, errors, post, processing, reset } = useForm({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    // captcha
    const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
    // ------

    const handleInput = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        post(route("cms.login.process"), {
            onSuccess: (page) => {
                reset();
                // setRefreshReCaptcha(r => !r);
            },
            onError: (e) => {
                setRefreshReCaptcha((r) => !r);
            },
        });
    };

    // recaptcha
    const onVerify = useCallback(
        (token) => {
            setData((prev) => ({ ...prev, "g-recaptcha-response": token }));
        },
        [refreshReCaptcha]
    );
    // ----------

    return (
        <div className="h-screen lg:flex">
            <div
                className={`flex w-full lg:w-1/2 py-4 lg:py-0 justify-around items-center`}
                style={{ backgroundColor: colors.danamonAccent[600] }}
            >
                <div>
                    <Link
                        // href={route("home")}
                        className="block w-36 aspect-[11/4] bg-white p-1 rounded-md"
                    >
                        {/* <img src="/assets/logo/Danamon.png" alt="danamon logo" className='object-contain w-full h-full'/> */}
                        <span className="text-black">Logo Perusahaan</span>
                    </Link>
                    <p className="mt-1 text-white">Content Management System</p>
                    {/* <button type="submit" className="block py-2 mt-4 mb-2 font-bold text-indigo-800 bg-white w-28 rounded-2xl">Read More</button> */}
                </div>
            </div>
            <div className="flex items-center justify-center w-full lg:w-1/2">
                <form
                    onSubmit={handleSignIn}
                    className="w-full p-8 md:w-3/4 lg:w-1/2 lg:p-0 mt-44 lg:mt-0"
                >
                    <GoogleReCaptcha
                        onVerify={onVerify}
                        refreshReCaptcha={refreshReCaptcha}
                    />
                    <h1 className="mb-1 text-xl font-bold">
                        Halo Selamat Datang Kembali!
                    </h1>
                    <p className="text-sm font-normal mb-7">
                        Silahkan Masukan Credential Anda
                    </p>
                    <FormControl className="w-full" sx={{ mb: 1 }}>
                        <div
                            className={`flex items-center border-2 py-2 px-3 rounded-2xl ${
                                errors.email && "border-red-500 text-red-500"
                            }`}
                        >
                            {/* <IconButton sx={{ p: '4px', color: 'inherit' }} aria-label="email"> */}
                            <AlternateEmailIcon sx={{ color: "inherit" }} />
                            {/* </IconButton> */}
                            <InputBase
                                type="text"
                                sx={{
                                    ml: 1,
                                    color: "inherit",
                                    flex: 1,
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    "& > input:-webkit-autofill": {
                                        WebkitTextFillColor:
                                            colors.danamonAccent[300],
                                        caretColor: colors.danamonAccent[300],
                                        WebkitBoxShadow: `0 0 0px 1000px transparent inset`,
                                        transition:
                                            "background-color 5000s ease-in-out 0s",
                                    },
                                }}
                                autoFocus
                                placeholder="Masukan email"
                                name="email"
                                onChange={handleInput}
                                inputProps={{
                                    "aria-label": "Masukan email anda",
                                }}
                            />
                        </div>
                        {errors.email && (
                            <FormHelperText error={true}>
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl className="w-full" sx={{ mb: 1 }}>
                        <div
                            className={`flex items-center border-2 py-2 px-3 rounded-2xl ${
                                errors.password && "border-red-500 text-red-500"
                            }`}
                        >
                            {/* <IconButton component sx={{ p: '4px', color: 'inherit' }} aria-label="password"> */}
                            <KeyIcon sx={{ color: "inherit" }} />
                            {/* </IconButton> */}
                            <InputBase
                                type={passwordVisible ? "text" : "password"}
                                sx={{
                                    ml: 1,
                                    color: "inherit",
                                    flex: 1,
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    "& > input:-webkit-autofill": {
                                        WebkitTextFillColor:
                                            colors.danamonAccent[300],
                                        caretColor: colors.danamonAccent[300],
                                        WebkitBoxShadow: `0 0 0px 1000px transparent inset`,
                                        transition:
                                            "background-color 5000s ease-in-out 0s",
                                    },
                                }}
                                placeholder="Masukan password anda"
                                name="password"
                                onChange={handleInput}
                                inputProps={{
                                    "aria-label": "Masukan email anda",
                                }}
                            />
                            <IconButton
                                type="button"
                                sx={{ p: "4px", color: "inherit" }}
                                aria-label="visibility password"
                                onClick={() =>
                                    setPasswordVisible(!passwordVisible)
                                }
                            >
                                {passwordVisible ? (
                                    <VisibilityOffIcon
                                        sx={{ color: "inherit" }}
                                    />
                                ) : (
                                    <VisibilityIcon sx={{ color: "inherit" }} />
                                )}
                            </IconButton>
                        </div>
                        {errors.password && (
                            <FormHelperText error={true}>
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Button
                        disabled={processing}
                        type="submit"
                        variant="contained"
                        size="medium"
                        sx={{
                            backgroundColor: colors.danamonAccent[600],
                            "&:hover": {
                                backgroundColor: colors.danamonAccent[700],
                            },
                            "&:disabled": {
                                backgroundColor: colors.danamonAccent[800],
                            },
                        }}
                        className="flex items-center justify-center w-full !mt-2 py-2 !rounded-2xl !font-semibold !mb-2"
                    >
                        Sign In &nbsp;
                        <span>
                            {processing ? (
                                <svg
                                    className="h-5 w-5 m-[0.05rem]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="xMidYMid"
                                >
                                    <circle
                                        cx={50}
                                        cy={50}
                                        r={46}
                                        strokeWidth={10}
                                        stroke="#fff"
                                        strokeDasharray="72.25663103256524 72.25663103256524"
                                        fill="none"
                                        strokeLinecap="round"
                                    >
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            repeatCount="indefinite"
                                            dur="0.7513513513513513s"
                                            keyTimes="0;1"
                                            values="0 50 50;360 50 50"
                                        />
                                    </circle>
                                </svg>
                            ) : (
                                <LoginIcon />
                            )}
                        </span>
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;

Login.layout = (page) => <Auth children={page} title="Login CMS" />;
