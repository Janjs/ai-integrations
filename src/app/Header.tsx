export default function Header({ title }: { title: string }) {
  return (
    <header className="bg-transparent">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 px-8"
        aria-label="Global"
      >
        <div className="flex flex-1 justify-center text-center text-xl" >
          <h1>{title}</h1>
        </div>
      </nav>
    </header>
  );
}
