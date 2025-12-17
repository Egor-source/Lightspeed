export interface ProductModel {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  formattedPrice: string;
  description?: string;
}
