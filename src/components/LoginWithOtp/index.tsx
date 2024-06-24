import { createRef, useState } from "react";
import "./LoginWithOtp.css";
import { OtpForm } from "../OtpForm";

export const LoginWithOtp = () => {
    const phoneNumRef = createRef<HTMLInputElement>();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Make API call
    // Dummy method
    const sendOtp = async (phoneNumber: string) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(`OTP Sent to ${phoneNumber}!`), 1000);
        });
    };

    const isValidPhoneNumber = (phoneNumber?: string) => {
        if (!phoneNumber) {
            return false;
        }
        return true;
    };
    const onGetOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const phoneNumber = phoneNumRef.current?.value;
        if (!isValidPhoneNumber(phoneNumber)) {
            setErrorMessage("Please enter a valid phone number.");
            return;
        }
        setErrorMessage("");
        setIsLoading(true);
        await sendOtp(phoneNumber!);
        setIsOtpSent(true);
        setIsLoading(false);
    };

    const otpSubmitHandler = (otp: string) => {
        setIsAuthenticated(true);
        console.log("OTP submitted successfully:", otp);
    };
    return (
        <>
            {!isOtpSent ? (
                <form onSubmit={onGetOtp}>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                        ref={phoneNumRef}
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading}>
                        Get OTP
                    </button>
                    <br />
                    <span className="errorMessage">{errorMessage}</span>
                    {isLoading && <p className="loading">Sending OTP...</p>}
                </form>
            ) : !isAuthenticated ? (
                <>
                    <OtpForm submitOtp={otpSubmitHandler} />
                </>
            ) : (
                <h2>You're successfully logged in!</h2>
            )}
        </>
    );
};
