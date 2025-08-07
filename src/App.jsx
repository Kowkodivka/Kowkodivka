import {
  PlanetIcon,
  XLogoIcon,
  GithubLogoIcon,
  TelegramLogoIcon,
  DiscordLogoIcon,
  CompassToolIcon,
  InfoIcon,
} from "@phosphor-icons/react";
import avatarPic from "./public/avatar.jpg";
import "./index.css";

const App = () => {
  const socialLinks = [
    { Icon: XLogoIcon, text: "kowkodivka", href: "#" },
    { Icon: GithubLogoIcon, text: "Kowkodivka", href: "#" },
  ];

  const additionalSocialLinks = [
    { Icon: TelegramLogoIcon, text: "kwkdvka", href: "#" },
    { Icon: DiscordLogoIcon, text: "Kowkodivka", href: "#" },
  ];

  const techStackData = [
    {
      category: "Backend",
      items: [
        "Python (torch, matplotlib, openslide, opencv, numpy, FastAPI)",
        "Rust (tokio, tower, axum, sqlx)",
      ],
    },
    {
      category: "Frontend",
      items: ["Javascript (React, Solid)"],
    },
    {
      category: "DevOps & Tools",
      items: ["Docker, Git, Linux", "VS Code, Figma"],
    },
    {
      category: "APIs & Platforms",
      items: ["Swagger, OpenAPI"],
    },
    {
      category: "Principles",
      items: ["SOLID, KISS, DRY"],
    },
  ];

  const ProfileCard = () => (
    <article className="flex flex-col w-full max-w-[350px] gap-2.5 p-2.5 bg-[#f5eae8] rounded-[10px] shadow-[0px_22px_48px_#0000001a,0px_88px_88px_#00000017,0px_198px_119px_#0000000d,0px_352px_141px_#00000003]">
      <header className="flex items-center gap-[5px] w-full" role="banner">
        <div
          className="bg-[#ff605c] w-2.5 h-2.5 rounded-full"
          aria-label="Close window"
        />
        <div
          className="bg-[#ffbd44] w-2.5 h-2.5 rounded-full"
          aria-label="Minimize window"
        />
        <div
          className="bg-[#00ca4e] w-2.5 h-2.5 rounded-full"
          aria-label="Maximize window"
        />
      </header>

      <section className="flex items-start gap-2.5 w-full">
        <img
          className="w-32 h-32 object-cover rounded-md border-2 border-[#8185b2]"
          alt="Profile picture of Kowkodivka"
          src={avatarPic}
        />
        <div className="flex flex-col justify-between h-32">
          <section className="flex flex-col">
            <h1 className="font-inter-black text-[#8185b2] text-lg">
              Kowkodivka
            </h1>
            <p className="font-inter-medium-italic text-[#8185b2] text-[10px]">
              developer / ui ux designer
            </p>
          </section>
          <section className="flex items-center">
            <address className="flex items-center gap-0.5 not-italic">
              <PlanetIcon size={16} className="text-[#8185b2]" />
              <span className="text-[#8185b2] text-xs">
                Novokuznetsk, Russia
              </span>
            </address>
          </section>
          <section>
            <nav className="flex gap-2.5" aria-label="Social media links">
              <div className="flex flex-col gap-0.5">
                {socialLinks.map(({ Icon, text, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="flex items-center gap-0.5 hover:opacity-80 transition-opacity"
                    aria-label={`Visit ${text} profile`}
                  >
                    <Icon size={16} className="text-[#8185b2]" />
                    <span className="text-[#8185b2] text-xs">{text}</span>
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-0.5">
                {additionalSocialLinks.map(({ Icon, text, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="flex items-center gap-0.5 hover:opacity-80 transition-opacity"
                    aria-label={`Visit ${text} profile`}
                  >
                    <Icon size={16} className="text-[#8185b2]" />
                    <span className="text-[#8185b2] text-xs">{text}</span>
                  </a>
                ))}
              </div>
            </nav>
          </section>
        </div>
      </section>

      <section className="flex flex-col gap-2.5 p-2.5 w-full bg-[#8185b2] rounded-[10px]">
        <header className="flex items-center gap-[5px]">
          <InfoIcon size={20} className="text-[#f5eae8]" weight="bold" />
          <h2 className="font-inter-black text-[#f5eae8] text-lg">About me</h2>
        </header>
        <div className="font-inter-medium text-[#f5eae8] text-xs">
          <p className="mb-4">
            Hey! I'm Kowkodivka (but you can call me Zhenya if that's easier).
            My story starts in the vibrant landscapes of Kazakhstan, but life
            brought me to Russia — a place I now proudly call home and
            absolutely adore.
          </p>
          <p className="mb-4">
            As a proud pansexual and an enthusiastic furry, I celebrate
            self-expression in all its forms. When I'm not lost in the world of
            coding or tinkering with design, you'll find me with a stylus in
            hand, bringing my artistic visions to life.
          </p>
          <p className="mb-4">
            Every day is a new adventure — whether I'm debugging a program,
            sketching a furry character, or just vibing to good music. Life's
            too short to be boring, right?
          </p>
          <p>Nice to meet you! Let's create something awesome together.</p>
        </div>
      </section>

      <section className="flex flex-col gap-2.5 p-2.5 w-full bg-[#8185b2] rounded-[10px]">
        <header className="flex items-center gap-[5px]">
          <CompassToolIcon size={20} className="text-[#f5eae8]" weight="bold" />
          <h2 className="font-inter-black text-[#f5eae8] text-lg">
            Tech stack
          </h2>
        </header>
        {techStackData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-0.5">
            <h3 className="font-inter-semibold text-[#f5eae8] text-sm">
              {section.category}
            </h3>
            <ul className="list-disc list-inside text-[#f5eae8] text-xs">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </article>
  );

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gray-100 p-4 md:bg-[url('./public/wallpaper.jpg')] md:bg-cover md:bg-center">
      <ProfileCard />
    </main>
  );
};

export default App;
