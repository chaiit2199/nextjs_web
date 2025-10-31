import Image from "next/image";
import { useState, useEffect } from "react";
import { getProduct } from "@/api/fetchData";
import Loading from "@/components/Loading";
import { useDevice } from '@/context/DeviceContext';

export default function Home() {
  const { isMobile, isReady } = useDevice();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    const { success, data: response } = await getProduct();
    if (success && response) {
      setProduct(response); 
      setLoading(false);
    } else {
      setLoading(true);
    }
  }; 

  useEffect(() => {
    fetchProduct();
  }, []); 

  if (isMobile == undefined) return; 

  return (
    
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="relative flex w-full container flex-col items-center justify-between py-16 px-4 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        {loading && <Loading show={loading} />}

        {product && !loading && (
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              {product.title}
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {product.description}
            </p>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-2xl font-bold text-black dark:text-zinc-50">
                {product.price.toLocaleString("vi-VN")} {product.currency}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Danh mục: {product.category}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Đánh giá: ⭐ {product.rating.rate} đánh giá
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Còn lại: {product.rating.count} sản phẩm
              </p>

              <Image src={product.image} alt="" width={300} height={300} />
               
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
