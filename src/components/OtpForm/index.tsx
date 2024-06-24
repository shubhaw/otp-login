import { useEffect, useRef, useState } from "react";
import "./OtpForm.css";
interface IOtpFormProps {
    length?: number;
    submitOtp: (otp: string) => void;
}
export const OtpForm = (props: IOtpFormProps) => {
    const { length = 4, submitOtp } = props;

    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (isNaN(value as unknown as number)) {
            return;
        }
        const updatedOtp = [...otp];
        updatedOtp[index] = value.substring(value.length - 1);
        setOtp(updatedOtp);

        if (value !== "" && index < length) {
            inputRefs.current[index + 1]?.focus();
        }

        if (!updatedOtp.some((num) => num === "")) {
            submitOtp(updatedOtp.join(""));
        }
    };

    const handleClick = (index: number) => {
        inputRefs.current[index]?.setSelectionRange(1, 1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && inputRefs.current[index]?.value === "" && index > 0) {
            e.preventDefault();
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            inputRefs.current[index]?.setSelectionRange(1, 1);
        }
    };

    return (
        <div className="otp-input-wrapper">
            {otp.map((value: string, index: number) => {
                return (
                    <input
                        type="text"
                        className="otp-input"
                        key={index}
                        value={value}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        onChange={(e) => handleInputChange(e, index)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                );
            })}
        </div>
    );
};
