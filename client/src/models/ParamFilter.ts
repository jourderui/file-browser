export enum ParamFilterKeys {
  PATH = "path",
}

export interface ParamFilter {
  path: string;
}

export class ParamFilterParser {
  filter: ParamFilter;

  constructor(filter: ParamFilter) {
    this.filter = filter;
  }

  toQueryParams = (): URLSearchParams => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(this.filter)) {
      if (value && key) {
        switch (key) {
          case "path":
            searchParams.set(ParamFilterKeys.PATH, value);
            break;
          default:
            break;
        }
      }
    }
    return searchParams;
  };
}
