import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";
import { ComponentProps } from "react";

const navigation = createNavigation(routing);

// Re-export with widened Link type so consumers can pass plain string hrefs
// without needing explicit casts for every dynamic route
type LinkProps = Omit<ComponentProps<typeof navigation.Link>, "href"> & {
    href: ComponentProps<typeof navigation.Link>["href"] | string;
};
const Link = navigation.Link as React.ComponentType<LinkProps>;

export const { redirect, usePathname, useRouter } = navigation;
export { Link };
