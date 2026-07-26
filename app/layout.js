import "./globals.css";

export const metadata = {
  title: "Little Things Bakery",
  description: "A premium bakery experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
