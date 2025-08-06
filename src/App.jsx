import {
  PlanetIcon,
  XLogoIcon,
  GithubLogoIcon,
  TelegramLogoIcon,
  DiscordLogoIcon,
  PuzzlePieceIcon,
  CompassToolIcon,
  CircleIcon,
} from "@phosphor-icons/react";
import avatarPic from "./public/avatar.jpg";
import backgroundImage from "./public/wallpaper.jpg";

const App = () => {
  const socialLinks = [
    { Icon: XLogoIcon, text: "kowkodivka", href: "#" },
    { Icon: GithubLogoIcon, text: "Kowkodivka", href: "#" },
    { Icon: TelegramLogoIcon, text: "kwkdvka", href: "#" },
    { Icon: DiscordLogoIcon, text: "Kowkodivka", href: "#" },
  ];

  const funFacts = [
    { text: "I have depressive and anxiety syndromes" },
    { text: "I have been taking antidepressants since March 2025" },
  ];

  const techStackSections = [
    { title: "Backend", items: ["Python (torch, matplotlib, openslide, opencv, numpy, FastAPI)", "Rust (tokio, tower, axum, sqlx)"] },
    { title: "Frontend", items: ["Javascript (React, Solid)"] },
    { title: "DevOps & Tools", items: ["Docker, Git, Linux", "VS Code, Figma"] },
    { title: "APIs & Platforms", items: ["Swagger, OpenAPI"] },
    { title: "Principles", items: ["SOLID, KISS, DRY"] },
  ];

  const WindowControls = () => (
    <div className="flex items-center gap-1.5 p-2">
      <div className="bg-red-500 w-2.5 h-2.5 rounded-full" />
      <div className="bg-yellow-500 w-2.5 h-2.5 rounded-full" />
      <div className="bg-green-500 w-2.5 h-2.5 rounded-full" />
    </div>
  );

  const ProfileCard = () => (
    <article className="flex flex-col w-full max-w-[350px] gap-2.5 p-2.5 bg-[#f5eae8] rounded-lg shadow-2xl">
      <WindowControls />
      <section className="flex items-center gap-2.5">
        <img
          className="w-32 h-32 object-cover rounded-md"
          alt="Profile picture of Kowkodivka"
          src={avatarPic}
        />
        <div className="flex flex-col items-start justify-between flex-1">
          <div className="flex flex-col">
            <h1 className="font-black text-[#8185b2] text-lg">Kowkodivka</h1>
            <p className="font-medium italic text-[#8185b2] text-xs">
              developer / ui ux designer
            </p>
          </div>
          <address className="flex items-center gap-0.5 not-italic">
            <PlanetIcon size={16} className="text-[#8185b2]" />
            <span className="text-[#8185b2] text-xs">Novokuznetsk, Russia</span>
          </address>
          <nav className="flex gap-2.5">
            <div className="flex flex-col gap-0.5">
              {socialLinks.slice(0, 2).map(({ Icon, text, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="flex items-center gap-0.5 hover:underline"
                >
                  <Icon size={16} className="text-[#8185b2]" />
                  <span className="text-[#8185b2] text-xs">{text}</span>
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              {socialLinks.slice(2, 4).map(({ Icon, text, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="flex items-center gap-0.5 hover:underline"
                >
                  <Icon size={16} className="text-[#8185b2]" />
                  <span className="text-[#8185b2] text-xs">{text}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>
      <section className="p-2.5 bg-[#8185b2] rounded-lg text-[#f5eae8] text-xs font-medium">
        <p>
          Hey! I'm Kowkodivka (but you can call me Zhenya if that's easier). My story starts in the vibrant landscapes of Kazakhstan, but life brought me to Russia — a place I now proudly call home and absolutely adore. <br /><br />
          As a proud pansexual and an enthusiastic furry, I celebrate self-expression in all its forms. When I'm not lost in the world of coding or tinkering with design, you'll find me with a stylus in hand, bringing my artistic visions to life. <br /><br />
          Every day is a new adventure — whether I'm debugging a program, sketching a furry character, or just vibing to good music. Life's too short to be boring, right? <br /><br />
          Nice to meet you! Let's create something awesome together.
        </p>
      </section>
    </article>
  );

  const FunFactsCard = () => (
    <article className="flex flex-col w-full max-w-[257px] gap-2.5 p-2.5 bg-[#dbddec] rounded-lg shadow-2xl">
      <WindowControls />
      <section className="flex flex-col gap-2.5 p-2.5 bg-[#8185b2] rounded-lg">
        <header className="flex items-center gap-1.5">
          <PuzzlePieceIcon size={20} className="text-[#dbddec]" />
          <h2 className="font-black text-[#dbddec] text-lg">Fun facts</h2>
        </header>
        <ul className="list-disc list-inside space-y-1 text-[#dbddec] text-xs">
          {funFacts.map(({ text }, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </section>
    </article>
  );

  const TechStackCard = () => (
    <article className="flex flex-col w-full max-w-[257px] gap-2.5 p-2.5 bg-[#dbddec] rounded-lg shadow-2xl">
      <WindowControls />
      <section className="flex flex-col gap-2.5 p-2.5 bg-[#8185b2] rounded-lg">
        <header className="flex items-center gap-1.5">
          <CompassToolIcon size={20} className="text-[#dbddec]" />
          <h2 className="font-black text-[#dbddec] text-lg">Tech stack</h2>
        </header>
        {techStackSections.map(({ title, items }, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-semibold text-[#dbddec] text-sm">{title}</h3>
            <ul className="list-disc list-inside space-y-1 text-[#dbddec] text-xs">
              {items.map((text, itemIndex) => (
                <li key={itemIndex}>{text}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </article>
  );

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="relative flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl">
        <ProfileCard />
        <aside className="flex flex-col gap-6 w-full md:w-auto">
          <FunFactsCard />
          <TechStackCard />
        </aside>
      </div>
    </main>
  );
};

export default App;