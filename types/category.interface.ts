export interface ICategorySeo {
  title?: string
  description?: string
}

export default interface ICategory {
  corpus: string
  name: string
  picture: string
  sliver: string
  slug: string
  thumbnail: string
  seo?: ICategorySeo
  sub: ICategory[]
  is_new_category: boolean
}
