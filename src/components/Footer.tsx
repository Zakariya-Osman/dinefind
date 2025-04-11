export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t text-center text-sm text-gray-500 dark:text-gray-400 py-4 mt-10">
      © {new Date().getFullYear()} DineFind. Made with ❤️.
    </footer>
  );
}
