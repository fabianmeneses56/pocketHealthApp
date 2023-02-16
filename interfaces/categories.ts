export interface ISubcategory {
  _id: string
  title: string
}
export interface ICategory {
  _id: string
  title: string
  subcategories: ISubcategory[]
}
