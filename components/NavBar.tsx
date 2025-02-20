import Link from "next/link";

export const Navbar = () => {
  return (
    <>
      <ul className="hidden md:flex gap-x-6 text-white">
        <li>
          <Link href="/default">
            <p>haker news</p>
          </Link>
        </li>
        <li>
          <Link href="/new">
            <p>new</p>
          </Link>
        </li>
        <li>
          <Link href="/past">
            <p>past</p>
          </Link>
        </li>
        <li>
          <Link href="/comments">
            <p>comments</p>
          </Link>
        </li>
        <li>
          <Link href="/ask">
            <p>ask</p>
          </Link>
        </li>
        <li>
          <Link href="/show">
            <p>show</p>
          </Link>
        </li>
        <li>
          <Link href="/jobs">
            <p>jobs</p>
          </Link>
        </li>
      </ul>
    </>
  );
};
