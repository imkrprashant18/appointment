import ApplyDoctorForm from "../components/ApplyDoctorForm";
import Layout from "../components/Layout";

const ApplyDoctor = () => {
  return (
    <>
      <Layout>
        <div className="mt-4 space-y-3">
          <h1 className="text-center text-teal-500 text-lg ">
            {" "}
            Apply for Doctor Account
          </h1>
          <ApplyDoctorForm />
        </div>
      </Layout>
    </>
  );
};

export default ApplyDoctor;
