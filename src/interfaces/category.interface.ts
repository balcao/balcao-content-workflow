export interface Category {
    id: number
    name: string
    description?: string
    parent?: Category
    slug: string
}