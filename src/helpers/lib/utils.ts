import kebabCase from "lodash/kebabCase";
export const delay = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

/*
 * isClient
 * condition whether server-side or client-side
 */
export const isClient: boolean = typeof window === "object";
interface IrouterConfig {
  [key: string]: {
    [key: string]: string;
  };
}

export function objectToQueryParam(obj: any) {
  const param: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      param.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    }
  }
  return param.join("&");
}

export const camelCaseToKebabCase = (slug: string) => {
  const label = kebabCase(slug);
  return label.toLowerCase();
};

export const getIdFromSlug = (slug: string) => {
  const slugArray = slug?.split("-");
  return slugArray[0];
};

export const routerConfig: IrouterConfig = {
  verify: {
    name: "verify",
    router: "verify",
  },
  "create-profile": {
    name: "create-profile",
    router: "create-profile",
  },
  account: {
    name: "account",
    router: "account",
  },
};

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
