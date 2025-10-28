export function Footer() {
  return (
    <footer className="py-6 text-center text-gray-600 text-sm md:text-base">
      <p>
        Todos direitos reservados © {new Date().getFullYear()} -{" "}
        <span className="hover:text-black">Pierre Paulo</span>{" "}
      </p>
    </footer>
  );
}
