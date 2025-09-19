export interface MenuItem {
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}
