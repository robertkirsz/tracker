export const sc = (propName: string) => (css: TemplateStringsArray | any) =>
  css.length ? (props: any) => (props[propName] ? css : undefined) : css[propName]
