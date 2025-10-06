export type Setting = {
  isDark: boolean
}

export type ProductStore = {
  id: string,
  slug: string
  name: string,
  img: string,
  quantity: number,
  // price: number,
  total: number
}

export type Cart = {
  products: ProductStore[],
  total: number,
  quantity: number
}

