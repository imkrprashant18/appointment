const Loader = () => {
  return (
    <div className="relative flex justify-center items-center bg-[#232323] h-screen w-full ">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#F38220]"></div>
      <img
        src="https://cdn.pixabay.com/photo/2024/02/16/06/26/dentist-8576790_1280.png"
        className="rounded-full h-28 w-28"
      />
    </div>
  );
};

export default Loader;
