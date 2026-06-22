import Image from "next/image";
import { cn, neobrutalist } from "@/lib/utils";
import { TechStackItem } from "@/types/tech-stack";

interface TechStackProps {
  data: TechStackItem[] | null;
}

interface CategoryGroup {
  id: string;
  name: string;
  order: number;
  items: TechStackItem[];
}

export default function TechStack({ data }: TechStackProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const groupsById = data.reduce<Record<string, CategoryGroup>>((acc, item) => {
    const { id, name, order } = item.category;
    if (!acc[id]) {
      acc[id] = { id, name, order: order ?? 0, items: [] };
    }
    acc[id].items.push(item);
    return acc;
  }, {});

  const groups = Object.values(groupsById).sort((a, b) => a.order - b.order);

  return (
    <section id="tech-stack" className="flex flex-col gap-4 scroll-mt-28">
      <h2 className="text-2xl dark:text-white">Languages &amp; Technologies</h2>
      {groups.map((group) => (
        <div key={group.id} className="flex flex-col gap-2">
          <h3 className="text-lg dark:text-white">{group.name}</h3>
          <div className="flex flex-wrap gap-4">
            {group.items
              .slice()
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    neobrutalist(),
                    "p-3 flex flex-col items-center gap-2 w-24",
                  )}
                >
                  <Image
                    src={item.icon.url}
                    alt={item.icon.alt}
                    width={50}
                    height={50}
                    loading="eager"
                  />
                  <span className="text-sm text-center">{item.name}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
