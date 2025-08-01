import { createSignal } from "solid-js";
import {
  TbBrandSteam,
  TbBrandTwitter,
  TbBrandDiscord,
  TbBrandGithub,
} from "solid-icons/tb";
import avatar from "./avatar.webp";

const links = [
  { icon: "Discord", text: "@kowkodivka", url: "#" },
  { icon: "Twitter", text: "@kowkodivka", url: "https://x.com/kowkodivka" },
  {
    icon: "Steam",
    text: "kowkodivka_",
    url: "https://steamcommunity.com/id/kowkodivka_",
  },
  { icon: "Github", text: "Kowkodivka", url: "https://github.com/Kowkodivka" },
];

const content = {
  ru: {
    title: "Привет, я Женя",
    subtitle: "Разработчик",
    bio1: "Кхм, сибирский фурри, люблю RimWorld, а также Rust и Python",
    bio2: ">.<",
    socials: "Мои профили",
    links: links,
  },
  en: {
    title: "Hi, I'm Zhenya",
    subtitle: "Developer",
    bio1: "Ahem, Siberian furry, I love RimWorld, as well as Rust and Python",
    bio2: ">.<",
    socials: "My profiles",
    links: links,
  },
};

export default function App() {
  const [language, setLanguage] = createSignal("ru");
  const current = () => content[language()];
  const iconMap = {
    Discord: TbBrandDiscord,
    Twitter: TbBrandTwitter,
    Steam: TbBrandSteam,
    Github: TbBrandGithub,
  };

  return (
    <div class="min-h-screen bg-white flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div class="p-6 text-center">
          <div class="flex justify-center items-center gap-4">
            <img
              src={avatar}
              alt="Avatar"
              class="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <h1 class="text-2xl font-bold text-gray-800">
                {current().title}
              </h1>
              <p class="text-gray-600 mt-1">{current().subtitle}</p>
            </div>
          </div>
        </div>
        <div class="p-6">
          <div class="text-gray-700 mb-6">
            <p class="mb-4">{current().bio1}</p>
            <p>{current().bio2}</p>
          </div>
          <div class="border-t border-gray-100 pt-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">
              {current().socials}
            </h3>
            <div class="space-y-1">
              {current().links.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    href={link.url}
                    class="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <Icon size={24} />
                    </div>
                    <span class="text-gray-700">{link.text}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div class="p-4 bg-gray-50 text-center">
          <button
            onClick={() => setLanguage(language() === "ru" ? "en" : "ru")}
            class="text-sm text-gray-600 hover:text-gray-800"
          >
            {language() === "ru"
              ? "Switch to English"
              : "Переключить на русский"}
          </button>
        </div>
      </div>
    </div>
  );
}
