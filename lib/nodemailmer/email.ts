import { transporter } from "./mail.cofig";
import { VERIFICATION_EMAIL_TEMPLATE } from "./templates";

export const sendVerificationEmail = async ( email: string,
  verificationToken: string) => {
	try {
		const response = await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),			
		});
		console.log("Email sent successfully", response);
	} catch (error) {
		console.error("Error sending verification", error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};
