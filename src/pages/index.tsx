import Image from "next/image";
import { useState, useEffect } from "react";
import { getProduct } from "./api/getListApi";
import Loading from "@/components/Loading";

export default function Home() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="relative flex w-full container flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        {(loading || error) && <Loading show={loading} />}

        {product && !loading && (
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              {product.name}
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {product.description}
            </p>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-2xl font-bold text-black dark:text-zinc-50">
                {product.price.toLocaleString("vi-VN")} {product.currency}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Thương hiệu: {product.brand} | Danh mục: {product.category}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Đánh giá: ⭐ {product.rating} ({product.reviews_count} đánh giá)
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Còn lại: {product.stock} sản phẩm
              </p>
              <div className="flex gap-2 mt-2">
                <p className="text-sm font-medium">Kích thước: </p>
                {product.sizes.map((size: string) => (
                  <span key={size} className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded text-sm">
                    {size}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <p className="text-sm font-medium">Màu sắc: </p>
                {product.colors.map((color: string) => (
                  <span key={color} className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded text-sm">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
