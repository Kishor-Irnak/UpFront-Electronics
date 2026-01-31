import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: string | null;
  category: string;
}

interface WishlistStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
  hasItem: (id: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items;
        if (items.find((i) => i.id === item.id)) {
          return;
        }
        set({ items: [...items, item] });
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      hasItem: (id) => {
        return !!get().items.find((item) => item.id === id);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
    },
  ),
);
