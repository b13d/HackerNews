import Link from "next/link";

export default function Header() {
  return (
    <div>
      <Link href="/">
        <img src="/images/logo-hacker-news-no-bg.png" alt="logo" />
      </Link>
    </div>
  );
}
