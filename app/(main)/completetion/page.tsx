import Picture from "@/app/components/layout/Picture";

const Details = {
    "heading": "Thank you for completing",
    "description": "Share your feedback at: +91-55746438382"

};

const Completion = () => {

    return (
        <div className="grid min-h-[calc(100vh-7rem)] grid-cols-1 bg-white w-full lg:grid-cols-2 lg:pl-[320px]">
            <div className="order-1  item-center  bg-white px-6 py-10 sm:px-10 lg:order-1 lg:px-14 lg:py-16">
                <h3 className="text-gray-700 text-left text-center font-semibold leading-snug mb-4">
                    KYC Verification Completed
                </h3>
                <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
                    Thank you for submitting the KYC verification.
                    Our team will connect if any issues arise.
                </p>
            </div>
            <div className="order-2 bg-[#046A38] relative overflow-hidden flex items-center lg:items-center justify-start px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16 order-1 lg:order-2 min-h-[280px] sm:min-h-[340px]">
                <Picture details={Details} />
            </div>
        </div>
    );
};

export default Completion;