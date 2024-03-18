import { SliderCard } from "@/components/slider-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getHomeData } from "@/lib/jiosaavn-api";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const homedata = await getHomeData();

  return Object.entries(homedata).map(([key, section]) => {
    if ("random_songs_listid" in section || key === "discover") return null;

    return (
      <div key={key} className="mb-4 space-y-4">
        <header className="border-b pb-2">
          <h2 className="pl-2 font-heading text-2xl drop-shadow-md dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-4xl lg:pl-0">
            {section.title}
          </h2>

          {section.subtitle && (
            <p className="pl-2 font-medium text-muted-foreground lg:pl-0">
              {section.subtitle}
            </p>
          )}
        </header>

        <ScrollArea>
          <div
            className={cn("flex pb-6 sm:gap-2", {
              "grid grid-flow-col grid-rows-2 place-content-start": [
                "trending",
                "albums",
                "charts",
              ].includes(key),
            })}
          >
            {section.data.map(
              ({ id, name, url, subtitle, type, image, explicit }) => (
                <SliderCard
                  key={id}
                  name={name}
                  url={url}
                  subtitle={subtitle}
                  type={type}
                  image={image}
                  explicit={explicit}
                />
              )
            )}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  });
}
