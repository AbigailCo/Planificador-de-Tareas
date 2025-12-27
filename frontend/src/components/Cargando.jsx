const Cargando = ({ size = 46 }) => {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="animate-spin rounded-full border-t-4 border-[var(--c-primary)] border-r-4 border-r-transparent border-solid"
        style={{
          height: `${size}px`,
          width: `${size}px`,
        }}
      ></div>
    </div>
  );
};

export default Cargando;