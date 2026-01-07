export function SupportedLanguages() {
  const languages = [
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Rust", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  ];

  return (
    <div className="py-24 sm:py-32 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-400 mb-10">
          Supported Languages for Battle
        </h2>
        <div className="mx-auto grid max-w-lg grid-cols-3 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          {languages.map((lang) => (
            <div key={lang.name} className="flex flex-col items-center justify-center gap-2 group transition-all duration-300 hover:transform hover:scale-110 cursor-pointer">
              <img
                className="col-span-2 max-h-12 w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                src={lang.logo}
                alt={lang.name}
                width={158}
                height={48}
              />
              <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
