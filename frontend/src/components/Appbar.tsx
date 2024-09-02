import { useEffect, useState } from "react";
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Appbar = () => {
    const router = useNavigate();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("")

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user`, {
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-type": "application/json"
            }
        })
            .then(res => {
                setName(res.data.user.name)
                setLoading(false)
            })

    if (loading) {
        return <div className="flex border-b justify-between p-4">
            <button className="flex flex-col justify-center text-2xl font-extrabold" onClick={() => {
                router("/")
            }}>
                Zapier
            </button>
            <div className="flex">

                <div className="pr-4">
                    <LinkButton onClick={() => {
                        router("/login")
                    }}>Login</LinkButton>
                </div>
                <PrimaryButton onClick={() => {
                    router("/signup")
                }}>
                    Signup
                </PrimaryButton>
            </div>
        </div>
    }
    return <div className="flex border-b justify-between p-4">
        <button className="flex flex-col justify-center text-2xl font-extrabold" onClick={() => {
            router("/")
        }}>
            Zapier
        </button>
        <div className="text-2xl font-bold font-semibold text-center  max-w-xl ">
            {"Hello! " + name}
        </div>
        <div className="flex justify-center">
            <PrimaryButton onClick={() => {
                localStorage.setItem("token", "")
                window.location.href = "/";
            }}>
                Logout
            </PrimaryButton>
        </div>
    </div>

}